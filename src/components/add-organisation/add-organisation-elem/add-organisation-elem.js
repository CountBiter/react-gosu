import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_ORGANISATION } from "../../../apollo-client/apollo-request";
import UploadFile from "../../upload-file";

function AddOrganisation() {
  const [addOrganisation, { loading, error }] = useMutation(ADD_ORGANISATION);
  const [orgName, setOrgNameState] = useState("");
  const [orgFullName, setOrgFullName] = useState("");
  const [idfificationNumber, setIdfificationNumber] = useState("");
  const [kppNumber, setKppNumber] = useState("");
  const [identificationNumber, setIdentificationNumber] = useState("");
  const [identificationPass, setIdentificationPass] = useState("");
  const [okedNumber, setOkedNumber] = useState("");
  const [file, setFile] = useState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  return (
    <form className="p-5 text-start">
      <div className="mb-3">
        <label className="form-label">Название компании</label>
        <input
          type="text"
          className="form-control"
          id="InputClientName"
          onChange={(e) => setOrgNameState(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Полное название компании</label>
        <input
          type="email"
          className="form-control"
          id="InputClientEmail"
          onChange={(e) => setOrgFullName(e.target.value)}
        />
      </div>
      <div className="mb-3 position-relative d-flex">
        <label className="btn p-0 m-0" id="addfile-btn">
          <input
            id="addfile"
            type="file"
            hidden="hidden"
            onChange={async (e) => {
              setFile(await UploadFile(e.target.files[0]));
            }}
          />
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
        <label className="form-label">Идентификационный номер</label>
        <input
          type="email"
          className="form-control"
          id="InputClientEmail"
          onChange={(e) => setIdfificationNumber(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Кпп номер</label>
        <input
          type="email"
          className="form-control"
          id="InputClientEmail"
          onChange={(e) => setKppNumber(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Окед номер</label>
        <input
          type="email"
          className="form-control"
          id="InputClientEmail"
          onChange={(e) => setOkedNumber(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Идентификационный номер</label>
        <input
          type="email"
          className="form-control"
          id="InputClientEmail"
          onChange={(e) => setIdentificationNumber(e.target.value)}
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Идентификационный пароль</label>
        <input
          type="email"
          className="form-control"
          id="InputClientEmail"
          onChange={(e) => setIdentificationPass(e.target.value)}
        />
      </div>
      <div className="form-floating">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          id="login"
          onClick={(e) => {
            e.preventDefault();
            addOrganisation({
              variables: {
                org: {
                  title: orgName,
                  icon: file.file_url,
                  full_name: orgFullName,
                  idfification_number: idfificationNumber,
                  kpp: kppNumber,
                  oked: okedNumber,
                  org_data: {
                    identification_number: identificationNumber,
                    org_passHash: identificationPass,
                  },
                },
              },
            });
          }}
        >
          ДОБАВИТЬ
        </button>
      </div>
    </form>
  );
}

export default AddOrganisation;
