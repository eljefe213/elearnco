import { JSXElementConstructor, ReactElement } from "react";
import { Resend } from "resend";

export const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export const sendEmail = async ({
  email,
  subject,
  react,
  marketing,
  test,
}: {
  email: string;
  subject: string;
  react: ReactElement<any, string | JSXElementConstructor<any>>;
  marketing?: boolean;
  test?: boolean;
}) => {
  
  if (!resend) {
    console.log(
      "Resend is not configured. You need to add a RESEND_API_KEY in your .env file for emails to work."
    );
    return Promise.resolve();
  }
 

  try {

    const { data, error }  = await resend.emails.send({
      from: marketing
        ? "laurent.heneman@edukeasy.com"
        : "laurent.heneman@edukeasy.com",
      to: email,
      subject,
      react,
    });
    console.log("sucess",data)
    console.log(error)
    if (error) {
      return  Promise.resolve(error);
    } else {
      return Promise.resolve("Success");
    }
    
  } catch (error) {
    console.log("Error sending", error);
    Promise.resolve(error);
  }
};
