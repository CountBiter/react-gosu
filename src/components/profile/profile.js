import React, { Component } from "react";
import LabTabs from "./profile-elem.js";
import { ForProfile } from "../if-not-user/index.js";
import Update from "./update-profile";
import Header from "../header";

export default class Profile extends Component {
  render() {
    return (
      <div>
        <div id="height"></div>
        <div className="container-fluid position-absolute d-flex align-items-center my-2">
          <Header />
          <div className="col-1 text-start">
            <a
              href="/"
            onClick={() => {
                localStorage.clear();
              }}
            >
              <i className="bi bi-door-open-fill text-primary display-6"></i>
            </a>
          </div>
        </div>

        <div className="py-5"></div>
        <div className="container-fluid d-flex flex-column align-items-center justify-content-center pb-5">
          <div className="col-11">
            <ForProfile />
            <div className="card text-start">
              <div className="card-title bg-primary rounded-top px-3 py-2 py-md-4 px-md-5">
                <h2 className="text-light text2">
                  {localStorage.getItem("login")}
                </h2>{" "}
              </div>
              <div className="card-body rounded-bottom px-md-5">
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
