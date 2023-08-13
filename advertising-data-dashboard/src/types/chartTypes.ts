export type AdvertisingDataRow = {
  date: Date;
  datasource: string;
  campaign: string;
  clicks: number;
  impressions: number;
};

export type Filter = {
  dataSources: string[];
  campaigns: string[];
};

export type ValueInTime = {
  date: Date;
  value: number;
};
