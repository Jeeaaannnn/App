import { Case } from "@/interfaces/case.interface";

export function percTwoDateNow(to: number) {
  // if (typeof from !== "number") throw new Error("Invalid from date.");
  if (typeof to !== "number") throw new Error("Invalid to date.");
  const now = Date.now();

  return Math.min(Math.max(Math.trunc((now * 100) / to), 0), 100);
}

export function formatReadableTimer(ms: number) {
  const min = Math.floor(ms / 1000 / 60);
  const sec = (ms / 1000) % 60;

  return `${min}:${sec.toString().padStart(2, "0")}`;
}


// Replace Case type with Date 
export function formatDate(data: Case): string {
  if (!data) return "";
  const date = new Date(data.settledAt);
  return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
}
