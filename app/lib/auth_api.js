
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

export const getUserInfo = (accessToken) => {
   return fetch(`${getBaseUrl()}/auth/userInfo`, {
     headers: {
       Authorization: `Bearer ${accessToken}`
     }
   }).then(res => res.json())
    .catch(err => null)
}

const getBaseUrl = () => {
  return process.env.BASE_BE_URL || "http://localhost:8080/api/v1";
};
