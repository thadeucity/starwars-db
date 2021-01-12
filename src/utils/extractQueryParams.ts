const extractQueryParams = (fullQuery: string): Record<string, string> => {
  const queryParams = fullQuery.substring(1).split('&');
  return queryParams.reduce((acc, current) => {
    const [key, value] = current.split('=');
    return {
      ...acc,
      [key]: value,
    };
  }, {});
};

export default extractQueryParams;
