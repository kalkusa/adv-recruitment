import { ReactNode, createContext, useState } from "react";
import { Filter } from "../types/chartTypes";

interface Props {
  children?: ReactNode;
}

export interface FilterContextValue {
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export const FilterContext = createContext<FilterContextValue | null>(null);

export const FilterProvider = ({ children }: Props) => {
  const [filter, setFilter] = useState<Filter>({
    dataSources: [],
    campaigns: [],
  });

  return <FilterContext.Provider value={{ filter, setFilter }}>{children}</FilterContext.Provider>;
};
