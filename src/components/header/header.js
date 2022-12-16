import React, { Component } from "react";
import { imageLogo } from "../../image/img";

import "./header.css";

export default class Header extends Component {
  render() {
    return (
      <>
        <div className="col-2">
          <img className="col-6" alt="GosuLogo" src={imageLogo}/>
        </div>
        <div className="col-md-4 col-lg-3 d-none d-md-flex">
          <a href="/homepage">
            <button className="btn btn-outline-primary px-5 py-2">
                <h5 className="my-1">
                  Создать заявку
                  <i className="bi bi-plus-square ps-2"></i>
                </h5>
            </button>
          </a>
        </div>
        <div className="col d-none d-md-flex"></div>
        <div className="col-2 d-md-none">
          <i className="bi bi-plus-square text-light h1"></i>
        </div>
        <div className="col-md-3 col-lg-4 col-xl-3 d-none d-md-flex px-3">
          <div className="input-group d-none">
            <input
            className="form-control my-2 bg-transparent text-light"
            type="text"
            placeholder="Поиск..."
            />
            <span className="input-group-text my-2 bg-transparent">
            <i className="bi bi-search text-primary"></i>
            </span>
          </div>
        </div>
      </>
    );
  }
}
