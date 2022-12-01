import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useQuery } from "@apollo/client";
import {
  GET_ALL_USER_TASKS,
  GET_ALL_USER_IMPLEMENTER_TASKS,
} from "../../../apollo-client/apollo-request";

function UserTask() {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const { data, loading, error } = useQuery(GET_ALL_USER_TASKS, {
    variables: { token: userToken.token },
  });

  if (loading) return <tr>Loading...</tr>;
  if (error) return <tr>Error : {error.message}</tr>;

  const { getAllUserTasks } = data;

  console.log(data);

  if (getAllUserTasks === null) {
    <th>У вас нет задач</th>;
  } else {
    return getAllUserTasks.map(
      (
        {
          _id,
          implementer_id,
          priority,
          state_id,
          mata_tags,
          create_date,
          title,
        },
        i
      ) => (
        <tr key={(i + Math.random()).toString()}>
          <th scope="row" key={(i + Math.random()).toString()}>
            {_id}
          </th>
          <td className="btn" key={(i + Math.random()).toString()}>
            <a
              href="/infotask"
              onClick={() => localStorage.setItem("taskId", _id)}
            >
              {title}
            </a>
          </td>
          <td key={(i + Math.random()).toString()}>
            {mata_tags.map((item) => `${item}, `)}
          </td>
          <td key={(i + Math.random()).toString()}>
            {implementer_id !== null
              ? implementer_id.forEach((i) => `${i}, `)
              : null}
          </td>
          <td key={(i + Math.random()).toString()}>{create_date}</td>
          <td key={(i + Math.random()).toString()}>{priority}</td>
          <td key={(i + Math.random()).toString()}>{state_id}</td>
        </tr>
      )
    );
  }
}

function IAmImplemtnter() {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const { data, loading, error } = useQuery(GET_ALL_USER_IMPLEMENTER_TASKS, {
    variables: { token: userToken.token },
  });

  if (loading) return <tr>Loading...</tr>;
  if (error) return <tr>Error : {error.message}</tr>;

  const { getAllUserImplementerTasks } = data;

  if (getAllUserImplementerTasks === null) {
    <tr>У вас нет задач</tr>;
  } else {
    return getAllUserImplementerTasks.map(
      (
        {
          _id,
          implementer_id,
          priority,
          state_id,
          mata_tags,
          create_date,
          title,
        },
        i
      ) => (
        <tr key={(i + Math.random()).toString()}>
          <th scope="row" key={(i + Math.random()).toString()}>
            {_id}
          </th>
          <td className="btn" key={(i + Math.random()).toString()}>
            <a
              href="/infotask"
              onClick={() => localStorage.setItem("taskId", _id)}
            >
              {title}
            </a>
          </td>
          <td key={(i + Math.random()).toString()}>
            {mata_tags.map((item) => `${item}, `)}
          </td>
          <td key={(i + Math.random()).toString()}>
            {implementer_id !== null
              ? implementer_id.forEach((i) => `${i}, `)
              : null}
          </td>
          <td key={(i + Math.random()).toString()}>{create_date}</td>
          <td key={(i + Math.random()).toString()}>{priority}</td>
          <td key={(i + Math.random()).toString()}>{state_id}</td>
        </tr>
      )
    );
  }

  
}

function MyTask() {
  return (
    <>
      <div className="card bg-primary text-light px-5 py-2 mt-5 d-none d-md-flex flex-row align-items-center justify-content-between">
        <h1>Мои Задачи</h1>
        <i className="bi bi-chevron-right"></i>
      </div>
      <div className="card d-none d-md-flex">
        <table className="table bg-light text-start">
          <thead className="fw-bolder text-light">
            <tr className=" bg-primary rounded-3">
              <th scope="col">ID</th>
              <th scope="col">Тема</th>
              <th scope="col">Наименование</th>
              <th scope="col">Исполнитель</th>
              <th scope="col">Дата подачи заявки</th>
              <th scope="col">Приоритет</th>
              <th scope="col">Статус</th>
            </tr>
          </thead>
          <tbody>
            <UserTask />
          </tbody>
        </table>
      </div>
    </>
  );
}

function MyWorkTask() {
  return (
    <>
      <div className="card bg-primary text-light px-5 py-2 mt-5 d-none d-md-flex flex-row align-items-center justify-content-between">
        <h1>Мои Задачи</h1>
        <i className="bi bi-chevron-right"></i>
      </div>
      <div className="card d-none d-md-flex">
        <table className="table bg-light text-start">
          <thead className="fw-bolder text-light">
            <tr className=" bg-primary rounded-3">
              <th scope="col">ID</th>
              <th scope="col">Тема</th>
              <th scope="col">Наименование</th>
              <th scope="col">Исполнитель</th>
              <th scope="col">Дата подачи заявки</th>
              <th scope="col">Приоритет</th>
              <th scope="col">Статус</th>
            </tr>
          </thead>
          <tbody>
            <IAmImplemtnter />
          </tbody>
        </table>
      </div>
    </>
  );
}

function LabTabs() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Мои задачи" value="1" />
            <Tab label="Я выполняю" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1">
          {" "}
          <MyTask />{" "}
        </TabPanel>
        <TabPanel value="2">
          {" "}
          <MyWorkTask />{" "}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
export default LabTabs;
