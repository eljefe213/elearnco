import { notFound } from "next/navigation";

type JSONValue = string | number | boolean | JSONObject | JSONArray;

interface JSONObject {
  [x: string]: JSONValue;
}

interface JSONArray extends Array<JSONValue> {}
export async function getMessages(locale: string) {
  try {
    const messages = (await import(`../messages/${locale}.json`)) as JSONObject;
    return messages.default;
  } catch (error) {
    notFound();
  }
}
