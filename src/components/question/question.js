import React, { Component } from "react";

import { image2, imageLogo } from "../../image/img.js";


import AddTaskForQuestion from "./question-elem/question-elem.js";


export default class Question extends Component {
  render() {
    return (
      <div>
        <div className="d-flex justify-content-center pt-2">
          <div className="col-11 d-flex align-items-center">
            <div className="col-2">
              <img className="col-6" alt="GosuLogo" src={imageLogo} />
            </div>
            <div className="col"></div>
            <div className="col-1 text-center">
              <a href="/profile">
                <i className="bi bi-person-fill text-primary display-6"></i>
              </a>
            </div>
            <div className="col-1">
              <select class="form-select bg-transparent border-primary ">
                <option selected>ru</option>
                <option value="1">kaz</option>
                <option value="2">en</option>
              </select>
            </div>
          </div>
        </div>
        <div className="d-flex flex-column align-items-center justify-content-center mb-5 mb-md-0">
          <div className="btn bg-primary bg-opacity-50 col-9 col-md-3 py-3 py-md-4 mt-5 mt-md-0">
            <img className="col-2 mb-3" src={image2} alt="" />
            <h5 className="text5">Вопрос по 1С</h5>
          </div>
          <div className="card bg-primary bg-opacity-50 mt-2 mt-md-5 px-md-5">
            <AddTaskForQuestion />
          </div>
        </div>
      </div>
    );
  }
}
