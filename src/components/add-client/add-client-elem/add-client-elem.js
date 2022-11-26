import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  ADD_USER_FOR_ADMIN,
  GET_ALLORGANISATIONS,
} from "../../../apollo-client/apollo-request";

import MultiSelect from "react-multiple-select-dropdown-lite";

function SelectOptionOrg() {
  const { data, loading, error } = useQuery(GET_ALLORGANISATIONS);
  const [optionValue, setOptionValue] = useState("");

  const onChangeOption = (val) => {
    setOptionValue(val);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { getAllOrganisations } = data;

  const allOrg = [];

  getAllOrganisations.forEach((item) => {
    allOrg.push({ value: item.title, label: item.title });
  });
  return (
    <MultiSelect
      className="form-select mb-3"
      onChange={() => {
        onChangeOption();
      }}
      options={allOrg}
    />
  );
}

function SelectOptionUserParams() {
  const [optionValue, setOptionValue] = useState("");
  const userParams = [
    { value: "title", label: "title" },
    { value: "description", label: "description" },
    { value: "implementer", label: "implementer" },
    { value: "state", label: "state" },
    { value: "priority", label: "priority" },
    { value: "files", label: "files" },
    { value: "comments", label: "comments" },
    { value: "admin", label: "admin" },
  ];

  const onChangeOption = (val) => {
    setOptionValue(val);
  };

  return userParams.map(
    (item) => (
      <option key={Math.random()}>
        {item.value}
      </option>
    ), optionValue
    // <MultiSelect
    //   className="form-select mb-3"
    //   onChange={() => {
    //     onChangeOption();
    //     console.log(optionValue);
    //   }}
    //   options={userParams}

    // />
  );
}

function AddClientForm() {
  const [addUsers, { loading, error }] = useMutation(ADD_USER_FOR_ADMIN);
  const [userName, setUserName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userOrg, setUserOrg] = useState("");
  return (
    <form className="p-5 text-start">
      <div className="mb-3">
        <label className="form-label">Фамилия клиента:</label>
        <input
          type="text"
          className="form-control"
          id="InputClientName"
          onChange={(e) => setUserMiddleName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Имя клиента:</label>
        <input
          type="text"
          className="form-control"
          id="InputClientName"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Отчество клиента:</label>
        <input
          type="text"
          className="form-control"
          id="InputClientName"
          onChange={(e) => setUserLastName(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Укажите e-mail клиента:</label>
        <input type="email" className="form-control" id="InputClientEmail" />
      </div>
      <div className="mb-3">
        <label className="form-label">Укажите приоритет:</label>
        <input className="form-control" id="InputClientEmail" />
        <select className="form-select mb-3" id="exampleFormControlSelect">
          <SelectOptionUserParams />
        </select>
      </div>
      {console.log(<SelectOptionUserParams />)}
      <SelectOptionOrg />
      <div className="form-floating">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          id="login"
        >
          ДОБАВИТЬ
        </button>
      </div>
    </form>
  );
}

export default AddClientForm;
