export function getQueryMap(url: string): Record<string, string> {
  const queryIndex = url.indexOf("?");
  if (queryIndex === -1) return {};

  const queryStr = url.slice(queryIndex + 1);
  const pairs = queryStr.split("&");
  const result: Record<string, string> = {};

  pairs.forEach(pair => {
    const [key, value] = pair.split("=");
    if (key) result[key] = value || "";
  });

  return result;
}
