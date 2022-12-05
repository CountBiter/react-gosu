import React, { Component } from "react";

import { ForTaskPage } from "../if-not-user";
import { AllTask } from "./task-elem";
import { FilterTask } from "./task-elem";

import Header from "../header";

export default class Task extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 0,
    };
  }

  render() {
    return (
      <>
        <div>
          <div id="height"></div>
          <div className="container-fluid position-absolute d-flex align-items-center my-2">
            <Header />
            <div className="col-1 text-start">
              <a href="/profile">
                <i className="bi bi-person-fill text-primary display-6"></i>
              </a>
            </div>
          </div>
          <div className="py-5"></div>
          <FilterTask />
          <div className=" container-fluid d-flex flex-column align-items-center justify-content-center">
            <div className="col-11">
              <ForTaskPage />
              <div className="card">
                <table className="table bg-light text-start">
                  <thead className="fw-bolder text-light">
                    <tr className=" bg-primary rounded-3">
                      <th scope="col">ID</th>
                      <th scope="col">Тема</th>
                      <th scope="col">Наименование</th>
                      <th scope="col">Исполнитель</th>
                      <th scope="col">Организация</th>
                      <th scope="col">Заказчик</th>
                      <th scope="col">Дата подачи заявки</th>
                      <th scope="col">Приоритет</th>
                      <th scope="col">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    <AllTask page={this.state.page} />
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <div className="d-flex justify-content-around col-5">
                  <div>
                    <button
                      className="btn bg-light rounded rounded-circle"
                      onClick={() =>
                        this.setState({
                          page: this.state.page - 1,
                        })
                      }
                    >
                      <h3>Prev</h3>
                    </button>
                    <button
                      className="btn bg-light rounded rounded-circle"
                      onClick={() =>
                        this.setState({
                          page: this.state.page + 1,
                        })
                      }
                    >
                      <h3>Next</h3>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
