import { Href } from "expo-router";

const liqudMatchRegex = RegExp(String.raw`{{\s{1}.*?\s{1}}}`, "gmi");
const baseUri = "whatsapp://send";

export function liquidTextTemplate(text: string, liqudData: any) {
  const matchList = text.match(liqudMatchRegex);
  if (!matchList) return text;

  for (const match of matchList) {
    const key = match.replace(/{{\s{1}/gim, "").replace(/\s{1}}}/gim, "");
    text = text.replace(match, liqudData[key]);
  }

  return text;
}

export function messageSearchParams(
  phone: string | number,
  text: string
): Href {
  const searchParams = new URLSearchParams("");
  searchParams.append(
    "phone",
    typeof phone === "number" ? phone.toString() : phone
  );
  searchParams.append("text", text);

  return `${baseUri}?${searchParams.toString()}`;
}

export function cardMessageFormat(
  number: number | string,
  text: string,
  liquidData: any
): Href {
  const _text = liquidTextTemplate(text, liquidData);
  return messageSearchParams(number, _text);
}
