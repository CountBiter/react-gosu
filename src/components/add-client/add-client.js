import React, { Component, useState } from "react";

import { GET_ALLORGANISATIONS } from "../../apollo-client/apollo-request";
import { useQuery } from "@apollo/client";
import MultiSelect from "react-multiple-select-dropdown-lite";

function SelectOption() {
  const { data, loading, error } = useQuery(GET_ALLORGANISATIONS);
  const [optionValue, setOptionValue] = useState("");

  const onChangeOption = (val) => {
    setOptionValue(val);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const { getAllOrganisations } = data;

  const allOrg = [];

  getAllOrganisations.forEach((item) => {
    allOrg.push({ value: item.title, label: item.title });
  });
  console.log(allOrg);
  return (
    <div className="mb-3">
      <MultiSelect
        onChange={(e) => {
          onChangeOption(e.target.value);
        }}
        options={allOrg}
      />
    </div>
  );
}

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
            <form className="p-5 text-start">
              <div className="mb-3">
                <label className="form-label">ФИО клиента:</label>
                <input
                  type="text"
                  className="form-control"
                  id="InputClientName"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Укажите e-mail клиента:</label>
                <input
                  type="email"
                  className="form-control"
                  id="InputClientEmail"
                />
              </div>
              <SelectOption />
              <div className="form-floating">
                <button
                  className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
                  id="login"
                >
                  ДОБАВИТЬ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
