import { AdvertisingDataRow, Filter, ValueInTime } from "../types/chartTypes";

const getClicksByDate = (data: AdvertisingDataRow[]) => {
  // For quick access to data we use Map. Maps under the hood are hash tables [1].
  // Algorithm below is in its nature similar to https://en.wikipedia.org/wiki/Counting_sort
  // [1] https://262.ecma-international.org/6.0/#sec-map-objects
  const clicksByDate: Map<string, number> = new Map<string, number>();

  for (let i = 0; i < data.length; i++) {
    const key = data[i].date.toISOString();
    const clicksByGivenDate = clicksByDate.get(key);
    if (clicksByGivenDate) {
      clicksByDate.set(key, clicksByGivenDate + data[i].clicks);
    } else {
      clicksByDate.set(key, data[i].clicks);
    }
  }

  return clicksByDate;
};

export const getAllClicks = (data: AdvertisingDataRow[]): ValueInTime[] => {
  const clicksByDate = getClicksByDate(data);
  const clicksByDateArray: ValueInTime[] = [];

  clicksByDate.forEach((value, dateStr) => {
    const date = new Date(dateStr);
    clicksByDateArray.push({ date, value });
  });

  clicksByDateArray.sort((a, b) => a.date.getTime() - b.date.getTime());

  return clicksByDateArray;
};

export const getClicksDataByFilter = (data: AdvertisingDataRow[], filter: Filter): ValueInTime[] => {
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

  return getAllClicks(filteredData);
};
