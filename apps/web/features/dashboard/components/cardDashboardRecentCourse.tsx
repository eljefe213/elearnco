import { Spinner, Image } from "@nextui-org/react";
import { getCourseMoreRecentFromApi } from "lib/requests/course";
import { Course } from "database";
import { useEffect, useState } from "react";
import { CardDashboardUI } from "ui/card/CardDashboardUI";
import React from "react";

const HeaderChildren = (props) => {
  return (
    <div className="flex justify-between w-full overflow-hidden h-[76px]">
      <Image
        removeWrapper
        alt=""
        className="object-cover rounded-xl"
        src={props.image}
        width="100%"
      />
    </div>
  );
};

const BodyChildren = (props) => {
  const { title, description = "" } = props;

  return (
    <div className="flex flex-col mt-2">
      <p className="text-md">{title}</p>
      <p className="text-small text-default-500 line-clamp-2">{description}</p>
    </div>
  );
};
const CardDashboardRecentCourse = React.memo(() => {
  const [getResultMoreRecentCourse, setMoreRecentCourse] = useState<Course | null>({} as Course);
  const [isLoading,setIsLoading ]=useState<boolean>(true)

  const _getCourseMoreRecent = async (): Promise<void> => {
    const course = await getCourseMoreRecentFromApi();
    if (course) setMoreRecentCourse(course);
    setIsLoading(false)
  };

  //const actionHandler = (): void => { void 0};

  const props = {
    title: getResultMoreRecentCourse?.title,
    description: getResultMoreRecentCourse?.description,
    image: `/patterns/${getResultMoreRecentCourse?.image as string}.svg`,
  };

  useEffect(() => {
    _getCourseMoreRecent();
  }, []);



  if(isLoading) return <Spinner />
  if(!isLoading && !getResultMoreRecentCourse?.title) return <></>

  return getResultMoreRecentCourse?.title ? (
    <CardDashboardUI
      headerChildren={<HeaderChildren {...props} />}
      bodyChildren={<BodyChildren {...props} />}
    />
  ) : (
    <Spinner />
  );
});

export default CardDashboardRecentCourse;
