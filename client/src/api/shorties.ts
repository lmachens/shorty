import { Shorty, NewShorty } from "../../../types/shorties";
import { fetchApi } from "./utils";

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
