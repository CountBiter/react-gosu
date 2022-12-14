import { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ONE_TASK,
  GET_STATE_TIME,
  GET_ALL_COMMENTS_TO_TASK,
  ADD_COMMENT_TO_TASK,
  GET_USER,
  GET_STATE_TO_TASK,
  GET_ALL_STASUS,
  UPDATE_STATE_TO_TASK,
  GET_ORG,
  GET_ALL_IMPLEMENTER,
  GET_STATE,
  ADD_IMPLEM_TO_TASK,
} from "../../../../apollo-client/apollo-request";
import { ForInfoTask } from "../../../if-not-user";
import Popup from "reactjs-popup";
import Select from "react-select";
import "reactjs-popup/dist/index.css";

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
    function GetUserNameComment() {
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
        <GetUserNameComment /> <br /> {item.comments}
      </h4>
    );
  });
}

function UpdateStateAndImpl({ stateId, taskId, duration, implemId }) {
  const [updateStateToTask, { loading, error }] =
    useMutation(UPDATE_STATE_TO_TASK);
  console.log(implemId);

  const [addImplemToTask, data] = useMutation(ADD_IMPLEM_TO_TASK);
  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message} </p>;
  }
  if (data.loading) {
    return <p>Loading...</p>;
  }
  if (data.error) {
    return <p>{error.message} </p>;
  }

  return (
    <button
      onClick={() => {
        (() => {
          addImplemToTask({
            variables: {
              implemId: implemId,
              taskId: taskId,
            },
          });
          updateStateToTask({
            variables: {
              stateId: stateId,
              taskId: taskId,
              duration: duration,
            },
          });
        })();
      }}
    >
      {" "}
      Сохранить
    </button>
  );
}

