import { useQuery } from "@apollo/client";
import {
  GET_ALLTASKS,
  GET_ALL_STASUS,
  GET_ALL_TASKS_WITH_STATUS,
  GET_ORG,
  GET_USER,
} from "../../../apollo-client/apollo-request";
import Select from "react-select";
import { useState } from "react";

function AllTask({ page = 0 }) {
  const { loading, error, data } = useQuery(GET_ALLTASKS, {
    variables: {
      page: page,
      stateId: localStorage.getItem("statusId"),
    },
  });

  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td>Error : {error.message}</td>
      </tr>
    );
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

    if (data.getUser === null) {
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
  if (data.getTaskByState) {
    
    return data.getTaskByState
      .map(
        (
          {
            _id,
            implementer_id,
            priority,
            state_id,
            author_id,
            mata_tags,
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
            <td key={Math.random().toString()}>{create_date}</td>
            <td key={Math.random().toString()}>{priority}</td>
            <td key={Math.random().toString()}>{state_id}</td>
          </tr>
        )
      )
      .reverse();
  } else {
    return (
      <tr>
        <td>sdgfhjg</td>
      </tr>
    );
  }
}

function FilterTask() {
  const { loading, error, data } = useQuery(GET_ALL_STASUS);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error : {error.message}</div>;

  const allStatus = [];
  data.getAllState.forEach((item) => {
    allStatus.push({ label: item.title, value: item._id });
  });

  return (
    <Select
      name="colors"
      defaultValue={allStatus[0]}
      options={allStatus}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(e) => {
        localStorage.setItem("statusId", e.value);
      }}
      isSearchable={true}
    />
  );
}

export { AllTask, FilterTask };
