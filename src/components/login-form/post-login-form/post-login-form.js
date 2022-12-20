export const PostLoginForm = async (LoginData) => {
  const userToken = await fetch(`http://localhost:3000/login`, {
    method: "POST",
    body: JSON.stringify(LoginData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((data) => {
      return data;
    });

  return userToken;
};

export const PostOrgLoginForm = async (orgData) => {
  console.log(orgData)
  const res = await fetch("http://localhost:3000/loginorg", {
    method: "POST",
    body: JSON.stringify(orgData),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((r) => r.json())
    .then((data) => data);

  return res;
};
