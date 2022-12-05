import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_TASK } from "../../../apollo-client/apollo-request";
import UploadFile from "../../upload-file";

function AddTaskForOther() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const [addTask, { loading, error }] = useMutation(ADD_TASK);
  const [shopName, setShopNameState] = useState("");
  const [priority, setPriorityState] = useState("");
  const [text, setTextState] = useState("");
  const [file, setFile] = useState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <form className="p-5 text-start">
      <div className="mb-3">
        <label className="form-label">
          Укажите название магазина или торговой точки:
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          onChange={(e) => setShopNameState(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Укажите приоритет:</label>
        <select
          className="form-select mb-3"
          id="exampleFormControlSelect"
          onChange={(e) => {
            setPriorityState(e.target.value);
          }}
        >
          <option> </option>
          <option>Обычный</option>
          <option className="bg-warning bg-opacity-50">Высокий</option>
          <option className="bg-danger bg-opacity-50">Критический</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Опишите проблему:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="2"
          onChange={(e) => setTextState(e.target.value)}
        ></textarea>
      </div>
      <div className="mb-3 position-relative">
        <label className="btn p-0 m-0" id="addfile-btn">
          <input
            id="addfile"
            type="file"
            hidden="hidden"
            onChange={async (e) => {
              setFile(e.target.files[0]);
            }}
          />
          <i className="bi bi-paperclip h4 d-inline-block"></i>
          <h5
            className="m-0 text-secondary my-auto d-inline-block"
            id="addfile-text"
          >
            {file === undefined ? "Файл" : file.name}
          </h5>
        </label>
      </div>
      <div className="form-floating">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          onClick={async (e) => {
            e.preventDefault();
            const fileData = await UploadFile(e.target.files[0]);
            addTask({
              variables: {
                taskData: {
                  title: "Другое",
                  description: text,
                  create_date: `${Date.now()}`,
                  priority: priority,
                  mata_tags: [shopName],
                  files: [
                    {
                      name: fileData.file_name,
                      create_date: `${Date.now()}`,
                      file_url: fileData.file_url,
                    },
                  ],
                },
                token: userToken.token,
              },
            });
          }}
        >
          СОЗДАТЬ ЗАЯВКУ
        </button>
      </div>
    </form>
  );
}

export default AddTaskForOther;
