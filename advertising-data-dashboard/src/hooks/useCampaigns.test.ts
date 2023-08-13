import { renderHook, waitFor } from "@testing-library/react";
import useCampaigns from "./useCampaigns";

describe("useCampaigns", () => {
  let originalFetch: typeof global.fetch;

  beforeEach(() => {
    originalFetch = global.fetch;

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        text: () =>
          Promise.resolve(`Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Google Adwords,B2B - Leads,7,444`),
        json: () => Promise.resolve({}),
        ok: true,
      } as Response)
    );
  });

  afterEach(() => {
    global.fetch = originalFetch;
  });

  it("should fetch and return unique campaigns", async () => {
    const { result } = renderHook(() => useCampaigns());

    await waitFor(() => {
      expect(result.current).toEqual(["Like Ads", "B2B - Leads"]);
    });
  });
});
