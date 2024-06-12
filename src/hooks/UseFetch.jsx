import { useState } from "react";

const useFetch = (url, options = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const fetchData = async (body) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(url, {
        ...options,
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Network response was not ok");
      }
      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error);
    }
    setLoading(false);
  };

  return { loading, data, error, fetchData };
};

export default useFetch;
