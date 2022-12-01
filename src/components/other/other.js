import React, { Component } from "react";

import { image3, imageLogo } from "../../image/img.js";

import AddTaskForOther from "./other-elem";

export default class Other extends Component {
  render() {
    return (
      <>
        <div>
          <div className="position-absolute d-flex align-items-center my-2 col-12">
          <div className="col-1"></div>
            <div className="col-2 col-md-3 col-lg-2">
              <img
                className="col-10 col-md-5"
                alt="GosuLogo"
                src={imageLogo}
              />
            </div>
            <div className="col my-2"></div>
            <div className="col-2 text-end d-flex align-items-center justify-content-evenly pe-5">
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
              <div className="d-inline-block me-2">
                <h5>ru</h5>
              </div>
            </div>
            <div className="col-1 text-start"> </div>
          </div>
          <div className="height container-fluid d-flex flex-column align-items-center justify-content-center mb-5 mb-md-0">
              <div className="btn bg-primary bg-opacity-50 col-9 col-md-3 py-3 py-md-4 px-md-3 mt-md-0 mt-5">
                <img className="col-2 mb-3" src={image3} alt="" />
                <h4 className="text4">Другое</h4>
              </div>
            <div className="card bg-primary bg-opacity-50 mt-2 mt-md-5 px-md-5">
              <AddTaskForOther />
            </div>
          </div>
        </div>
      </>
    );
  }
}
