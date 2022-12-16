import { useState } from "react";

import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ONE_TASK,
  GET_STATE_TIME,
  GET_ALL_COMMENTS_TO_TASK,
  ADD_COMMENT_TO_TASK,
  GET_USER,
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
import { formatDate, formatDuration } from "../../../format-date";
import { GetOrgName, GetStateName, GetUserName } from "../../../hooks";

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
    <div class="input-group mb-3">
      <input 
        class="form-control" 
        placeholder="Добавить комментарий" 
        aria-describedby="button-addon2" 
        onChange={(e) => setComment(e.target.value)}
      />
      <button 
        class="btn btn-outline-primary pb-0" 
        type="button" 
        id="button-addon2" 
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
          <h4><i class="bi bi-chevron-double-right"></i></h4>
          
        </button>
    </div>
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

  function GetUserNameComment({ author_id }) {
    const userName = useQuery(GET_USER, {
      variables: { userId: author_id },
    });

    if (userName.loading) {
      return <p>Loading...</p>;
    }
    if (userName.error) {
      return <p>{error.message} </p>;
    }
    return (
      <span>
        {userName.data.getUser[0].first_name}{" "}
        {userName.data.getUser[0].middle_name}
      </span>
    );
  }

  return getAllComments.map((item) => (
    <div className="card p-2 my-3" key={Math.random()}>
      <div className="card-title border-bottom d-flex justify-content-between">
        <h4 className="fw-bold">
          <GetUserNameComment author_id={item.author_id} />
        </h4>
        time & date
      </div>
      <div className="card-body p-0">
        <h5>
          {item.comments}
        </h5>

      </div>
    </div>
  ));
}

function UpdateStateAndImpl({ stateId, taskId, duration, implemId }) {
  const [updateStateToTask, { loading, error }] =
    useMutation(UPDATE_STATE_TO_TASK);

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

    setInterval(() => {
      let date = Date.now() - Number(data.getStateTime.date);
      setTime(date + 1000);
    }, 1000);

    localStorage.setItem("time", time);

    return <div>{formatDuration(time)}</div>;
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
      <div className="d-flex justify-content-center">
        <div className="col-11 pt-5">
          <div className="mx-3 mb-4">
            <div className="">
              <h2>{getTask.title}</h2>
            </div>
          </div>
          <div className="row p-0">


            <div className="col-8 pe-5">
              <div className="card bg-primary bg-opacity-25 m-0 mb-5">
                <div className="card-body border-bottom bg-primary rounded-top">
                  <h4 className="text-light">
                    Задача id: {getTask._id}
                  </h4>
                </div>
                <div className="card-body">
                  <div className="py-4">
                    <h4>{getTask.description}</h4> 
                  </div>
                  <div className="card-subtitle position-relative d-flex border-top py-2">
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

                <div className="card-footer bg-transparent d-flex justify-content-end py-3">
                  <button className="btn bg-primary bg-opacity-75 text-light fw-bolder px-4">
                    <h5>Сохранить</h5> 
                  </button>
                </div>
              </div>
              <div className="card border-primary">
                <div className="card-body">
                  <div className="card-title"><h4>Комментарии</h4></div>
                </div>
                <div className="card-footer">
                  <div className="border-bottom mb-3">
                    <TaskComments />
                  </div>
                  <AddCommentsToTask />
                </div>
              </div>
              <div className="py-4">
                {" "}
                <ForInfoTask userId={getTask.author_id} />
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
                    <div className="col">{formatDate(getTask.create_date)}</div>
                  </div>
                  <div className="row border-bottom py-2">
                    <div className="col text-secondary">Исполнитель:</div>
                    <div className="col">
                      <GetUserName id={getTask.implementer_id} />
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
                            defaultValue={getTask.state_id}
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
    </>
  );
}

export default Task;
