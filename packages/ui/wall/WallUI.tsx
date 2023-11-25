"use client";
import { motion } from "framer-motion";
import React,{ useMemo } from "react";

import { IconAvatarUI } from "../icon/IconAvartarUI";
import { IProps } from "./interface";
import { AVATARS } from "./mock";

export const WallUI = (IProps: IProps): JSX.Element => {
  const { className, width = "50%" } = IProps;
  const memoWall = useMemo(() => {
    return AVATARS.map((avatar) => (
      <motion.div
        key={avatar.id}
        animate={{
          scale: [0, avatar.scale],
        }}
        className="rounded-full absolute overflow-hidden"
        transition={{
          duration: 1,
          ease: "backOut",
          repeat: 0,
          delay: avatar.delay,
        }}
        style={{
        
          rotate: `${avatar.rotation}deg`,
          scale: 0,
          left: avatar.x + "%",
          top: avatar.y + "%",
          backgroundColor: avatar.bgColor,
        }}
      >
        <IconAvatarUI style={{transform:'scale(0.9)'}} name={avatar.src} width={100} height={100} />
      </motion.div>
    ));
  }, []);

  return (
    <div className={`relative h-screen ${className}`} style={{ width }}>
      {memoWall}
    </div>
  );
};
