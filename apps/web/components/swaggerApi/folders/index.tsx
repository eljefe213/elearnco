import 'react-json-editor-ui/dist/react-json-editor-ui.cjs.development.css'

import { Button, Chip } from "@nextui-org/react";
import { Folder } from "database";
import { getFolders,pathApiFolders } from "lib";
import { useState } from "react";
import JsonEditor from "react-json-editor-ui";

import { CLASSNAME_BLOCK, CLASSNAME_BLOCK_CHILD } from "../const";
import { setPath } from "../utils";
const FoldersApi = () => {

  // GET FOLDERS ENTRY
  const [getObjFolders, setGetObjFolders] = useState<{ userId: string }>({
    userId: "cln4kv8xc000h0989bop6u7k8",
  });
 // GET FOLDERS EXIT
 const [getObjAnswerFolders, setObjAnswerFolders] = useState<
 Folder[] | null
>([]);
  const _getFolders = async (): Promise<void> => {
    const folders = await getFolders();
    if (folders) setObjAnswerFolders(folders);
  };

    return <>
     {/* GET FOLDERS */}
     <div className="flex items-center gap-2 p-4">
        <Chip radius="none" variant="faded" color="success">
          GET
        </Chip>
        <p className="m-0"> {setPath(pathApiFolders)} </p>{" "}
        <p className="text-tiny m-0"> Get all user folders </p>
      </div>
      <div className={CLASSNAME_BLOCK}>
        <div className="flex flex-col p-4 w-auto">
          <div>
            <p className="mb-4 ml-4">Schema :</p>
          </div>

          <div>
            <JsonEditor
              data={getObjFolders}
              onChange={(data) => {
                setGetObjFolders(data);
              }}
              optionsMap={{
                color: [
                  { value: "red", label: "Red" },
                  { value: "blue", label: "Blue" },
                ],
              }}
            />
          </div>
        </div>

        <div className={CLASSNAME_BLOCK_CHILD}>
          <div>
            <p className="mb-4 ml-4">Preview :</p>{" "}
            <div>
              <pre className="ml-4">
                {JSON.stringify(getObjFolders, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        <div className={CLASSNAME_BLOCK_CHILD}>
          <div>
            <p className="mb-4 ml-4">Answer :</p>{" "}
            <div>
              <pre className="ml-4">
                {JSON.stringify(getObjAnswerFolders, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={_getFolders}>Get folders</Button>
        </div>
      </div>

      {/* ADD FOLDER */}
     {/*  <div className="flex items-center gap-2 pl-4">
        <Chip radius="none" variant="faded" color="success">
          POST
        </Chip>
        <p className="m-0"> {setPath(pathApiFolders)} </p>{" "}
        <p className="text-tiny m-0"> Create a user folder </p>
      </div>

      <div className="flex items-stretch justify-between gap-4 w-auto">
        <div className="flex flex-col">
          <div>
            <p className="mb-4 ml-4">Schema :</p>
          </div>

          <div>
            <JsonEditor
              data={addObjFolder}
              onChange={(data) => {
                setAddObjFolder(data);
              }}
              optionsMap={{
                color: [
                  { value: "red", label: "Red" },
                  { value: "blue", label: "Blue" },
                ],
               
              }}
            />
          </div>
        </div>

        <div className="flex flex-col bg-slate-200 min-w-60 w-60">
          <div>
            <p className="mb-4 ml-4">Preview :</p>{" "}
            <div>
              <pre className="ml-4">
                {JSON.stringify(addObjFolder, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-slate-200 min-w-60 w-60">
          <div>
            <p className="mb-4 ml-4">Answer :</p>{" "}
            <div>
              <pre className="ml-4">
                {JSON.stringify(addLocalObjFolder, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={_addFolder}>Add folder</Button>
        </div>
      </div> */}

      {/* UPDATE FOLDER */}
      {/* <div className="flex items-center gap-2 pl-4">
        <Chip radius="none" variant="faded" color="warning">
          UPDATE
        </Chip>
        <p className="m-0"> {setPath(pathApiFolder) + "/{id}"} </p>{" "}
        <p className="text-tiny m-0"> Delete a user folder </p>
      </div>

      <div className="flex items-start justify-start gap-4">
        <div className="flex flex-col">
          <div>
            <p className="mb-4 ml-4">Schema :</p>
          </div>

          <div>
            <JsonEditor
              data={updateObjFolder}
              onChange={(data) => {
                setUpdateObjFolder(data);
              }}
              optionsMap={{
                color: [
                  { value: "red", label: "Red" },
                  { value: "blue", label: "Blue" },
                ],
                city: [
                  { value: "beijing", label: "Beijing" },
                  { value: "shanghai", label: "Shanghai" },
                ],
              }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <p className="mb-4 ml-4">Preview :</p>{" "}
            <div>
              <pre className="ml-4">
                {JSON.stringify(updateObjFolder, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <p className="mb-4 ml-4">Answer :</p>{" "}
            <div>
              <pre className="ml-4">
                {JSON.stringify(updateLocalObjFolder, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={_updateFolder}>Update folder</Button>
        </div>
      </div> */}

      {/* DELETE FOLDER */}
      {/* <div className="flex items-center gap-2 pl-4">
        <Chip radius="none" variant="faded" color="danger">
          DELETE
        </Chip>
        <p className="m-0"> {setPath(pathApiFolder) + "/{id}"} </p>{" "}
        <p className="text-tiny m-0"> Delete a user folder </p>
      </div>

      <div className="flex items-start justify-start gap-4">
        <div className="flex flex-col">
          <div>
            <p className="mb-4 ml-4">Schema :</p>
          </div>

          <div>
            <JsonEditor
              data={deleteObjFolder}
              onChange={(data) => {
                setDeleteObjFolder(data);
              }}
              optionsMap={{
                color: [
                  { value: "red", label: "Red" },
                  { value: "blue", label: "Blue" },
                ],
                city: [
                  { value: "beijing", label: "Beijing" },
                  { value: "shanghai", label: "Shanghai" },
                ],
              }}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <p className="mb-4 ml-4">Preview :</p>{" "}
            <div>
              <pre className="ml-4">
                {JSON.stringify(deleteObjFolder, null, 2)}
              </pre>
            </div>
          </div>
        </div>

        <div className="flex flex-col">
          <div>
            <p className="mb-4 ml-4">Answer :</p>{" "}
            <div>
              <pre className="ml-4">
                {JSON.stringify(deleteLocalObjFolder, null, 2)}
              </pre>
            </div>
          </div>
        </div>
        <div>
          <Button onClick={_deleteFolder}>Delete folder</Button>
        </div>
      </div> */}
      </>
}

export default FoldersApi