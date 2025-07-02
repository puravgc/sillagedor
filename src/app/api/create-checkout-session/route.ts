// app/api/create-checkout-session/route.ts
import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const { cart } = await req.json();

  const line_items = cart.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
      },
      unit_amount: item.discountedPrice * 100, // in cents
    },
    quantity: item.quantity,
  }));

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items,
    mode: "payment",
    success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/shop`,
    cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/cart`,
  });

  return NextResponse.json({ id: session.id });
}
