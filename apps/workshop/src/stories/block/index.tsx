import {
  BlockCardSectionsUI,
  BlockNodesListUI,
  WorkspaceDndProvider,
} from "ui";
import { Block } from "database";
const data = [
  {
    index: 0,
    uuid: "bloc 0",
    content: "bloc 0",
    groupId: "group_1",
    type: "warning",
  },
  {
    index: 1,
    uuid: "bloc 1",
    content: "bloc 1",
    groupId: "group_1",
    type: "audio",
  },
  {
    index: 2,
    uuid: "bloc 2",
    content: "bloc 2",
    groupId: "group_1",
    type: "video",
  },
  {
    index: 3,
    uuid: "bloc 3",
    content: "bloc 3",
    groupId: "group_1",
    type: "timeline",
  },
] as Partial<Block>[];

export const DndWithDrop = () => {
  return (
    <WorkspaceDndProvider>
      <BlockCardSectionsUI />
      <div className=" gap-2">
      <BlockNodesListUI data={data} />
        {/* {data.map((block, index) => (
          <div key={data.id} className="flex-col">
            <div className="mb-2 mt-2 ml-2">{"Group" + index}</div>
            <BlockNodesListUI data={block} />
          </div>
        ))} */}
      </div>
    </WorkspaceDndProvider>
  );
};
