import WelcomeEmail from "@/emails/welcome-email";

interface IProps {
  code: string;
  name: string;
  email: string;
  url: string;
}

export default function SigninPage(props: IProps) {
  const { code, name, email, url } = props;

  return <WelcomeEmail name={name} email={email} code={code} url={url} />;
}
