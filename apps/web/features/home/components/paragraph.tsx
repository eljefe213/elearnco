import { useTranslations } from "next-intl";

const HomeParagraph = () => {
  const t = useTranslations("home");
  const PARAGRAPH_1 = t("paragraph 1");
  const PARAGRAPH_2 = t("paragraph 2");
  const PARAGRAPH_3 = t("paragraph 3");
  const PARAGRAPH_4 = t("paragraph 4");
  return (
    <p className="text-2xl py-5 text-center">
      <b className="text-primary">{PARAGRAPH_1}</b> <span>{PARAGRAPH_2}</span>{" "}
      <span>{PARAGRAPH_3}</span>
      <br />
      <span>{PARAGRAPH_4}</span>
    </p>
  );
};

export default HomeParagraph;
