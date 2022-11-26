import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_TASK } from "../../../apollo-client/apollo-request";

function AddTaskForHardSetitng() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const [addTask, { loading, error }] = useMutation(ADD_TASK);
  const [shopName, setShopNameState] = useState("");
  const [priority, setPriorityState] = useState("");
  const [text, setTextState] = useState("");

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
          id="exampleFormControlInput1"
          aria-label="select"
          onChange={(e) => setPriorityState(e.target.value)}
        >
          <option selected disabled>
            {" "}
          </option>
          <option>Обычный</option>
          <option>Высокий</option>
          <option>Критический</option>
        </select>
      </div>
      <div className="mb-3">
        <label className="form-label">Опишите проблему:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="1"
          onChange={(e) => setTextState(e.target.value)}
        ></textarea>
      </div>
      <div className="form-floating">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          onClick={(e) => {
            e.preventDefault();
            addTask({
              variables: {
                taskData: {
                  title: "Настройка оборудования",
                  description: text,
                  create_date: `${Date.now()}`,
                  priority: priority,
                  mata_tags: [shopName],
                  files: [
                    {
                      name: "asd",
                      create_date: `${Date.now()}`,
                      file_url: "asd",
                    },
                  ],
                },
                token: userToken.token,
              },
            });
          }}
        >
          Создать заявку
        </button>
      </div>
    </form>
  );
}

export default AddTaskForHardSetitng;
