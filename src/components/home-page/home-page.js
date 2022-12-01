import React, { Component } from "react";
import { imageLogo } from "../../image/img";

import {ForHomePage} from "../if-not-user";


export default class HomePage extends Component {
  render() {
    return (
      <>
        <div className="about">
          <div className="position-absolute d-flex text-end col-12 pt-3">
            <div className="col"></div>
             <div className="col-2 text-center">
              <a href="/profile">
                <i className="bi bi-person-fill text-primary display-6"></i>
              </a>
            </div>
          </div>
          <div className="height container-fluid d-flex flex-column align-items-center justify-content-center">
            <div className="home text-center col-lg-7">
              <img className="col-2 col-xxl-2" alt="GosuLogo" src={imageLogo} />
            </div>
            <div className="col-2 m-3 d-flex justify-content-evenly fs-4">
              <h4 className="text4">Қаз</h4>
              <h4 className="text4">Рус</h4>
            </div>
            <div>
              <h4 className="text4">Выберите интересующий вас раздел: </h4>
            </div>
            <ForHomePage />
          </div>
        </div>
      </>
    );
  }
}