function Task() {
  const taskId = localStorage.getItem("taskId");
  const { data, loading, error } = useQuery(GET_ONE_TASK, {
    variables: { taskId: taskId },
  });
  const allImplementer = useQuery(GET_ALL_IMPLEMENTER);

  const [state, setState] = useState("");
  const [implem, setImplem] = useState();

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>{error.message} </p>;
  }
  if (allImplementer.loading) {
    return <p>Loading...</p>;
  }
  if (allImplementer.error) {
    return <p>{error.message} </p>;
  }

  const { getTask } = data;

  function GetUserName({ userId }) {
    console.log(getTask.implementer_id);
    const { data, loading, error } = useQuery(GET_USER, {
      variables: { userId: userId },
    });
    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }
    console.log(data);
    if (data.getUser.length === 0 || data.getUser === null) {
      return <span>не назначен</span>;
    } else {
      return data.getUser.map(({ first_name, middle_name }) => (
        <span>
          {first_name} {middle_name}
          <br />
        </span>
      ));
    }
  }

  function GetStateName({ id }) {
    const { data, loading, error } = useQuery(GET_STATE, {
      variables: { stateId: id },
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }

    if (data.getState === null) {
      return <span>не назначен</span>;
    } else {
      return <span>{data.getState.title}</span>;
    }
  }

  function GetState() {
    const allState = useQuery(GET_ALL_STASUS);

    if (allState.loading) {
      return <option>Loading...</option>;
    }
    if (allState.error) {
      return <option>{error.message} </option>;
    }

    return allState.data.getAllState.map(({ title, _id }) => (
      <option value={_id} key={_id}>
        {title}
      </option>
    ));
  }

  function GetTimeState({ taskId }) {
    const { data, loading, error } = useQuery(GET_STATE_TIME, {
      variables: { taskId: taskId },
    });
    let [time, setTime] = useState(0);
    if (loading) {
      return <div>Loading...</div>;
    }
    if (error) {
      return <div>{error.message} </div>;
    }

    const formatDuration = (d) => {
      d = Math.floor(Number(d) / 1000);
      const s = Number(d) % 60;
      d = Math.floor(Number(d) / 60);
      const m = Number(d) % 60;
      const h = Math.floor(Number(d) / 60);
      return [h > 0 ? h : null, m, s]
        .filter((x) => x !== null)
        .map((x) => (x < 10 ? "0" : "") + x)
        .join(":");
    };
    setInterval(() => {
      let date = Date.now() - Number(data.getStateTime.date);
      setTime(date + 1000);
    }, 1000);

    localStorage.setItem("time", time);

    return <div>{formatDuration(time)}</div>;
  }

  function time(time) {
    const padTo2Digits = (num) => {
      return num.toString().padStart(2, "0");
    };
    const date = new Date(Number(time));

    return `    ${[
      padTo2Digits(date.getHours()),
      padTo2Digits(date.getMinutes()),
    ].join(":")}
            ${[
              padTo2Digits(date.getDate()),
              padTo2Digits(date.getMonth() + 1),
              date.getFullYear(),
            ].join(".")}`;
  }

  function GetOrgName({ id }) {
    const { data, loading, error } = useQuery(GET_ORG, {
      variables: {
        userId: id,
      },
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }

    return <span>{data.getOrgByUserId.title}</span>;
  }
  function GetUserNameAuthor({ id }) {
    const { data, loading, error } = useQuery(GET_USER, {
      variables: { userId: id },
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
      return data.getUser.map(({ first_name, middle_name }) => (
        <span>
          {first_name} {middle_name}
          <br />
        </span>
      ));
    }
  }
  const implementerSelect = [{ label: "", value: "" }];
  allImplementer.data.getAllImplementer.forEach((item) => {
    console.log(item);
    implementerSelect.push({
      label: `${item.first_name} ${item.middle_name}`,
      value: item._id,
    });
  });
  const hundleChange = (val) => {
    let arr = [];
    val.forEach((item) => {
      arr.push(item.value.toString());
    });
    setImplem(arr);
  };
  return (
    <>
      {" "}
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
                  <div
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="2"
                  >
                    {getTask.description}
                  </div>
                  <div className="card-subtitle position-relative d-flex py-2">
                    <label className="btn p-0 m-0" id="addfile-btn">
                      <i className="bi bi-paperclip h4 d-inline-block"></i>
                      <h5
                        className="m-0 text-secondary my-auto d-inline-block"
                        id="addfile-text"
                      >
                        <a href={getTask.files[0].file_url}>
                          {getTask.files[0].name}
                        </a>
                      </h5>
                    </label>
                  </div>
                </div>

                <div className="card-footer bg-transparent py-3">
                  <button className="btn bg-primary bg-opacity-50 text-primary fw-bolder">
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
                    <div className="col text-secondary">Организация:</div>
                    <div className="col">
                      <GetOrgName id={getTask.author_id} />
                    </div>
                  </div>
                  <div className="row border-bottom py-2">
                    <div className="col text-secondary">Создатель:</div>
                    <div className="col">
                      <GetUserNameAuthor id={getTask.author_id} />
                    </div>
                  </div>
                  <div className="row border-bottom py-2">
                    <div className="col text-secondary">Поставлена:</div>
                    <div className="col">{time(getTask.create_date)}</div>
                  </div>
                  <div className="row border-bottom py-2">
                    <div className="col text-secondary">Исполнитель:</div>
                    <div className="col">
                      <GetUserName userId={getTask.implementer_id} />
                    </div>
                  </div>
                  <div className="row border-bottom py-2">
                    <div className="col text-secondary">Приоритет:</div>
                    <div className="col">{getTask.priority}</div>
                  </div>
                  <div className="row border-bottom py-2">
                    <div className="col text-secondary">Статус:</div>
                    <div className="col">
                      <GetStateName id={getTask.state_id} />
                    </div>
                  </div>
                  <div className="row py-2"></div>
                  <div className="row border-top py-2 pt-4 d-flex justify-content-around">
                    <Popup
                      trigger={
                        <button className="btn col-5 bg-primary text-light">
                          {" "}
                          Взять/назначить в работу{" "}
                        </button>
                      }
                      modal
                    >
                      <div className="col text-secondary">Статус:</div>
                      <div className="col">
                        <div className="mb-3">
                          <select
                            className="form-select mb-3"
                            id="exampleFormControlSelect"
                            onChange={(e) => {
                              setState(e.target.value);
                            }}
                            value={state}
                          >
                            <GetState />
                          </select>
                        </div>
                      </div>
                      <div className="col text-secondary">Иполнитель:</div>
                      <div className="col">
                        <div className="mb-3">
                          <Select
                            isMulti
                            name="colors"
                            options={implementerSelect}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={hundleChange}
                            isSearchable={true}
                          />
                        </div>
                      </div>
                      <UpdateStateAndImpl
                        stateId={state}
                        taskId={getTask._id}
                        duration={localStorage.getItem("time")}
                        implemId={implem}
                      />
                    </Popup>
                    <button className="btn col-5 bg-primary bg-opacity-25 text-primary">
                      Закрыть предв.
                    </button>
                  </div>
                </div>
              </div>
              <div className="card card-time bg-primary text-light mt-4">
                <div className="card-body pb-0">
                  <div className="card-title">Время</div>
                  <h4>
                    <GetTimeState taskId={getTask._id} />
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="py-5">
        {" "}
        <ForInfoTask userId={getTask.author_id} />
      </div>
    </>
  );
}

export default Task;
