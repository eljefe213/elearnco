import {
  BlockCardSectionsUI,
  BlockNodesListUI,
  WorkspaceDndProvider,
} from "ui";

const datas = [
  {
    id: "group_1",

    data: [
      { id: 0, content: "bloc 1", groupId: "group_1" },
      { id: 1, content: "bloc 2", groupId: "group_1" },
      { id: 2, content: "bloc 3", groupId: "group_1" },
      { id: 3, content: "bloc 4", groupId: "group_1" },
    ],
  },
  {
    id: "group_2",
    data: [
      { id: 0, content: "bloc 1", groupId: "group_2" },
      { id: 1, content: "bloc 2", groupId: "group_2" },
      { id: 2, content: "bloc 3", groupId: "group_2" },
      { id: 3, content: "bloc 4", groupId: "group_2" },
    ],
  },
];
export const DndWithDrop = () => {
  /*  const [datas, setData] = useState([
   {id: 'group_1',
   
   data: [
      { id: 0, content: "bloc 1",groupId: 'group_1'},
      { id: 1, content: "bloc 2",groupId: 'group_1' },
      { id: 2, content: "bloc 3",groupId: 'group_1' },
      { id: 3, content: "bloc 4",groupId: 'group_1' },
    ]},
   {id: 'group_2',
   data: [
      { id: 0, content: "bloc 1",groupId: 'group_2' },
      { id: 1, content: "bloc 2",groupId: 'group_2' },
      { id: 2, content: "bloc 3",groupId: 'group_2' },
      { id: 3, content: "bloc 4",groupId: 'group_2' },
    ]}
  ]); */

  return (
    <WorkspaceDndProvider>
      <BlockCardSectionsUI />
      <div className=" gap-2">
        {datas.map((data, index) => (
          <div className="flex-col">
            <div className="mb-2 mt-2 ml-2">{"Group" + index}</div>
            <BlockNodesListUI data={data} />
          </div>
        ))}
      </div>
    </WorkspaceDndProvider>
  );
};
