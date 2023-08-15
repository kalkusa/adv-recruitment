import { AdvertisingDataRow, Filter, ValueInTime } from "../types/chartTypes";

const getImpressionsByDate = (data: AdvertisingDataRow[]) => {
  // For quick access to data we use Map. Maps under the hood are hash tables [1].
  // Algorithm below is in its nature similar to https://en.wikipedia.org/wiki/Counting_sort
  // [1] https://262.ecma-international.org/6.0/#sec-map-objects
  const impressionsByDate: Map<string, number> = new Map<string, number>();

  for (let i = 0; i < data.length; i++) {
    const key = data[i].date.toISOString();
    const impressionsByGivenDate = impressionsByDate.get(key);
    if (impressionsByGivenDate) {
      impressionsByDate.set(key, impressionsByGivenDate + data[i].impressions);
    } else {
      impressionsByDate.set(key, data[i].impressions);
    }
  }

  return impressionsByDate;
};

export const getAllImpressions = (data: AdvertisingDataRow[]): ValueInTime[] => {
  const impressionsByDate = getImpressionsByDate(data);
  const impressionsByDateArray: ValueInTime[] = [];

  impressionsByDate.forEach((value, dateStr) => {
    const date = new Date(dateStr);
    impressionsByDateArray.push({ date, value });
  });

  impressionsByDateArray.sort((a, b) => a.date.getTime() - b.date.getTime());
  return impressionsByDateArray;
};

export const getImpressionsDataByFilter = (data: AdvertisingDataRow[], filter: Filter): ValueInTime[] => {
  const filteredData = data.filter((row) => {
    if (filter.dataSources.length > 0 && filter.campaigns.length > 0) {
      return filter.dataSources.includes(row.datasource) && filter.campaigns.includes(row.campaign);
    }

    if (filter.dataSources.length > 0 && filter.campaigns.length === 0) {
      return filter.dataSources.includes(row.datasource);
    }

    if (filter.campaigns.length > 0 && filter.dataSources.length === 0) {
      return filter.campaigns.includes(row.campaign);
    }

    return row;
  });

  return getAllImpressions(filteredData);
};
