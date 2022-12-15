import { useMutation } from "@apollo/client";
import { useState } from "react";
import UploadFile from "../../upload-file";
import { ADD_TASK } from "../../../apollo-client/apollo-request";

function AddTaskForQuestion() {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const [addTask, { loading, error }] = useMutation(ADD_TASK);
  const [question, setQuestionState] = useState("");
  const [priority, setPriorityState] = useState("");
  const [text, setTextState] = useState("");
  const [file, setFile] = useState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <form className="pt-5 pb-4 px-4 text-start">
      <div className="mb-3">
        <label className="form-label">
          Выберите из списка примерный вариант вопроса:
        </label>
        <select
          className="form-select mb-3"
          id="exampleFormControlSelect1"
          aria-label="Default select example"
          onChange={(e) => {
            setQuestionState(e.target.value);
          }}
        >
          <option> </option>
          <option>Создание пользователя</option>
          <option>Настройка отчёта</option>
          <option>Нет цен</option>
          <option>Проблемы с себестоимостью</option>
          <option>Вопрос по бухгалтерии</option>
          <option>Вопрос по ЗУПу</option>
          <option>Изменить неверный документ</option>
          <option>Новое техническое задание</option>
          <option>Не закрывается смена</option>
          <option>Ничего не подходит</option>
        </select>
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
          onChange={(e) => {
            setTextState(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="mb-3 position-relative">
        <label className="btn p-0 m-0" id="addfile-btn">
          <input
            id="addfile"
            type="file"
            hidden="hidden"
            onChange={(e) => {
              console.log(e.target.files);
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
            const fileData = await UploadFile(file);
            addTask({
              variables: {
                taskData: {
                  title: "Вопрос по 1С",
                  description: text,
                  create_date: `${Date.now()}`,
                  priority: priority,
                  mata_tags: [question],
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
            document.location = "/task"
          }}
        >
          СОЗДАТЬ ЗАЯВКУ
        </button>
      </div>
    </form>
  );
}

export default AddTaskForQuestion;
