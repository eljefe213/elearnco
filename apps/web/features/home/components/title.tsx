import { useTranslations } from "next-intl";

const HomeTitle = () => {
  const t = useTranslations("home");
  const TITLE_1 = t("title 1");
  const TITLE_2 = t("title 2");
  const TITLE_3 = t("title 3");
  const TITLE_4 = t("title 4");
  return (
    <>
      <span className="text-primary">{TITLE_1}</span>,{" "}
      <span className="text-primary">{TITLE_2}</span> &{" "}
      <span className="text-primary">{TITLE_3}</span>
      <br />
      {TITLE_4}
    </>
  );
};

export default HomeTitle;
