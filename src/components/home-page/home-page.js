import React, { Component } from "react";
import { imageLogo } from "../../image/img";

import {ForHomePage} from "../if-not-user";


export default class HomePage extends Component {
  render() {
    return (
      <>
        <div className="about">
          <div className="d-flex justify-content-center pt-2">
            <div className="col-11 d-flex align-items-center">
              <div className="col-2"></div>
              <div className="col"></div>
              <div className="text-center col-2">
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
          <div className="text-center mt-5">
            <h4 className="text4">Выберите интересующий вас раздел: </h4>
            <ForHomePage />
          </div>
        </div>
      </>
    );
  }
}
