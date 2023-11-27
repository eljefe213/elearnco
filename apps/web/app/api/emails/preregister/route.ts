import { NextResponse } from "next/server";
import { Resend } from "resend";

import PregisterEmail from "@/emails/preregister-email";



export async function POST() {
  
  const resend = new Resend(process.env.RESEND_API_KEY);
  try {
    const { data, error } = await resend.emails.send({
      from: "laurent.heneman@edukeasy.com",
      to: ["laurent.heneman@edukeasy.com"],
      subject: "Hello world",
      react: PregisterEmail({ email: "laurent.heneman@edukeasy.com" }),
    });

    if (error) {
      return NextResponse.json({ error });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
