export const getAvailableProducts = async ({ page, size }) => {
  const response = await fetch(`${getBaseUrl()}/products/available?page=${page || 0}&size=${size || 20}`);

  const responseBody = await response.json();
  return responseBody;
};

const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "https://18da-114-124-149-142.ngrok-free.app/api/v1";
};