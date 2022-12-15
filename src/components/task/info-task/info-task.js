import React, { Component } from "react";
import Header from "../../header";
import { ForInfoTask } from "../../if-not-user";

import Task from "./info-task-elem";

export default class InfoTask extends Component {
  render() {
    return (
      <div>
        {/* <div id="height" className="position-fixed"></div> */}
        <div className="d-flex justify-content-center pt-2">
          <div className="col-11 d-flex align-items-center">
            <Header />
            <div className="col-1 text-center">
              <a href="/profile">
                <i className="bi bi-person-fill text-primary display-6"></i>
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
        <Task />
        <div className="py-5">
          {" "}
          <ForInfoTask />
        </div>
      </div>
    );
  }
}
