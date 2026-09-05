export const SITE_URL = "https://amoozeshgahyab.ir";
export const SITE_NAME = "آموزشگاه یاب";

export function absoluteUrl(path: string): string {
  if (!path) return SITE_URL;
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}