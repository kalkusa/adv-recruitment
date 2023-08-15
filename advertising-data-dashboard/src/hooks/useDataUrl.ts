const useDataUrl = (): string => {
  // return process.env.PUBLIC_URL + "/assets/simplifiedTestData.csv";
  // return process.env.PUBLIC_URL + "/assets/data.csv";
  // return process.env.PUBLIC_URL + "/assets/oneDataSourceOneCampaign.csv";
  return process.env.PUBLIC_URL + "/assets/customTestData.csv";
};

export default useDataUrl;
