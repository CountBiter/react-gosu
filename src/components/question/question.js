import React, { Component } from "react";

import { image2, imageLogo } from "../../image/img.js";

import UploadFile from "../upload-file";

import AddTaskForQuestion from "./question-elem/question-elem.js";


export default class Question extends Component {
  render() {
    return (
      <div>
        <div className="position-absolute col-12 row d-flex align-items-center">
          <div className="col-2 col-md-3 col-lg-2">
            <img className="col-10 col-md-5" alt="GosuLogo" src={imageLogo} />
          </div>
          <div className="col"></div>
          <div className="col-2 text-end d-flex align-items-center justify-content-evenly px-5">
            <div className="d-inline-block">
              <h5>kaz</h5>
            </div>
            <div className="d-inline-block">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="flexSwitchCheckDefault"
                />
              </div>
            </div>
            <div className="d-inline-block">
              <h5>ru</h5>
            </div>
          </div>
          <div className="col-1 text-start">
            <i className="bi bi-person-fill text-primary display-6"></i>
          </div>
        </div>
        <div className="height container-fluid d-flex flex-column align-items-center justify-content-center mb-5 mb-md-0">
          <div className="col-11">
            <div className="btn bg-primary bg-opacity-50 col-9 col-md-3 py-3 py-md-4 px-md-3 mt-md-0 mt-5">
              <img className="col-2 mb-3" src={image2} alt="" />
              <h4 className="text4">Вопрос по 1С</h4>
              <input type="text" className="d-none" />
            </div>
          </div>
          <div className="card bg-primary bg-opacity-50 mt-2 mt-md-5 px-md-5">
            <AddTaskForQuestion />
          </div>
        </div>
      </div>
    );
  }
}
