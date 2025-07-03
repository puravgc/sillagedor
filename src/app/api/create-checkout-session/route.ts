import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: NextRequest) {
  const body = await req.json();

  // Accept either single product or multiple products (cart)
  const items = body.cart ?? (body.product ? [body.product] : []);

  if (items.length === 0) {
    return NextResponse.json(
      { error: "No products provided" },
      { status: 400 }
    );
  }

  const line_items = items.map((item: any) => ({
    price_data: {
      currency: "usd",
      product_data: {
        name: item.name,
        images: item.image ? [item.image] : [],
      },
      unit_amount: Math.round(item.discountedPrice * 100),
    },
    quantity: item.quantity ?? 1,
  }));

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/shop`,
      cancel_url: `${process.env.NEXT_PUBLIC_CLIENT_URL}/cart`,
    });

    return NextResponse.json({ id: session.id });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
