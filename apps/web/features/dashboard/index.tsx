"use client";
import dynamic from "next/dynamic";
import { motion, stagger, useAnimate } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useLockedBody } from "customhooks";
import { cn } from "lib/utils";
import { GridItemProps } from "schemas";
import { GridItems, variants } from "schemas/dashboard/const";
import { Spinner } from "@nextui-org/react";

const DynamicCardDashboardWelcome = dynamic(
  () => import("./components/cardDashboardWelcome"),
  {
    loading: () => <Spinner />,
  }
);
const DynamicCardDashboardProfil = dynamic(
  () => import("./components/cardDashboardProfil"),
  {
    loading: () => <Spinner />,
  }
);
const DynamicDashboardRecentCourse = dynamic(
  () => import("./components/cardDashboardRecentCourse"),
  {
    loading: () => <Spinner />,
  }
);
const DynamicDashboardRecentNews = dynamic(
  () => import("./components/cardLastNew"),
  {
    loading: () => <Spinner />,
  }
);
const DynamicDashboardTips = dynamic(() => import("./components/cardTips"), {
  loading: () => <Spinner />,
});
const GridItem = ({ size, children }: GridItemProps) => {
  return (
    <motion.div
      initial={{
        scale: 0.2,
        y: 120,
        opacity: 0,
      }}
      className={cn(
        variants({
          size,
          className: "bg-transparent",
        })
      )}
    >
      {children}
    </motion.div>
  );
};

//NOTE - We present the dashboard like a bento, so we need to know what kind of information want uses a teacher / trainer

const FeatureDashboard = () => {
  const [_] = useLockedBody(true, "body");
  const [scope, animate] = useAnimate();
  const staggerGridItems = stagger(0.02, {
    startDelay: 0.5,
  });

  const getCardTemplate = (type: string, item) => {
    if (type === "social") return <DynamicCardDashboardWelcome />;
    if (type === "course") return <DynamicDashboardRecentCourse />;
    if (type === "user") return <DynamicCardDashboardProfil />;
    if (type === "news") return <DynamicDashboardRecentNews {...item} />;
    if (type === "tips") return <DynamicDashboardTips {...item} />;
    return <div>Need to create new component for this type.</div>;
  };

  useEffect(() => {
    if (scope.current) {
      animate(
        "div",
        {
          scale: 1,
          y: 0,
          opacity: 1,
        },
        {
          type: "spring",
          stiffness: 330,
          damping: 35,
          delay: staggerGridItems,
        }
      );
    }
  }, [scope]);

  const GRID_ITEMS = useMemo(() => { return GridItems.map((item) => {
    return (
      <GridItem key={item.id} size={item.layout}>
        {getCardTemplate(item.type, item)}
      </GridItem>
    );
  })},[])

  return (
    <div
      ref={scope}
      className="grid w-full grid-cols-4 xl:gap-5 gap-6 p-5 auto-rows-[76px]"
    >
      {GRID_ITEMS}
    </div>
  );
};
export default FeatureDashboard;
