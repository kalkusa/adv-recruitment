import { useContext } from "react";
import { FilterContext, FilterContextValue } from "../contexts/FilterContext";

export const useFilter = (): FilterContextValue => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilter must be used within a FilterProvider");
  }
  return context;
};
