import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { useState } from "react";
import { ADD_USER_FOR_ADMIN } from "../../../apollo-client/apollo-request";
import { useMutation } from "@apollo/client";
import { PostLoginForm } from "../post-login-form";
import { imageLogo } from "../../../image/img";

function NewUser() {
  const [addUsers, { loading, error }] = useMutation(ADD_USER_FOR_ADMIN);
  // const [userName, setUserName] = useState("");
  // const [userMiddleName, setUserMiddleName] = useState("");
  // const [userLastName, setUserLastName] = useState("");
  // const [userEmail, setUserEmail] = useState("");
  // const [userPassword, setUserPassword] = useState("");
  const profile = {
    userName: "",
    userMiddleName: "",
    userLastName: "",
    userEmail: "",
    userPassword: "",
  };

  const profileKeys = Object.keys(profile);

  const updateElementValue = (e) => {
    for (let key of profileKeys) {
      if (key === e.target.name) {
        profile[key]= e.target.value
      }
    }
    console.log(profile)
  };

  if (loading) return <option>Loading...</option>;
  if (error) return <option>Error : {error.message}</option>;

  return (
    <div className="card-body">
      <form className="text-start">
        <div className="mb-3">
          <label className="form-label">Укажите e-mail клиента:</label>
          <input
            type="email"
            className="form-control"
            name="userEmail"
            id="InputClientEmail"
            onChange={updateElementValue}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Укажите пароль клиента:</label>
          <input
            type="text"
            className="form-control"
            name="userPassword"
            id="InputClientEmail"
            onChange={updateElementValue}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Фамилия клиента:</label>
          <input
            type="text"
            className="form-control"
            name="userMiddleName"
            id="InputClientName"
            onChange={updateElementValue}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Имя клиента:</label>
          <input
            type="text"
            className="form-control"
            name="userName"
            id="InputClientName"
            onChange={updateElementValue}
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Отчество клиента:</label>
          <input
            type="text"
            className="form-control"
            name="userLastName"
            id="InputClientName"
            onChange={updateElementValue}
          />
        </div>

        <div className="form-floating">
          <button
            className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
            id="login"
            onClick={async () => {
              await addUsers({
                variables: {
                  user: {
                    first_name: profile.userName,
                    last_name: profile.userLastName,
                    middle_name: profile.userMiddleName,
                    full_name: `${profile.userName} ${profile.userMiddleName} ${profile.userLastName}`,
                    post: null,
                    depaptament: null,
                    organisation_id: localStorage.getItem("ok"),
                    login: profile.userEmail,
                    hashed_password: profile.userPassword,
                    telegram_chat_id: null,
                  },
                },
              });
            document.location = "/homepage";
            }}
          >
            ДОБАВИТЬ
          </button>
        </div>
      </form>
    </div>
  );
}

function Login() {
  const formSubmit = async (e) => {
    e.preventDefault();

    const { login, password } = document.forms[0];

    const userToken = await PostLoginForm({
      login: login.value,
      password: password.value,
    });

    localStorage.setItem("token", JSON.stringify(userToken));
    localStorage.setItem("login", login.value);
    if (userToken.token) {
      // eslint-disable-next-line no-restricted-globals
      document.location = "/homepage";
    }
  };
  return (
    <div className="card-body">
    <form className="mt-4" id="orglogin" onSubmit={formSubmit}>
      <label className="form-label">Почта:</label>
      <input
        className="form-control mb-4"
        name="login"
        type="email"
        placeholder="sd@mail.ru"
      />
      <label className="form-label">Пароль:</label>
      <input
        className="form-control mb-4"
        name="password"
        type="password"
        placeholder="Пароль"
      />
      <div className="form-floating mb-5">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          type="submit"
        >
          ВОЙТИ
        </button>
      </div>
    </form>
    </div>
  );
}

function LoginTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
  <div className="d-flex flex-column align-items-center">
    <div className="position-absolute end-0 pt-4 pe-5">
      <select class="form-select bg-transparent border-primary">
        <option selected>ru</option>
        <option value="1">kaz</option>
        <option value="2">en</option>
      </select>
    </div>
    <img className="col-2 col-xxl-1 mt-5" src={imageLogo} alt="GosuLogo" />
    <div className="card col-lg-4 col-xxl-4 bg-primary bg-opacity-50 mt-4">
      <Box>
        <TabContext value={value}>
          <Box className="card-header d-flex justify-content-evenly position-relative">
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="Войти" value="1" />
              <Tab label="Зарегистрироваться" value="2" />
              
            </TabList>
            
          </Box>
          <TabPanel value="1">
            {" "}
            <Login />{" "}
          </TabPanel>
          <TabPanel value="2">
            {" "}
            <NewUser />{" "}
          </TabPanel>
        </TabContext>
      </Box>
    </div>
  </div>
    
  );
}

export { LoginTabs };
