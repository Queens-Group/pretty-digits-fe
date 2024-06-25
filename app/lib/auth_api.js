
export const signUp = async (formData) => {
    const baseURL = process.env.BASE_BE_URL || "http://localhost:8080/api/v1"
    const requestBody = {
       fullName: formData.get("fullname"),
       username: formData.get("username"),
       password: formData.get("password"),
       phone: formData.get("phone"),
       role: formData.get("role")
    }

    const response = await fetch(`${baseURL}/auth/register`, {
      method: "POST",
      body: JSON.stringify(requestBody),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    });


    const responseBody = await response.json();
    console.log(responseBody)
    return responseBody;
}