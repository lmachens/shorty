import { Shorty, NewShorty } from "../../../types/shorties";

const fetchApi = async <T,>(
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

export const postNewShorty = (newShorty: NewShorty) => {
  return fetchApi("/api/shorties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newShorty),
  });
};

export const getShorties = () => {
  return fetchApi<Shorty[]>("/api/shorties", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
