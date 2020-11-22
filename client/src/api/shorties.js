export const postNewShorty = async (newShorty) => {
  const response = await fetch("/api/shorties", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newShorty),
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result);
  }
  return result;
};

export const getShorties = async () => {
  const response = await fetch("/api/shorties", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  if (!response.ok) {
    throw new Error(result);
  }
  return result;
};
