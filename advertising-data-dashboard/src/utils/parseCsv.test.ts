import { AdvertisingDataRow } from "../types/chartTypes";
import parseCSV from "./parseCsv";

describe("parseCSV", () => {
  it("should parse CSV data correctly", () => {
    const csvData = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Google Adwords,B2B - Leads,7,444`;

    const result = parseCSV<AdvertisingDataRow>(csvData);

    expect(result).toEqual([
      {
        Date: "01.01.2019",
        Datasource: "Facebook Ads",
        Campaign: "Like Ads",
        Clicks: "274",
        Impressions: "1979",
      },
      {
        Date: "01.01.2019",
        Datasource: "Google Adwords",
        Campaign: "B2B - Leads",
        Clicks: "7",
        Impressions: "444",
      },
    ]);
  });
});
