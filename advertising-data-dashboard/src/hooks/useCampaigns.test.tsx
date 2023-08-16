import { renderHook, waitFor } from "@testing-library/react";
import useCampaigns from "./useCampaigns";
import { ParsedDataContext } from "../contexts/ParsedDataContext";
import { Context } from "react";
import React from "react";

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

describe("useCampaigns", () => {
  let useContextSpy: jest.SpyInstance<unknown, [context: Context<unknown>]>;

  beforeEach(() => {
    useContextSpy = jest.spyOn(React, "useContext").mockImplementation((context) => {
      if (context === ParsedDataContext) {
        return mockData;
      }
      return context;
    });
  });

  afterEach(() => {
    useContextSpy.mockRestore();
  });

  it("should fetch and return all campaigns if no data source is provided", async () => {
    const { result } = renderHook(() => useCampaigns([]));

    await waitFor(() => {
      expect(result.current).toEqual(["Like Ads", "B2B - Leads"]);
    });
  });

  it("should fetch and return campaigns filtered by data source", async () => {
    const { result } = renderHook(() => useCampaigns(["Facebook Ads"]));

    await waitFor(() => {
      expect(result.current).toEqual(["Like Ads"]);
    });
  });
});
