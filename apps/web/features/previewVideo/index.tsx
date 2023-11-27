"use client";
import "plyr-react/plyr.css";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { APITypes } from "plyr-react";
import { useRef } from "react";
import dynamic from "next/dynamic";
import { LoadingSpinnerUI } from "ui";

const DynamicPlyr = dynamic(() => import("plyr-react"), {
  loading: () => <LoadingSpinnerUI />,
});

const videoId = "yWtFb9LJs3o";
const provider = "youtube";
const videoOptions = undefined;
const PreviewFeature = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef<APITypes>(null);
  const handleOpen = (): void => {
    onOpen();
  };

  return (
    <>
      <Button onClick={handleOpen} size="md" color="default">
        Preview
      </Button>
      <Modal backdrop="blur" size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Preview</ModalHeader>
              <ModalBody>
                <DynamicPlyr
                  ref={ref}
                  source={{
                    type: "video",
                    sources: [
                      {
                        src: videoId,
                        provider: provider,
                      },
                    ],
                  }}
                  options={videoOptions}
                />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default PreviewFeature;
