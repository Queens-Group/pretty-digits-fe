
export const signUp = async (formData) => {
  const requestBody = {
    fullName: formData.get("fullname"),
    username: formData.get("username"),
    password: formData.get("password"),
    phone: formData.get("phone"),
    role: formData.get("role"),
  };

  return postJson({uri: "/auth/register", body: requestBody})
};

export const postSignIn = async (credentials) => {
  return postJson({uri: "/auth/login", body: credentials});
};

export const postJson = async ({ uri, body, headers }) => {
  const response = await fetch(`${getBaseUrl()}${uri}`, {
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      ...headers,
    },
  });

  const responseBody = await response.json();
  return responseBody;
};

const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "https://18da-114-124-149-142.ngrok-free.app/api/v1";
};
