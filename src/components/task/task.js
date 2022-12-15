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
      stateId: "",
    };
    this.onChangeFilter = this.onChangeFilter.bind(this);
  }
  onChangeFilter() {
    if (this.state.stateId === localStorage.getItem("statusId")) {
      return <AllTask page={this.state.page} statusId={this.state.stateId} />;
    } else {
      this.setState({
        stateId: localStorage.getItem("statusId"),
      });
      return <AllTask page={this.state.page} statusId={this.state.stateId} />;
    }
  }

  render() {
    return (
      <>
        <div>
          {/* <div id="height"></div> */}
          <div className="d-flex justify-content-center pt-2 bg-light">
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

          <div className="py-4"></div>
          <div className="d-flex flex-column align-items-center">
            <div className="col-11">
              <div className="mb-3">
                <select
                  className="form-select mb-3"
                  id="exampleFormControlSelect"
                  defaultValue={(e) => e.target.value}
                  onChange={(e) => {
                    console.log(e.target.value)
                    this.setState({
                      stateId: e.target.value
                    })
                  }}
                >
                  <FilterTask />
                </select>
              </div>
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
                    <AllTask page={this.state.page} statusId={this.state.stateId} />
                  </tbody>
                </table>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <div className="d-flex justify-content-around col-5">
                  <div>
                    <button
                      className="btn bg-light rounded rounded-circle"
                      onClick={() => {
                        this.setState({
                          page: this.state.page - 1,
                        });
                      }}
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
