import React, { Component } from "react";

import { imageLogo } from "../../image/img";
import LoginTabs from "./lofin-form-elem";

import { PostOrgLoginForm, PostLoginForm } from "./post-login-form";

export default class LoginForm extends Component {
  async orgFormSubmit(e) {
    e.preventDefault();
    const { codeOrg, passOrg } = document.forms[0];

    const res = await PostOrgLoginForm({
      codeOrg: codeOrg.value,
      passOrg: passOrg.value,
    });
    console.log(res);

    if (res._id) {
      localStorage.setItem("ok", res._id);
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    }
  }
  render() {
    if (!localStorage.getItem("ok")) {
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
              <form
                className="mt-5"
                id="orglogin"
                onSubmit={this.orgFormSubmit}
              >
                <input
                  className="form-control mb-4"
                  name="codeOrg"
                  type="text"
                  placeholder="код организации"
                />
                <input
                  className="form-control mb-4"
                  name="passOrg"
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
    } else {
      return <LoginTabs />;
    }
  }
}
