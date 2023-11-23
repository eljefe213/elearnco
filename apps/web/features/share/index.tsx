import { Spinner, Tab, Tabs } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { IconUI } from "ui/icon/IconUI";

//TODO - TRANSLATIONS
//NOTE - FAKE DATAS

const DynamicShareWithTrainers = dynamic(
  () => import("ui/share/ShareWithTrainerUI"),
  {
    loading: () => <Spinner />,
  }
);

const DynamicShareWithLearner = dynamic(
  () => import("ui/share/ShareWithLearnerUI"),
  {
    loading: () => <Spinner />,
  }
);
const ShareWith = () => {
  return (
    <div className="flex w-full flex-col">
      <Tabs aria-label="Options" color="primary" variant="bordered">
        <Tab
          key="photos"
          title={
            <div className="flex items-center space-x-2">
              <IconUI width={22} height={22} name="trainer" />
              <span>With my colleagues</span>
            </div>
          }
        >
          <DynamicShareWithTrainers />
        </Tab>
        <Tab
          key="music"
          title={
            <div className="flex items-center space-x-2">
              <IconUI width={22} height={22} name="learner" />
              <span>With my learners</span>
            </div>
          }
        >
          <DynamicShareWithLearner />
        </Tab>
      </Tabs>
    </div>
  );
};

export default ShareWith;
