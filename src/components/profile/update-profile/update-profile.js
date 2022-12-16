import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import { useMutation } from "@apollo/client";
import { useState } from "react";
import {
  ADD_CONTACT,
  UPDATE_USER,
} from "../../../apollo-client/apollo-request";

function AddUserContact() {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const [addContacts, { loading, error }] = useMutation(ADD_CONTACT);
  const [UserContactType, setUserContactType] = useState("");
  const [UserContactValue, setUserContactValue] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <form className="pt-4">
      <div className="">
        <label className="form-label">
          <h5 className="text2">Телефон:</h5>{" "}
        </label>
        <input
          className="form-control mb-4 border-dark"
          type="phone"
          placeholder=""
          onChange={(e) => setUserContactValue(e.target.value)}
        />
        <label className="form-label">
          <h5 className="text2">Тип:</h5>{" "}
        </label>
        <input
          className="form-control mb-4 border-dark"
          type="phone"
          placeholder=""
          onChange={(e) => setUserContactType(e.target.value)}
        />
      </div>
      <div className="form-floating mb-3 mt-lg-5">
        <button
          className="btn btn-primary col-12 text-uppercase fw-bolder py-2"
          id="login"
          onClick={(e) => {
            e.preventDefault();
            addContacts({
              variables: {
                typeCi: {
                  title: UserContactType,
                  icon: null,
                },
                contact: {
                  value: UserContactValue,
                  user_id: userToken.token,
                },
              },
            });
          }}
        >
          Добавить
        </button>
      </div>
    </form>
  );
}

function UpdateUser() {
  const userToken = JSON.parse(localStorage.getItem("token"));
  const [updateUser, { loading, error }] = useMutation(UPDATE_USER);
  const [userName, setUserName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPassword, setUserPassword] = useState("");

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  return (
    <form className="pt-4 px-0">
      <div className="">
        <label className="form-label">
          <h5 className="">Фамилия:</h5>{" "}
        </label>
        <input
          className="form-control mb-4 border-dark"
          type="text"
          placeholder=""
          id="Input1"
          aria-label=".form-control-lg example"
          onChange={(e) => setUserMiddleName(e.target.value)}
        />
      </div>
      <div className="">
        <label className="form-label">
          <h5 className="">Имя:</h5>{" "}
        </label>
        <input
          className="form-control mb-4 border-dark"
          type="text"
          placeholder=""
          id="Input1"
          aria-label=".form-control-lg example"
          onChange={(e) => setUserName(e.target.value)}
        />
      </div>
      <div className="">
        <label className="form-label">
          <h5 className="">Отчество:</h5>{" "}
        </label>
        <input
          className="form-control mb-4 border-dark"
          type="text"
          placeholder=""
          id="Input1"
          aria-label=".form-control-lg example"
          onChange={(e) => setUserLastName(e.target.value)}
        />
      </div>

      <div className="">
        <label className="form-label">
          <h5 className="">Пароль:</h5>{" "}
        </label>
        <input
          className="form-control mb-4 border-dark"
          type="text"
          placeholder=""
          id="Input2"
          aria-label=".form-control-lg example"
          onChange={(e) => setUserPassword(e.target.value)}
        />
      </div>
      <div className="form-floating mb-3 mt-lg-4">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          id="login"
          onClick={(e) => {
            e.preventDefault();
            updateUser({
              variables: {
                updateData: {
                  first_name: userName,
                  last_name: userLastName,
                  middle_name: userMiddleName,
                  full_name: `${userName} ${userMiddleName} ${userLastName}`,
                  hashed_password: userPassword,
                },
                token: userToken.token,
              },
            });
          }}
        >
          СОХРАНИТЬ
        </button>
      </div>
      <div className="form-floating text-center justify-content-between mb-0">
        <button className="btn">Забыли пароль?</button>
      </div>
    </form>
  );
}

function Update() {
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box className="d-flex justify-content-center card-title bg-primary bg-opacity-50 rounded-top text-light m-0 py-2">
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Профиль" value="1" />
            <Tab label="Контакты" value="2" />
          </TabList>
        </Box>
        <TabPanel value="1" className="card-body rounded-bottom px-md-5 py-0">
          {" "}
          <UpdateUser />{" "}
        </TabPanel>
        <TabPanel value="2" className="card-body rounded-bottom px-md-5 py-0">
          {" "}
          <AddUserContact />{" "}
        </TabPanel>
      </TabContext>
    </Box>
  );
}
export default Update;
