"use client";

import { usePathname } from "next/navigation";

const WrapperChild = (props) => {
  const pathname = usePathname();
  const { children } = props;

  return (
    <div
      className={`no-scrollbar h-full w-full overflow-x-hidden ${
        pathname.includes("course") ? "overflow-hidden" : "overflow-y-auto"
      }`}
    >
      <div className="w-full">{children}</div>
    </div>
  );
};

export default WrapperChild;
