import _ from "lodash";
import { AdvertisingDataRow, Filter, ValueInTime } from "../types/chartTypes";
import { isSameDay } from "date-fns";

export const getAllClicks = (data: AdvertisingDataRow[]): ValueInTime[] => {
  const clicksByDate = _(data)
    .orderBy(["date"], ["asc"]) // sort by date ascending
    .reduce((acc: AdvertisingDataRow[], curr: AdvertisingDataRow) => {
      // Because each row contain amount of clicks for particular date, campaign and data source,
      // we need to sum clicks for all data sources and campaigns
      const existingEntry = acc.find((entry: any) => {
        return isSameDay(entry.date, curr.date);
      });
      if (existingEntry) {
        existingEntry.clicks = existingEntry.clicks + curr.clicks;
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, [])
    .map((row: any) => {
      return { date: row.date, value: row.clicks } as ValueInTime;
    });

  return clicksByDate;
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
      return filter.dataSources.includes(row.campaign);
    }

    return row;
  });

  console.log("getClicksDataByFilter filteredData: %o", filteredData);

  return getAllClicks(filteredData);
};
