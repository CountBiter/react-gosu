import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import {
  GET_ALL_ROLES,
  GET_ALL_USER,
  UPDATE_USER_ROLE,
} from "../../../apollo-client/apollo-request";

function SelectOptionUser() {
  const { data, loading, error } = useQuery(GET_ALL_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.getAllUsers.map((item) => (
    <option key={item._id} value={item._id}>
      {item.first_name} {item.middle_name}
    </option>
  ));
}
function SelectOptionRole() {
  const { data, loading, error } = useQuery(GET_ALL_ROLES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return data.getAllRoles.map((item) => (
    <option key={item._id} value={item._id}>
      {item.title}
    </option>
  ));
}

function ChangeUserRole() {
  const [updateUserRoles, { loading, error }] = useMutation(UPDATE_USER_ROLE);

  const [user, setUser] = useState("");
  const [role, setRole] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <form className="p-5 text-start">
      <div className="mb-3">
        <label className="form-label">
          <select
            className="form-select mb-3"
            id="exampleFormControlInput1"
            aria-label="select"
            onChange={(e) => {
              setRole(e.target.value);
            }}
          >
            <SelectOptionRole />
          </select>
        </label>
      </div>
      <div className="mb-3">
        <label className="form-label">
          <select
            className="form-select mb-3"
            id="exampleFormControlInput1"
            aria-label="select"
            onChange={(e) => {
              setUser(e.target.value);
            }}
          >
            <SelectOptionUser />
          </select>
        </label>
      </div>

      <div className="form-floating">
        <button
          className="btn btn-primary col-12 text-uppercase fs-6 fw-bolder py-2"
          id="login"
          onClick={async () => {
            updateUserRoles({
              variables: {
                roleId: role,
                userId: user,
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

export { ChangeUserRole };
