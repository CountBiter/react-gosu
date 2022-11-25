import { useMutation } from "@apollo/client";
import React, { Component, useState } from "react";
import { ADD_ORGANISATION } from "../../apollo-client/apollo-request";

function AddOrganisation() {
  const [addOrganisation, { loading, error }] = useMutation(ADD_ORGANISATION);
  const [shopName, setShopNameState] = useState("");
  const [shopFullName, setShopFullName] = useState("");
  const [idfificationNumber, setIdfificationNumber] = useState("");
  const [kppNumber, setKppNumber] = useState("");
  const [okedNumber, setOkedNumber] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <form className="p-5 text-start">
      <div className="mb-3">
        <label className="form-label">Название компании</label>
        <input type="text" className="form-control" id="InputClientName" onChange={e => setShopNameState(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label className="form-label">Полное название компании</label>
        <input type="email" className="form-control" id="InputClientEmail" onChange={e => setShopFullName(e.target.value)}/>
      </div>
      <div className="mb-3 position-relative d-flex">
        <label className="btn p-0 m-0" id="addfile-btn">
          <input id="addfile" type="file" hidden="hidden" />
          <i className="bi bi-paperclip h4 d-inline-block"></i>
          <h5
            className="m-0 text-secondary my-auto d-inline-block"
            id="addfile-text"
          >
            Добавить иконку компании
          </h5>
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">Индификафионный номер</label>
        <input type="email" className="form-control" id="InputClientEmail" onChange={e => setIdfificationNumber(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label className="form-label">Кпп номер</label>
        <input type="email" className="form-control" id="InputClientEmail" onChange={e => setKppNumber(e.target.value)}/>
      </div>
      <div className="mb-3">
        <label className="form-label">Окед номер</label>
        <input type="email" className="form-control" id="InputClientEmail" onChange={e => setOkedNumber(e.target.value)}/>
      </div>
      <div className="mb-3 position-relative d-flex">
        <label className="btn p-0 m-0" id="addfile-btn">
          <input id="addfile" type="file" hidden="hidden" />
          <i className="bi bi-paperclip h4 d-inline-block"></i>
          <h5
            className="m-0 text-secondary my-auto d-inline-block"
            id="addfile-text"
          >
            Файл
          </h5>
        </label>
      </div>
      <div className="form-floating">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          id="login"
        >
          ДОБАВИТЬ
        </button>
      </div>
    </form>
  );
}

export default class Organisation extends Component {
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
            <AddOrganisation />
          </div>
        </div>
      </div>
    );
  }
}
