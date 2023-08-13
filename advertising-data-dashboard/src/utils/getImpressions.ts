import _ from "lodash";
import { AdvertisingDataRow, Filter, ValueInTime } from "../types/chartTypes";
import { isSameDay } from "date-fns";

export const getAllImpressions = (data: AdvertisingDataRow[]): ValueInTime[] => {
  const impressionsByDate = _(data)
    .orderBy(["date"], ["asc"]) // sort by date ascending
    .reduce((acc: AdvertisingDataRow[], curr: AdvertisingDataRow) => {
      // Because each row contains the number of impressions for a particular date, campaign, and data source,
      // we need to sum impressions for all data sources and campaigns
      const existingEntry = acc.find((entry: any) => {
        return isSameDay(entry.date, curr.date);
      });
      if (existingEntry) {
        existingEntry.impressions = existingEntry.impressions + curr.impressions;
      } else {
        acc.push({ ...curr });
      }
      return acc;
    }, [])
    .map((row: any) => {
      return { date: row.date, value: row.impressions } as ValueInTime;
    });

  return impressionsByDate;
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
      return filter.campaigns.includes(row.campaign); // Changed from filter.dataSources.includes(row.campaign)
    }

    return row;
  });

  return getAllImpressions(filteredData);
};
