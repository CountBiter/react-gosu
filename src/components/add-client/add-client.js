import React, { Component } from "react";

import AddClientForm from "./add-client-elem";

export default class AddClient extends Component {
  render() {
    return (
      <div>
        <div className="position-absolute col-12 row d-flex align-items-center">
          <div className="col-3">
            <img
              className="col-3"
              alt="GosuLogo"
              src="../assets/logoBlue.png"
            />
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
            <i className="bi bi-door-open-fill text-primary display-6"></i>
          </div>
        </div>
        <div className="height container-fluid d-flex flex-column align-items-center justify-content-center">
          <div className="col-11">
            <div className="btn bg-primary bg-opacity-50 col-3 py-4 px-3">
              <img className="col-3 mb-3" src="..\assets\image6.png" alt="" />
              <h4>Пригласить клиента</h4>
            </div>
          </div>
          <div className="card col-5 bg-primary bg-opacity-50 mt-5 px-5">
            <AddClientForm />
          </div>
        </div>
      </div>
    );
  }
}
