import { formatList } from "../models/fileFormat";
export const getType = (path: string) => {
  const format = path.split(".");

  for (let i = 0; i < formatList.length; i++) {

    if (formatList[i].container == format[format.length - 1].toUpperCase()) {
      return formatList[i].type;
    }
  }
};
export const toMB = (bytes: number, byteToString: string) => {
  if (bytes >= 1048576) { byteToString = (bytes / 1048576).toFixed(2) + " MB"; }
  else if (bytes >= 1024) { byteToString = (bytes / 1024).toFixed(2) + " KB"; }
  else if (bytes > 1) { byteToString = bytes + " bytes"; }
  else if (bytes == 1) { byteToString = bytes + " byte"; }
  else { byteToString = "0 bytes"; }
  return byteToString;
};