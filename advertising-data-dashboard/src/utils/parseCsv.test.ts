import { parse, startOfDay } from "date-fns";
import parseCSV from "./parseCsv";

describe("parseCSV", () => {
  it("should parse CSV data correctly", () => {
    const csvData = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Google Adwords,B2B - Leads,7,444`;

    const result = parseCSV(csvData);

    expect(result).toEqual([
      {
        date: startOfDay(parse("01.01.2019", "dd.MM.yyyy", new Date())),
        datasource: "Facebook Ads",
        campaign: "Like Ads",
        clicks: 274,
        impressions: 1979,
      },
      {
        date: startOfDay(parse("01.01.2019", "dd.MM.yyyy", new Date())),
        datasource: "Google Adwords",
        campaign: "B2B - Leads",
        clicks: 7,
        impressions: 444,
      },
    ]);
  });
});
