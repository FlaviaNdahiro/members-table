
import { useEffect, useState } from "react";

function readParams() {
  const searchParams = new URLSearchParams(window.location.search);

  return {
    page: Number(searchParams.get("page")) || 1,
    pageSize: Number(searchParams.get("pageSize")) || 10,
    sortBy: searchParams.get("sortBy") || "firstName",
    order: searchParams.get("order") || "asc",
    q: searchParams.get("q") || "",
    gender: searchParams.get("gender") || "",
  };
}

export function useTableParams() {
  const [params, setParams] = useState(readParams);

  useEffect(() => {
    function handlePopState() {
      setParams(readParams());
    }

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

  function update(changes) {
    setParams((currentParams) => {
      const nextParams = {
        ...currentParams,
        ...changes,
      };

      // Every change except changing the page resets to page 1.
      const onlyPageChanged = Object.keys(changes).every(
        (key) => key === "page"
      );

      if (!onlyPageChanged) {
        nextParams.page = 1;
      }

      const searchParams = new URLSearchParams();

      Object.entries(nextParams).forEach(([key, value]) => {
        if (value !== "" && value !== null && value !== undefined) {
          searchParams.set(key, value);
        }
      });

      const newUrl = `${window.location.pathname}?${searchParams.toString()}`;

      window.history.pushState({}, "", newUrl);

      return nextParams;
    });
  }

  return {
    params,
    update,
  };
}
