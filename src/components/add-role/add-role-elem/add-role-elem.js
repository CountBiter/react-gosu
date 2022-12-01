import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ADD_ROLE } from "../../../apollo-client/apollo-request";
import UploadFile from "../../upload-file";

import Select from "react-select";

function AddRole() {
  const [addRoles, { loading, error }] = useMutation(ADD_ROLE);

  const [valueOption, setValueOption] = useState();
  const [permation, setPermation] = useState([]);
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [file, setFile] = useState();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const handleChange = (val) => {
    setPermation(val);
  };

  const options = [
    { value: "title", label: "title" },
    { value: "description", label: "description" },
    { value: "implementer", label: "implementer" },
    { value: "state", label: "state" },
    { value: "priority", label: "priority" },
    { value: "files", label: "files" },
    { value: "comments", label: "comments" },
    { value: "admin", label: "admin" },
  ];

  return (
    <form className="p-5 text-start">
      <div className="mb-3">
        <label className="form-label">Название роли:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="2"
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        ></textarea>
      </div>
      <div className="mb-3 position-relative">
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
            Иконка
          </h5>
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">Описание роли:</label>
        <textarea
          className="form-control"
          id="exampleFormControlTextarea1"
          rows="2"
          onChange={(e) => {
            setText(e.target.value);
          }}
        ></textarea>
      </div>
      <Select
        isMulti
        name="colors"
        options={options}
        className="basic-multi-select"
        classNamePrefix="select"
        onChange={handleChange}
        isSearchable={true}
      />

      <div className="form-floating"></div>
      <button
        className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
        onClick={(e) => {
          e.preventDefault();
          const allPermation = {
            title: false,
            description: false,
            implementer: false,
            state: false,
            priority: false,
            files: false,
            comments: false,
            admin: false,
          };

          permation.forEach((item) => {
            if (item.value === "title") {
              allPermation.title = true;
            }
            if (item.value === "description") {
              allPermation.description = true;
            }
            if (item.value === "implementer") {
              allPermation.implementer = true;
            }
            if (item.value === "state") {
              allPermation.state = true;
            }
            if (item.value === "priority") {
              allPermation.priority = true;
            }
            if (item.value === "files") {
              allPermation.files = true;
            }
            if (item.value === "comments") {
              allPermation.comments = true;
            }
            if (item.value === "admin") {
              allPermation.admin = true;
            }
          });
          console.log(allPermation);
          addRoles({
            variables: {
              roles: {
                title: title,
                icon: file.file_url,
                description: text,
              },
              rolesTasks: allPermation,
            },
          });
        }}
      >
        СОЗДАТЬ ЗАЯВКУ
      </button>
    </form>
  );
}

export default AddRole;
