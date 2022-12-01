import { useQuery } from "@apollo/client";
import {
  GET_ALLTASKS,
  GET_ALL_STASUS,
  GET_ALL_TASKS_WITH_STATUS,
} from "../../../apollo-client/apollo-request";
import Select from "react-select";
import { useState } from "react";

function AllTask({ page = 0, statusId }) {
  const { loading, error, data } = useQuery(GET_ALLTASKS, {
    variables: { page: page },
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

  return data.getAllTasks.map(
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
      options={allStatus}
      className="basic-multi-select"
      classNamePrefix="select"
      onChange={(e) => {
        localStorage.setItem("statusId", e.value)
      }}
      isSearchable={true}
    />
  );
}

export { AllTask, FilterTask };
