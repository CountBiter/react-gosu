import { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_FILE_TO_TASK,
  GET_ONE_TASK,
} from "../../../../apollo-client/apollo-request";
import { GET_ALL_COMMENTS_TO_TASK } from "../../../../apollo-client/apollo-request";
import { ADD_COMMENT_TO_TASK } from "../../../../apollo-client/apollo-request";
import { GET_USER } from "../../../../apollo-client/apollo-request";
import { GET_STATE_TO_TASK } from "../../../../apollo-client/apollo-request";

import {  ForIntoTaskPage } from "../../../if-not-user";
import UploadFile from "../../../upload-file";

function AddCommentsToTask() {
  const taskId = localStorage.getItem("taskId");
  const userToken = JSON.parse(localStorage.getItem("token"));
  const [comment, setComment] = useState("");

  const [addCommentsToTask, { loading, error }] =
    useMutation(ADD_COMMENT_TO_TASK);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message} </p>;
  }

  return (
    <>
      <input
        type="text"
        className="form-control"
        onChange={(e) => setComment(e.target.value)}
      />
      <button
        className="btn bg-primary text-light"
        onClick={() => {
          addCommentsToTask({
            variables: {
              commentsData: {
                comments: comment,
                task_id: taskId,
              },
              token: userToken.token,
            },
          });
        }}
      >
        <h5>Добавить комментарий</h5>
      </button>
    </>
  );
}

function TaskComments() {
  const taskId = localStorage.getItem("taskId");

  const { data, loading, error } = useQuery(GET_ALL_COMMENTS_TO_TASK, {
    variables: { taskId: taskId },
  });

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message} </p>;
  }

  const { getAllComments } = data;

  return getAllComments.map((item) => {
    function GetUserName() {
      const { data, loading, error } = useQuery(GET_USER, {
        variables: { userId: item.author_id },
      });

      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>{error.message} </p>;
      }

      return (
        <span>
          {data.getUser.first_name} {data.getUser.middle_name}
        </span>
      );
    }
    return (
      <h4 className="card-title" key={Math.random()}>
        <GetUserName /> <br /> {item.comments}
      </h4>
    );
  });
}

function Task() {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const taskId = localStorage.getItem("taskId");
  const { data, loading, error } = useQuery(GET_ONE_TASK, {
    variables: { taskId: taskId },
  });
  const [addFileToTask] = useMutation(ADD_FILE_TO_TASK);
  const [file, setFile] = useState();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message} </p>;
  }

  const { getTask } = data;

  function GetUserName() {
    console.log( getTask.implementer_id)
    const { data, loading, error } = useQuery(GET_USER, {
      variables: { userId: getTask.implementer_id },
    });
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }
    if (data.getUser.length === 0) {
      return <span>не назначен</span>;
    } else {
      return data.getUser.map(({first_name, middle_name}) => (
        <span>
          {first_name} {" "}
          {middle_name}<br />
        </span>
      ))
    }
  }

  function GetState() {
    const { data, loading, error } = useQuery(GET_STATE_TO_TASK, {
      variables: { stateId: getTask.state_id },
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }
    if (data.getState === null) {
      return <span>без статуса</span>;
    } else {
      return <span>{data.getState.title}</span>;
    }
  }

  return (
    <div className="container-fluid d-flex flex-column align-items-center">
      <div className="col-11 text-start">
        <div className="text-light mx-4 mb-4 mt-4">
          <div className="">
            <h2>{getTask.title}</h2>
          </div>
        </div>
        <div className="row m-0">
          <div className="col-md-8">
            <div className="card bg-light mb-5">
              <div className="card-body pb-0">
                <h6 className="card-title border-bottom pb-2 text4">
                  Задача {getTask._id}
                </h6>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="2"
                >
                  {getTask.description}
                </textarea>
                <div className="card-subtitle position-relative d-flex py-2">
                  <label className="btn p-0 m-0" id="addfile-btn">
                    <i className="bi bi-paperclip h4 d-inline-block"></i>
                    <h5
                      className="m-0 text-secondary my-auto d-inline-block"
                      id="addfile-text"
                    >
                      <input
                        id="addfile"
                        type="file"
                        hidden="hidden"
                        onChange={async (e) => {
                          setFile(await UploadFile(e.target.files[0]));
                        }}
                      />
                      + прикрепить файл
                    </h5>
                  </label>
                </div>
              </div>

              <div className="card-footer bg-transparent py-3">
                <button
                  className="btn bg-primary bg-opacity-50 text-primary fw-bolder"
                  onClick={(e) => {
                    e.preventDefault();
                    addFileToTask({
                      variables: {
                        taskId: taskId,
                        fileData: {
                          name: file.file_name,
                          create_date: `${Date.now()}`,
                          file_url: file.file_url,
                        },
                        token: userToken.token,
                      },
                    });
                  }}
                >
                  Сохранить
                </button>
              </div>
            </div>
            <div className="card mb-5 mb-md-0">
              <div className="card-body">
                <TaskComments />
                <AddCommentsToTask />
              </div>
            </div>
          </div>
          <div className="col-md-4 bg-Success">
            <div className="card">
              <div className="card-title bg-primary rounded-top py-4"> </div>
              <div className="card-body rounded-bottom">
                <div className="row border-bottom py-2">
                  <div className="col text-secondary">Поставлена:</div>
                  <div className="col">{getTask.create_date}</div>
                </div>
                <div className="row border-bottom py-2">
                  <div className="col text-secondary">Исполнитель:</div>
                  <div className="col">
                    <GetUserName />
                  </div>
                </div>
                <div className="row border-bottom py-2">
                  <div className="col text-secondary">Приоритет:</div>
                  <div className="col">{getTask.priority}</div>
                </div>
                <div className="row py-2">
                  <div className="col text-secondary">Статус:</div>
                  <div className="col">
                    <GetState />
                  </div>
                </div>
                <div className="row border-top py-2 pt-4 d-flex justify-content-around">
                  <button className="btn col-5 bg-primary text-light">
                    Взять в работу
                  </button>
                  <button className="btn col-5 bg-primary bg-opacity-25 text-primary">
                    Закрыть предв.
                  </button>
                </div>
              </div>
            </div>
            <ForIntoTaskPage />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Task;
