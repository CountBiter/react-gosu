const UploadFile = async (file) => {
  const formData = new FormData();

  formData.append("data", file);

  const fileUrl = await fetch("http://localhost:5000/upload", {
    method: "POST",
    body: formData,
  })
    .then(async (r) => {
      return r.json();
    })
    .then(async (data) => {
      console.log(await data);
      return await data;
    });
  return await fileUrl;
};

export default UploadFile;
