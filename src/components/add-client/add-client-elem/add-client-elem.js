import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  ADD_USER_FOR_ADMIN,
  GET_ALLORGANISATIONS,
  GET_ALL_ROLES,
  ADD_USER_ROLE,
} from "../../../apollo-client/apollo-request";

import MultiSelect from "react-multiple-select-dropdown-lite";

function SelectOptionOrg() {
  const { data, loading, error } = useQuery(GET_ALLORGANISATIONS);
  const [optionValue, setOptionValue] = useState("");

  if (loading) return <option>Loading...</option>;
  if (error) return <option>Error : {error.message}</option>;

  const { getAllOrganisations } = data;

  const allOrg = [];

  return getAllOrganisations.map((item) => (
    <option key={Math.random()} value={item._id}>
      {item.title}
    </option>
  ));
}

function SelectOptionUserParams() {
  const { data, loading, error } = useQuery(GET_ALL_ROLES);
  const [optionValue, setOptionValue] = useState([]);

  if (loading) return <option>Loading...</option>;
  if (error) return <option>Error : {error.message}</option>;

  return data.getAllRoles.map((item) => (
    <option key={Math.random()} value={item._id}>
      {item.title}
    </option>
  ));
}

function AddClientForm() {
  const [addUsers, { data, loading, error }] = useMutation(ADD_USER_FOR_ADMIN);
  const [addUserRoles] = useMutation(ADD_USER_ROLE);
  const [userName, setUserName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userOrg, setUserOrg] = useState("");

  if (loading) return <option>Loading...</option>;
  if (error) return <option>Error : {error.message}</option>;

  const validateEmail = (login) => {
    return String(login)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
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
        <input
          type="email"
          className="form-control"
          id="InputClientEmail"
          onChange={(e) => setUserEmail(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Укажите пароль клиента:</label>
        <input
          type="text"
          className="form-control"
          id="InputClientEmail"
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">
          <select
            className="form-select mb-3"
            id="exampleFormControlInput1"
            aria-label="select"
            onChange={(e) => {
              setUserRole(e.target.value);
            }}
            value={userRole}
          >
            {" "}
            <SelectOptionUserParams />
          </select>
        </label>
      </div>

      <div className="mb-3">
        <label className="form-label">Укажите организацию:</label>
        <select
          className="form-select mb-3"
          id="exampleFormControlInput1"
          aria-label="select"
          onChange={(e) => {
            setUserOrg(e.target.value);
          }}
          value={userOrg}
        >
          <SelectOptionOrg />
        </select>
      </div>

      <div className="form-floating">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          id="login"
          onClick={() => {
            let userId;
            addUsers({
              variables: {
                user: {
                  first_name: userName,
                  last_name: userLastName,
                  middle_name: userMiddleName,
                  full_name: `${userName} ${userMiddleName} ${userLastName}`,
                  post: null,
                  depaptament: null,
                  organisation_id: userOrg,
                  login: validateEmail(userEmail)[2],
                  hashed_password: userPassword,
                  telegram_chat_id: null,
                },
              },
            }).then((data) => {
              console.log(data.data)
              userId = data.data.addUsers._id;
            });
            addUserRoles({
              variables: {
                roleId: userRole,
                userId: userId,
              },
            });
          }}
        >
          ДОБАВИТЬ
        </button>
      </div>
    </form>
  );
}

export default AddClientForm;
