const fetchApi = async (url, options) => {
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

export const postNewShorty = (newShorty) => {
  return fetchApi("/api/shorties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newShorty),
  });
};

export const getShorties = () => {
  return fetchApi("/api/shorties", {
    headers: {
      "Content-Type": "application/json",
    },
  });
};
