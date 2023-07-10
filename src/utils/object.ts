import { GeneralObject } from "../..";

const isValidObject = (data: any) =>
  data != null && typeof data === "object" && Object.keys(data).length > 0;

const makeValidObjectIfNot = (data: any) => {
  if (data != null && typeof data === "object") {
    return data;
  } else {
    data = {};
    return data;
  }
};

const createObject = (data: any[]) => {
  const obj: GeneralObject = {};
  data.forEach((d) => {
    obj[d.id] = d.name;
  });
  return obj;
};

export { createObject, isValidObject, makeValidObjectIfNot };
