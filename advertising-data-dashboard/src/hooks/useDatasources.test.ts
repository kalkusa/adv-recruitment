import { renderHook, waitFor } from "@testing-library/react";
import useDatasources from "./useDatasources";

describe("useDatasources", () => {
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

  it("should fetch and return unique datasources", async () => {
    const { result } = renderHook(() => useDatasources());

    await waitFor(() => {
      expect(result.current).toEqual(["Facebook Ads", "Google Adwords"]);
    });
  });
});
