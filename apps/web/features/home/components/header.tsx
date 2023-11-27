import { useCallback } from "react";
import { DarkModeUI, LangUI, LogoSymbolUI, LogoTextUI } from "ui";

const HomeHeader = ({ theme }) => {
  const getTheme = useCallback((): string => {
    return theme === "light" ? "black" : "white";
  }, [theme]);

  const COLOR = getTheme();

  return (
    <>
      <div className="absolute flex gap-2 items-center left-5 top-3 md:top-0">
        <LogoSymbolUI color={COLOR} width={70} height={70} />
        <span className="hidden md:block">
          <LogoTextUI color={COLOR} />
        </span>
      </div>
      <div className="absolute right-20 top-5 flex items-center gap-2">
        <LangUI />
        <DarkModeUI />
      </div>
    </>
  );
};

export default HomeHeader;
