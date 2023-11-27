import "react-json-syntax-highlighter/dist/ReactJsonSyntaxHighlighter.css";

import { Chip } from "@nextui-org/react";
import JsonEditor from "react-json-editor-ui";
import ReactJsonSyntaxHighlighter from "react-json-syntax-highlighter";
import { GenericObject } from "schemas/global";

import { CLASSNAME_BLOCK_CHILD } from "./const";
import { setPath } from "./utils";
export const generateTitle = (method: string, title: string, path: string) => {
  const _getColor = () => {
    if (method === "GET") return "success";
    if (method === "DELETE" || method === "PATCH") return "danger";
    return "warning";
  };

  return (
    <div className="flex items-center gap-2 p-2 bg-slate-200 mb-2 mt-2">
      <Chip radius="none" variant="faded" color={_getColor()}>
        {method}
      </Chip>
      <p className="m-0"> {setPath(path)} </p>
      <p className="text-tiny m-0"> {title} </p>
    </div>
  );
};

export const sectionTitle = (title: string) => {
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

export const setSchema = (
  title: string,
  data: GenericObject,
  action: (data: GenericObject) => void
) => {
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
