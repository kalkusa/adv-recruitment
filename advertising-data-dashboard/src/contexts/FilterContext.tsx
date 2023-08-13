import React, { ReactNode, createContext, useContext, useState } from "react";
import { Filter } from "../types/chartTypes";

interface Props {
  children?: ReactNode;
}

export const FilterContext = createContext<any>(null);

export const FilterProvider = ({ children }: Props) => {
  const [filter, setFilter] = useState<Filter>({
    dataSources: [],
    campaigns: [],
  });

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
};
