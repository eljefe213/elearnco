import { getId } from "lib";
import { useEffect } from "react";
import { useFoldersStore } from "store";
import { SelectUI } from "ui";
interface Iprops {
  onChange: (value: string) => void;
  currentFolder: string;
}

const FolderFilter = (props: Iprops) => {
  const { onChange, currentFolder } = props;
  const { folders, isLoading, error, fetchDataFolders, totalFolders } =
    useFoldersStore();
  const changeHandlerFolders = (value: string): void => {
    const course = folders.filter((item) => value === item.id);
    if (course.length > 0) {
      onChange?.(course[0].name);
    }
  };

  useEffect(() => {
    fetchDataFolders();
  }, []);

  if (isLoading) return <></>;
 
  return (
    <SelectUI
      data={folders}
      label="Filter by folder"
      placeholder="Default"
      labelPlacement="inside"
      onChange={changeHandlerFolders}
      variant="flat"
      selectedKey={getId(folders, currentFolder)}
    />
  );
};

export default FolderFilter;

/* {isNewFolder ? (
        <Input
          isRequired
          label="Folder Name"
          placeholder="Enter your folder name"
          type="text"
        />
      ) : isLoading && folders.length===0 ? <></> :(
        <Select
          items={folders}
          label="In folder"
          placeholder="Select Folder"
          className="max-w-xs"
          defaultSelectedKeys={[folders[0].id]}
          
        >
          {(folder) => (
            <SelectItem key={folder.id}>{folder.name}</SelectItem>
          )}
        </Select>
      )} */
