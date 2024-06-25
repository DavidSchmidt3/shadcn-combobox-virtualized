import pkg, { IndexOptionsForDocumentSearch } from "flexsearch";
import { useEffect, useState } from "react";
import { TRANSITION_DURATION } from "../../tailwind.config";
const { Document } = pkg;

// Take a look at the flexsearch documentation for more information about the index parameters
// https://github.com/nextapps-de/flexsearch
const documentIndexParams = {
  document: {
    id: "id",
    index: [
      {
        field: "name",
        tokenize: "full",
      },
    ],
    store: true,
  },
} satisfies IndexOptionsForDocumentSearch<unknown, boolean>;

export const useCombobox = <T extends { id: string; name: string }>(
  data: T[]
) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>("");
  const [searchResults, setSearchResults] = useState(data);
  const [searchIndex, setSearchIndex] = useState(
    new Document(documentIndexParams)
  );

  function searchFilterData(event: React.ChangeEvent<HTMLInputElement>) {
    // show all data if the search input is empty
    if (!event.target.value) {
      setSearchResults(data);
      return;
    }
    // enrich to return the whole documents
    const [nameFieldResult] = searchIndex.search(event.target.value, {
      enrich: true,
      index: "name",
      limit: 100,
    });
    const formattedResults = nameFieldResult?.result.map((result) => {
      // @ts-ignore wrong type after enrich
      const doc = result.doc;
      return doc as unknown as (typeof data)[number];
    });
    setSearchResults(formattedResults ?? []);
  }

  // Initialize the data index
  useEffect(() => {
    const index = new Document(documentIndexParams);
    for (let i = 0; i < data.length; i++) {
      index.add({
        id: data[i].id,
        name: data[i].name,
      });
    }
    setSearchIndex(index);
  }, [data]);

  // Reset the search results after closing the combobox
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setSearchResults(data);
      }, TRANSITION_DURATION);
    }
  }, [open, data]);

  return {
    searchResults,
    value,
    searchFilterData,
    setValue,
    open,
    setOpen,
  };
};
