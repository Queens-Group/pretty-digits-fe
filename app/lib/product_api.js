export const getAvailableProducts = async ({ page, size }) => {
  const response = await fetch(`${getBaseUrl()}/products/available?page=${page || 0}&size=${size || 20}`);

  const responseBody = await response.json();
  return responseBody;
};

const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "http://localhost:8080/api/v1";
};