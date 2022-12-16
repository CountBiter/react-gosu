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
  GET_USER,
  GET_STATE,
  GET_ORG,
} from "../../../apollo-client/apollo-request";
import { formatDate } from "../../format-date";

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

    function GetUserName({ id }) {
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

function UserTask() {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const { data, loading, error } = useQuery(GET_ALL_USER_TASKS, {
    variables: { token: userToken.token },
  });

  if (loading) return <tr>Loading...</tr>;
  if (error) return <tr>Error : {error.message}</tr>;

  const { getAllUserTasks } = data;

  if (getAllUserTasks === null) {
    <th>У вас нет задач</th>;
  } else {
    function GetUserName({ id }) {
      const { data, loading, error } = useQuery(GET_USER, {
        variables: { userId: id },
      });

      if (loading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>{error.message} </p>;
      }

      if (data.getUser === null) {
        return <span>не назначен</span>;
      } else {
        return data.getUser.map(({ first_name, middle_name }) => (
          <span>
            {first_name} {middle_name}
            {", "}
          </span>
        ));
      }
    }

    return getAllUserTasks.map(
      (
        {
          _id,
          implementer_id,
          priority,
          state_id,
          mata_tags,
          author_id,
          create_date,
          title,
        },
        i
      ) => (
        <tr key={Math.random().toString()}>
          <th scope="row" key={Math.random().toString()}>
            {_id}
          </th>
          <td className="btn" key={Math.random().toString()}>
            <a
              href="/infotask"
              onClick={() => localStorage.setItem("taskId", _id)}
            >
              {title}
            </a>
          </td>
          <td key={Math.random().toString()}>
            {mata_tags.map((item) => `${item}, `)}
          </td>
          <td key={Math.random().toString()}>
            <GetUserName id={implementer_id} />
          </td>
          <td key={Math.random().toString()}>
            <GetOrgName id={author_id} />
          </td>
          <td key={Math.random().toString()}>
            <GetUserName id={author_id} />
          </td>
          <td key={Math.random().toString()}>{formatDate(create_date)}</td>
          <td key={Math.random().toString()}>{priority}</td>
          <td key={Math.random().toString()}>
            <GetStateName id={state_id} />
          </td>
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
          author_id,
          create_date,
          title,
        },
        i
      ) => (
        <tr key={Math.random().toString()}>
          <th scope="row" key={Math.random().toString()}>
            {_id}
          </th>
          <td className="btn" key={Math.random().toString()}>
            <a
              href="/infotask"
              onClick={() => localStorage.setItem("taskId", _id)}
            >
              {title}
            </a>
          </td>
          <td key={Math.random().toString()}>
            {mata_tags.map((item) => `${item}, `)}
          </td>
          <td key={Math.random().toString()}>
            <GetUserName id={implementer_id} />
          </td>
          <td key={Math.random().toString()}>
            <GetOrgName id={author_id} />
          </td>
          <td key={Math.random().toString()}>
            <GetUserName id={author_id} />
          </td>
          <td key={Math.random().toString()}>{formatDate(create_date)}</td>
          <td key={Math.random().toString()}>{priority}</td>
          <td key={Math.random().toString()}>
            <GetStateName id={state_id} />
          </td>
        </tr>
      )
    );
  }
}

function MyTask() {
  return (
    <>
      <div className="card bg-primary text-light px-4 py-2 mt-4 d-none d-md-flex flex-row align-items-center justify-content-between">
        <h3>Мои Задачи</h3>
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
              <th scope="col">Организация</th>
              <th scope="col">Заказчик</th>
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
      <div className="card bg-primary text-light px-4 py-2 mt-5 d-none d-md-flex flex-row align-items-center justify-content-between">
        <h3>Мои Задачи в работе</h3>
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
              <th scope="col">Организация</th>
              <th scope="col">Заказчик</th>
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
    <Box className="mt-4">
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Мои задачи" value="1" />
            <Tab label="Я выполняю" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" className="p-0">
          {" "}
          <MyTask />{" "}
        </TabPanel>
        <TabPanel value="2" className="p-0">
          {" "}
          <MyWorkTask />{" "}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
export default LabTabs;
