import { getAllClicks } from "./getClicks";
import parseCSV from "./parseCsv";
import { parse, startOfDay } from "date-fns";

describe("getAllClicks", () => {
  it("should extract proper amount of clicks from non overlapping dates", () => {
    const csvData = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
02.01.2019,Google Adwords,B2B - Leads,7,444`;

    const data = parseCSV(csvData);
    const clicks = getAllClicks(data);

    expect(clicks).toEqual([
      {
        date: startOfDay(parse("01.01.2019", "dd.MM.yyyy", new Date())),
        value: 274,
      },
      {
        date: startOfDay(parse("02.01.2019", "dd.MM.yyyy", new Date())),
        value: 7,
      },
    ]);
  });

  it("should extract proper amount of clicks from overlapping dates", () => {
    const csvData = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 1 Offer,16,12535
02.01.2019,Google Adwords,GDN Prospecting - App - Prio 2 Offer,93,18866`;

    const data = parseCSV(csvData);
    const clicks = getAllClicks(data);

    expect(clicks).toEqual([
      {
        date: startOfDay(parse("01.01.2019", "dd.MM.yyyy", new Date())),
        value: 274 + 10245 + 7 + 16,
      },
      {
        date: startOfDay(parse("02.01.2019", "dd.MM.yyyy", new Date())),
        value: 93,
      },
    ]);
  });
});
