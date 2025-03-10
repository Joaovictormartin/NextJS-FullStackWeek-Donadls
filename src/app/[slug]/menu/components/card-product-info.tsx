import { useContext } from "react";

import { CardContext } from "../context/card";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/helpers/format-currency";

const CardProductInfo = () => {
  const { total } = useContext(CardContext);

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex justify-between">
          <p className="text-sm text-muted-foreground">Total</p>
          <p className="text-sm font-semibold">{formatCurrency(total)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default CardProductInfo;
