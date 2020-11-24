import React, { useCallback, useEffect, useState } from "react";
import { Shorty } from "../../../types/shorties";
import { getShorties } from "../api/shorties";
import ErrorMessage from "../components/ErrorMessage";
import InsertShorty from "../components/InsertShorty";
import ShortiesTable from "../components/ShortiesTable";

const Shorties = () => {
  const [shorties, setShorties] = useState<Shorty[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>(null);

  const refreshShorties = useCallback(async () => {
    try {
      setError(null);
      setLoading(true);
      const latestShorties = await getShorties();
      setShorties(latestShorties);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshShorties();
  }, [refreshShorties]);

  return (
    <>
      <InsertShorty onSuccess={refreshShorties} />
      {loading && <div>Loading...</div>}
      {error && <ErrorMessage message={error.message} />}
      <ShortiesTable shorties={shorties} />
    </>
  );
};

export default Shorties;
