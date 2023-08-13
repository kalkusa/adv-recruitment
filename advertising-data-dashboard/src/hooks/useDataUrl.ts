const useDataUrl = (): string => {
  return process.env.PUBLIC_URL + "/assets/simplifiedTestData.csv";
  // return process.env.PUBLIC_URL + "/assets/data.csv";
};

export default useDataUrl;
