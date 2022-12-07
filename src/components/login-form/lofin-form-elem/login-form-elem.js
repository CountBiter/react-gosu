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
  const [userName, setUserName] = useState("");
  const [userMiddleName, setUserMiddleName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  if (loading) return <option>Loading...</option>;
  if (error) return <option>Error : {error.message}</option>;

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

      <div className="form-floating">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          id="login"
          onClick={async () => {
            await addUsers({
              variables: {
                user: {
                  first_name: userName,
                  last_name: userLastName,
                  middle_name: userMiddleName,
                  full_name: `${userName} ${userMiddleName} ${userLastName}`,
                  post: null,
                  depaptament: null,
                  organisation_id: localStorage.getItem("ok"),
                  login: userEmail,
                  hashed_password: userPassword,
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
    <div className="height container-fluid d-flex flex-column align-items-center justify-content-center">
      <img className="col-2 col-xxl-1" src={imageLogo} alt="GosuLogo" />
      <div className="card col-lg-4 col-xxl-3 bg-primary bg-opacity-50 mt-4 justify">
        <div className="card-header d-flex justify-content-evenly">
          <h4>Қаз</h4>
          <h4>Рус</h4>
        </div>
        <div className="card-body px-4 mx-3">
          <div className="my-3 text-center">
            <h2 className="text2">Вход</h2>
          </div>
          <form className="mt-5" id="orglogin" onSubmit={formSubmit}>
            <input
              className="form-control mb-4"
              name="login"
              type="email"
              placeholder="sd@mail.ru"
            />
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
      </div>
    </div>
  );
}

function LoginTabs() {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Войти" value="1" />
            <Tab label="Зарегистрироватся" value="2" />
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
  );
}

export { LoginTabs };
