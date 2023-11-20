"use client";
import { useIsCollaboration } from "customhooks";
import React, { useEffect } from "react";
import { useCourseStore, usePageStore } from "store";
import {
  BannerGeneric,
  BannerWithCollaboration,
} from "../banner/BannerGenericUI";
import { BlockNodesListUI } from "../nodes/BlockNodesListUI";
import { LoadingSpinnerUI } from "../loading";
import { useCollaboration,useYMapItem } from "collaboration";

//TODO - REMOVE STYLES AND ADD CLASSNAME
//TODO - PASS CONST LAYOUT
//TODO - CREATE A COMPONENT LOADING WITH A SPINNER FOR CENTER IT (PASS PROPS CLASSNAME)

const BlockList = () => {
  const { blocks } = usePageStore();
  const { doc } = useCollaboration();
  const [block, setBlock] = useYMapItem<any[]>(doc?.getMap("page"), "block");
 // console.log(block)
  useEffect(()=>{
    
    console.log(blocks)
    setBlock(blocks)
  },[blocks])
  console.log(block)
  return block?.length>0 &&<BlockNodesListUI data={block} />;
};



// this is the editor part
export const LayoutEditorUI = () => {
  const { currentPage, pages } = useCourseStore();
  const { isLoading, error, fetchData } = usePageStore();
  const isCollaboration = useIsCollaboration("/collaboration");

  useEffect(() => {
    if (pages.length) {
      const page = pages[currentPage - 1];

      try {
        fetchData(page.id);
      } catch (error) {
        throw new Error("Fetching page failed");
      }
    }
  }, []);

  if (isLoading) return <LoadingSpinnerUI />;
  if (error) return <>Error</>;

  return (
    <div
      style={{
        maxWidth: "calc(100vw - 350px)",
        padding: "1.5rem",
        margin: "0 auto",
        overflowY: "auto",
        flex: "1 1 auto",
        zIndex: 1,
      }}
      className="no-scrollbar relative flex h-screen z-40"
    >
      <div
        style={{
          maxWidth: "1170px",
          paddingBottom: "48px",
          position: "static",
          overflowY: "visible",
          margin: "auto",
          borderRadius: "24px 24px 0 0",
          flex: "1 0 auto",
          minHeight: "100%",
          width: "100%",
          boxShadow:
            "0px 0px 1px 0px rgba(var(--coal-rgb), .04), 0px 0px 2px 0px rgba(var(--coal-rgb), .06), 0px 2px 8px 0px rgba(var(--coal-rgb), .04)",
        }}
        className="flex flex-col bg-default-50"
      >
        <div
          style={{
            flex: "1 1 auto",
            position: "relative",
            overflow: "hidden",
            borderRadius: "24px 24px 0 0",
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
          }}
        >
          {/* Banner is only for the first page */}
          {currentPage === 1 ? (
            !isCollaboration ? (
              <BannerWithCollaboration />
            ) : (
              <BannerGeneric />
            )
          ) : (
            <></>
          )}
          <div
            className="bg-default-50 relative flex flex-col"
            style={{
              padding: "0 32px 32px",
              marginTop: "-32px",
              borderRadius: "32px",
              paddingTop :"32px",
              zIndex: 200,
            }}
          >
            <BlockList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutEditorUI;
