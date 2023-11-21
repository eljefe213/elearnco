import { useTranslations } from "next-intl";

const TitleBloc = ({ txt }: { txt: string }) => {
  const t = useTranslations("home");
  const TXT = t(txt);
  return (
    <p className="text-center font-bold text-default  text-2xl md:text-xl">
      {TXT}
    </p>
  );
};

export default TitleBloc;
