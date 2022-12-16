import React, { Component } from "react";
import LabTabs from "./profile-elem.js";
import { ForProfile } from "../if-not-user/index.js";
import Update from "./update-profile";
import Header from "../header";
import { image1 } from "../../image/img.js";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <div className="d-flex align-items-center justify-content-center pt-2 bg-light">
          <div className="col-11 d-flex align-items-center">
            <Header />
            <div className="col-1 text-start">
              <a href="/"
                onClick={() => {
                  localStorage.clear();
                }}
              >
                <i className="bi bi-door-open-fill text-primary display-6"></i>
              </a>
            </div>
            <div className="col-1">
              <select class="form-select bg-transparent border-primary py-2">
                <option selected>ru</option>
                <option value="1">kaz</option>
                <option value="2">en</option>
              </select>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center my-5">
          <div className="col-11 row">
            <div className="col-7 ps-0">
              <div className="card border-primary p-4">
                <div className="row">
                  <div className="col-4 card">
                    <img src={image1}></img>
                  </div>
                  <div className="col-8 ps-5 d-flex flex-column justify-content-between">
                    <h1 className="text-primary fw-bold">Фамилия Имя</h1>
                    <h3 className="">Роль: Админ</h3>
                    <ForProfile />
                  </div>
                  <div className="card border-primary my-5 px-0">
                    <div className="card-title text-light d-flex bg-primary bg-opacity-50 rounded-top py-2 px-4">
                      <h3 className="col-5">Почта</h3>
                      <h3 className="col-7">{localStorage.getItem("login")}</h3>
                    </div>
                    <div className="row px-4 py-2">
                      <h3 className="border-bottom pb-2">Контакты:</h3>
                      <div className="col-5 border-end">
                        <h5 className="text-secondary">тип</h5>
                        <h4>Рабочий</h4>
                        <h4>What'sApp</h4>

                      </div>
                      <div className="col-7">
                        <h5 className="text-secondary">телефон</h5>
                        <h4>+7 (777) 777-77-77</h4>
                        <h4>+7 (777) 777-77-77</h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="card col-5 p-0">
              <div className="">
                <Update />
              </div>
            </div>
            <LabTabs />
          </div>
        </div>
      </div>
    );
  }
}
