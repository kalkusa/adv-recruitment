import { createContext } from "react";
import { AdvertisingDataRow } from "../types/chartTypes";
import useParsedData from "../hooks/useParsedData";
import React from "react";

export const ParsedDataContext = createContext<AdvertisingDataRow[]>([]);

type ParsedDataProviderProps = {
  children: React.ReactNode; // 👈️ added type for children
};

export const ParsedDataProvider = React.memo(({ children }: ParsedDataProviderProps) => {
  const parsedData = useParsedData();

  return <ParsedDataContext.Provider value={parsedData}>{children}</ParsedDataContext.Provider>;
});
