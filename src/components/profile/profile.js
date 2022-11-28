import React, { Component } from "react";
import LabTabs from "./profile-elem.js";
import Header from "../header";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <div id="height" className="position-fixed"></div>
        <div className="position-absolute d-flex align-items-center my-2">
          <Header />
          <div className="col-1 text-start"></div>
        </div>

        <div className="py-5"></div>
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center pb-5">
          <div className="col-11">
            <div className="mb-3 d-flex">
              <div className="col-6 col-md-4 bg-light rounded d-flex align-items-center px-md-2 py-2 me-md-5 me-2">
                <h1 className="text-primary text1 ms-1">125 &ensp;</h1>
                <h3 className="text3">закрытых заявок</h3>
              </div>
              <div className="col-5 col-md-4 bg-light rounded d-flex align-items-center px-md-2 py-2">
                <h1 className="text-primary text1 ms-1">84 &ensp;</h1>
                <h3 className="text3">заявок в работе</h3>
              </div>
            </div>
            <div className="card text-start">
              <div className="card-title bg-primary rounded-top px-3 py-2 py-md-4 px-md-5">
                <h2 className="text-light text2">9k2dil16@gmail.com</h2>{" "}
              </div>
              <div className="card-body rounded-bottom px-md-5">
                <form className="row d-flex justify-content-evenly mt-md-4">
                  <div className="pe-lg-5 col-md-6">
                    <label className="form-label">
                      <h4 className="text2">Фамилия:</h4>{" "}
                    </label>
                    <input
                      className="form-control mb-4 border-dark"
                      type="text"
                      placeholder=""
                      id="Input1"
                      aria-label=".form-control-lg example"
                    />
                  </div>
                  <div className="pe-lg-5 col-md-6">
                    <label className="form-label">
                      <h4 className="text2">Имя:</h4>{" "}
                    </label>
                    <input
                      className="form-control mb-4 border-dark"
                      type="text"
                      placeholder=""
                      id="Input1"
                      aria-label=".form-control-lg example"
                    />
                  </div>
                  <div className="pe-lg-5 col-md-6">
                    <label className="form-label">
                      <h4 className="text2">Отчество:</h4>{" "}
                    </label>
                    <input
                      className="form-control mb-4 border-dark"
                      type="text"
                      placeholder=""
                      id="Input1"
                      aria-label=".form-control-lg example"
                    />
                  </div>
                  <div className="ps-lg-5 col-md-6">
                    <label className="form-label">
                      <h4 className="text2">Название компании:</h4>{" "}
                    </label>
                    <input
                      className="form-control mb-4 border-dark"
                      type="text"
                      placeholder=""
                      id="Input3"
                      aria-label=".form-control-lg example"
                    />
                  </div>
                  <div className="pe-lg-5 col-md-6">
                    <label className="form-label">
                      <h4 className="text2">Телефон:</h4>{" "}
                    </label>
                    <input
                      className="form-control mb-4 border-dark"
                      type="phone"
                      placeholder=""
                    />
                  </div>
                  <div className="ps-lg-5 col-md-6">
                    <label className="form-label">
                      <h4 className="text2">Пароль:</h4>{" "}
                    </label>
                    <input
                      className="form-control mb-4 border-dark"
                      type="text"
                      placeholder=""
                      id="Input2"
                      aria-label=".form-control-lg example"
                    />
                  </div>
                  <div className="form-floating mb-3 mt-lg-4">
                    <button
                      className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
                      id="login"
                    >
                      СОХРАНИТЬ
                    </button>
                  </div>
                  <div className="form-floating text-center justify-content-between mb-0">
                    <button>Забыли пароль?</button>
                  </div>
                </form>
              </div>
            </div>
            <LabTabs />
          </div>
        </div>
      </div>
    );
  }
}
