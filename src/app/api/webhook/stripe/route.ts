import Stripe from "stripe";
import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

import { db } from "@/lib/prisma";

const stripeKey = process.env.STRIPE_SECRET_KEY as string;
const stripeWebhook = process.env.STRIPE_WEBHOOK_SECRET_KEY as string;

export async function POST(req: Request) {
  if (!stripeKey) return NextResponse.error();
  const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });

  const signature = req.headers.get("stripe-signature");

  if (!signature) return NextResponse.error();
  if (!stripeWebhook) return NextResponse.error();

  const text = await req.text();
  const event = stripe.webhooks.constructEvent(text, signature, stripeWebhook);

  switch (event.type) {
    case "checkout.session.completed": {
      const orderId = event.data.object.metadata?.orderId;
      if (!orderId) return NextResponse.json({ received: true });

      const order = await db.order.update({
        where: { id: Number(orderId) },
        data: { status: "PAYMENT_CONFIRMED" },
        include: {
          restaurant: {
            select: { slug: true },
          },
        },
      });

      revalidatePath(`${order.restaurant.slug}/menu`);
      revalidatePath(`${order.restaurant.slug}/orders`);

      break;
    }

    case "charge.failed": {
      const orderId = event.data.object.metadata?.orderId;
      if (!orderId) return NextResponse.json({ received: true });

      const order = await db.order.update({
        where: { id: Number(orderId) },
        data: { status: "PAYMENT_FAILED" },
        include: {
          restaurant: {
            select: { slug: true },
          },
        },
      });

      revalidatePath(`${order.restaurant.slug}/menu`);
      revalidatePath(`${order.restaurant.slug}/orders`);

      break;
    }
  }

  return NextResponse.json({ received: true });
}
