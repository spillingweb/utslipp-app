import { useState } from "react";

export const useFetch = <T>(): {
  loading: boolean;
  fetchedData: T | undefined;
  setFetchedData: React.Dispatch<React.SetStateAction<T | undefined>>;
  error: string;
  fetchData: (fetchFn: () => Promise<T>) => void;
} => {
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState<T>();
  const [error, setError] = useState("");

  async function fetchData(fetchFn: () => Promise<T>) {
    setLoading(true);
    try {
      const data = await fetchFn();
      setError("");
      setFetchedData(data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Kunne ikke hente data fra tjener."
      );
      setFetchedData(undefined);
    }

    setLoading(false);
  }

  return {
    loading,
    fetchedData,
    setFetchedData,
    error,
    fetchData,
  };
};
