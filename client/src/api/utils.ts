export const fetchApi = async <T>(
  url: RequestInfo,
  options?: RequestInit
): Promise<T> => {
  const response = await fetch(url, options);

  const isJSON = response.headers
    .get("Content-Type")
    ?.includes("application/json");
  const result = await (isJSON ? response.json() : response.text());

  if (!response.ok) {
    throw new Error(result);
  }
  return result;
};
