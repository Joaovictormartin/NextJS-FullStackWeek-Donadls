"use server";

import Stripe from "stripe";
import { headers } from "next/headers";
import { ConsumptionMethod } from "@prisma/client";

import { db } from "@/lib/prisma";
import { removeCpfPunctuation } from "@/helpers/cpf";
import { CardProduct } from "@/app/[slug]/menu/context/card";

interface CreateStripeCheckoutProps {
  cpf: string;
  slug: string;
  orderId: number;
  products: CardProduct[];
  consumptionMethod: ConsumptionMethod;
}

const stripeKey = process.env.STRIPE_SECRET_KEY;

export const createStripeCheckout = async ({
  cpf,
  slug,
  orderId,
  products,
  consumptionMethod,
}: CreateStripeCheckoutProps) => {
  try {
    const productWithPrices = await db.product.findMany({
      where: { id: { in: products.map((product) => product.id) } },
    });

    if (!stripeKey) throw new Error("Stripe key not found");

    const stripe = new Stripe(stripeKey, { apiVersion: "2025-02-24.acacia" });

    const reqHeaders = await headers();
    const origin = reqHeaders.get("origin") ?? "";

    const searchParams = new URLSearchParams();
    searchParams.set("cpf", removeCpfPunctuation(cpf));
    searchParams.set("consumptionMethod", consumptionMethod);

    const url = `${origin}/${slug}/orders?${searchParams.toString()}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      cancel_url: url,
      success_url: url,
      metadata: { orderId },
      payment_method_types: ["card"],
      line_items: products.map((product) => ({
        price_data: {
          currency: "brl",
          unit_amount:
            productWithPrices.find((p) => p.id === product.id)!.price * 100,
          product_data: { name: product.name, images: [product.imageUrl] },
        },
        quantity: product.quantity,
      })),
    });

    return { sessionId: session.id };
  } catch (error) {
    console.log("🚀 ~ error:", error);
  }
};
