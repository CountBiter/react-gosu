const PostLoginForm = async (LoginData) => {
  const userToken = await fetch(`http://192.168.31.207:3000/login`, {
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

export default PostLoginForm;
