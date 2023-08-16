import { renderHook, waitFor } from "@testing-library/react";
import useDatasources from "./useDatasources";
import { ParsedDataContext } from "../contexts/ParsedDataContext";
import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

describe("useDatasources", () => {
  it("should fetch and return unique datasources", async () => {
    const mockData = [
      {
        date: new Date("01.01.2019"),
        datasource: "Facebook Ads",
        campaign: "Like Ads",
        clicks: 274,
        impressions: 1979,
      },
      {
        date: new Date("01.01.2019"),
        datasource: "Google Adwords",
        campaign: "B2B - Leads",
        clicks: 7,
        impressions: 444,
      },
    ];

    const wrapper = ({ children }: WrapperProps) => (
      <ParsedDataContext.Provider value={mockData}>{children}</ParsedDataContext.Provider>
    );

    const { result } = renderHook(() => useDatasources(), { wrapper });

    await waitFor(() => {
      expect(result.current).toEqual(["Facebook Ads", "Google Adwords"]);
    });
  });
});
