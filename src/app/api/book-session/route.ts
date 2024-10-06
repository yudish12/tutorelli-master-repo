import Stripe from "stripe";
import { NextResponse } from "next/server";
import { getSupabaseRouteHandlerClient } from "@/lib/supabase/clients/router-handler.client";

// Initialize Stripe with your secret key
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: Request) {
  try {
    const supabase = getSupabaseRouteHandlerClient();

    const formData = await request.formData();
    const block_id = formData.get("block_id");
    const student_id = formData.get("student_id");
    const email = formData.get("email");
    console.log(email);
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    //empty student_id means that the user is not logged in

    const { data, error } = await supabase
      .from("session_block")
      .select("price,capacity,start_date,end_date,block_size")
      .eq("id", block_id);

    if (error || !data.length || !data) {
      return NextResponse.json(
        { error: error?.message ?? "Session Not found" },
        { status: 400 }
      );
    }
    console.log(data);
    const origin = process.env.NEXT_PUBLIC_URL;
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount: data[0].price * 100,
            currency: "usd",
            product_data: {
              name: "session",
            },
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: student_id
        ? `${origin}/dashboard/book-session/?success=true&block_id=${block_id}&student_id=${student_id}&email=${email}`
        : `${origin}/book-session/?success=true&block_id=${block_id}&email=${email}`,
      cancel_url: student_id
        ? `${origin}/dashboard/book-session/?canceled=true`
        : `${origin}/book-session/?canceled=true`,
    });
    return NextResponse.redirect(session.url ?? "", 303);
  } catch (err: any) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
