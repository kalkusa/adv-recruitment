import { getAllImpressions, getImpressionsDataByFilter } from "./getImpressions";
import parseCSV from "./parseCsv";
import { parse, startOfDay } from "date-fns";

describe("getAllImpressions", () => {
  it("should extract proper amount of impressions from non overlapping dates", () => {
    const csvData = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
02.01.2019,Google Adwords,B2B - Leads,7,444`;

    const data = parseCSV(csvData);
    const impressions = getAllImpressions(data);

    expect(impressions).toEqual([
      {
        date: startOfDay(parse("01.01.2019", "dd.MM.yyyy", new Date())),
        value: 1979,
      },
      {
        date: startOfDay(parse("02.01.2019", "dd.MM.yyyy", new Date())),
        value: 444,
      },
    ]);
  });

  it("should extract proper amount of impressions from overlapping dates", () => {
    const csvData = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 1 Offer,16,12535
02.01.2019,Google Adwords,GDN Prospecting - App - Prio 2 Offer,93,18866`;

    const data = parseCSV(csvData);
    const impressions = getAllImpressions(data);

    expect(impressions).toEqual([
      {
        date: startOfDay(parse("01.01.2019", "dd.MM.yyyy", new Date())),
        value: 1979 + 764627 + 444 + 12535,
      },
      {
        date: startOfDay(parse("02.01.2019", "dd.MM.yyyy", new Date())),
        value: 18866,
      },
    ]);
  });
});

describe("getImpressionsDataByFilter", () => {
  it("should filter and extract proper amount of impressions based on dataSources and campaigns", () => {
    const csvData = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 1 Offer,16,12535
02.01.2019,Google Adwords,GDN Prospecting - App - Prio 2 Offer,93,18866`;

    const data = parseCSV(csvData);
    const filter = {
      dataSources: ["Facebook Ads"],
      campaigns: ["Like Ads", "Offer Campaigns - Conversions"],
    };
    const impressions = getImpressionsDataByFilter(data, filter);

    expect(impressions).toEqual([
      {
        date: startOfDay(parse("01.01.2019", "dd.MM.yyyy", new Date())),
        value: 1979 + 764627,
      },
    ]);
  });

  it("should return empty array if no data matches the filter", () => {
    const csvData = `Date,Datasource,Campaign,Clicks,Impressions
01.01.2019,Facebook Ads,Like Ads,274,1979
01.01.2019,Facebook Ads,Offer Campaigns - Conversions,10245,764627
01.01.2019,Google Adwords,B2B - Leads,7,444
01.01.2019,Google Adwords,GDN Prospecting - App - Prio 1 Offer,16,12535
02.01.2019,Google Adwords,GDN Prospecting - App - Prio 2 Offer,93,18866`;

    const data = parseCSV(csvData);
    const filter = {
      dataSources: ["Twitter Ads"],
      campaigns: ["Random Campaign"],
    };
    const impressions = getImpressionsDataByFilter(data, filter);

    expect(impressions).toEqual([]);
  });
});
