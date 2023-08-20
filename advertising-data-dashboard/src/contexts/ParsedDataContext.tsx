import { createContext } from "react";
import { AdvertisingDataRow } from "../types/chartTypes";
import useParsedData from "../hooks/useParsedData";
import React from "react";

type ParsedDataContextValue = {
  parsedData: AdvertisingDataRow[];
  isLoading: boolean;
};

export const ParsedDataContext = createContext<ParsedDataContextValue>({
  parsedData: [],
  isLoading: true,
});

type ParsedDataProviderProps = {
  children: React.ReactNode;
};

export const ParsedDataProvider = React.memo(({ children }: ParsedDataProviderProps) => {
  const [parsedData, isLoading] = useParsedData();

  return <ParsedDataContext.Provider value={{ parsedData, isLoading }}>{children}</ParsedDataContext.Provider>;
});
