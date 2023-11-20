import { Chip } from "@nextui-org/react";
import { setPath } from "./utils";
import { CLASSNAME_BLOCK_CHILD } from "./const";
import 'react-json-syntax-highlighter/dist/ReactJsonSyntaxHighlighter.css'
import JsonEditor from "react-json-editor-ui";
import ReactJsonSyntaxHighlighter from 'react-json-syntax-highlighter'
export const generateTitle = (method: string, title: string, path: string):JSX.Element => {
    return (
      <div className="flex items-center gap-2 p-2 bg-slate-200 mb-2 mt-2">
        <Chip
          radius="none"
          variant="faded"
          color={
            method === "GET"
              ? "success"
              : method === "DELETE"
              ? "danger"
              : method === "PATCH"
              ? "danger"
              : "warning"
          }
        >
          {method}
        </Chip>
        <p className="m-0"> {setPath(path)} </p>
        <p className="text-tiny m-0"> {title} </p>
      </div>
    );
  };


  export const sectionTitle = (title: string):JSX.Element => {
    return (
      <div>
        <p className="pl-2 pt-2">{title}</p>
      </div>
    );
  };


  export const setBlock = (title: string, result) => {
    return (
      <div className={CLASSNAME_BLOCK_CHILD}>
        <div>
          {sectionTitle(title)}
          <div className="p-2">
          <ReactJsonSyntaxHighlighter obj={result} />
          </div>
        </div>
      </div>
    );
  };

  

  export const setSchema = (title: string, data, action) => {
    return (
      <div className={`${CLASSNAME_BLOCK_CHILD} !w-4/12`}>
        {sectionTitle(title)}

        <div className="pl-2">
          <JsonEditor
            data={data}
            onChange={(data) => {
              action(data);
            }}
          />
        </div>
      </div>
    );
  };