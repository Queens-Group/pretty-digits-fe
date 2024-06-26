const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "http://localhost:8080/api/v1/cart";
};

export const postJson = async ({ uri, body, headers }, accessToken) => {
  const response = await fetch(`${getBaseUrl()}${uri}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${accessToken}`,
      ...headers,
    },
  });

  const responseBody = await response.json();
  return responseBody;
};

export const addItemToCart = async (productId, accessToken) => {
  return await postJson({
    uri: "/add-item",
    body: {productId},
  }, accessToken);
}
