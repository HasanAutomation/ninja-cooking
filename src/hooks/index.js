import { useState, useEffect } from 'react';

export const useFetch = url => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(res.statusText);
        const data = await res.json();
        setData(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
        setError(err.message);
      }
    };
    fetchData();
    return () => {
      controller.abort();
    };
  }, [url]);

  return { loading, data, error };
};
