import { GET_USERROLE } from "../../apollo-client/apollo-request";
import { useQuery } from "@apollo/client";

import AddClientForm from "../add-client/add-client-elem";
import AddOrganisation from "../add-organisation/add-organisation-elem";

import "../home-page/home-page";
import {
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
} from "../../image/img.js";
import AddRole from "../add-role/add-role-elem";

function ForHomePage() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const { loading, error, data } = useQuery(GET_USERROLE, {
    variables: {
      token: userToken.token,
    },
  });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  const { permmission } = data.getRole;

  if (permmission.files && permmission.title && permmission.description) {
    return (
      <div>
        <div className="col-lg-11 d-flex justify-content-evenly mt-5 pb-5">
          <div className="btn bg-primary bg-opacity-50 col-5 col-md-4 col-lg-3 py-4 px-3">
            <a href="/settings">
              <img className="col-3 mb-3" src={image1} alt="image1" />
              <h4 className="text4">Настройка оборудования</h4>
            </a>
          </div>

          <div className="btn bg-primary bg-opacity-50 col-5 col-md-4 col-lg-3 py-4 px-3">
            <a href="/question">
              <img className="col-3 mb-3" src={image2} alt="" />
              <h4 className="text4">Вопрос по 1С</h4>
            </a>
          </div>
        </div>
        <div className="col-lg-11 d-flex justify-content-evenly mb-5 pb-5">
          <div className="btn bg-primary bg-opacity-50 col-5 col-md-4 col-lg-3 py-4 px-3">
            <a href="/other">
              <img className="col-3 mb-3" src={image3} alt="" />
              <h4 className="text4">Другое</h4>
            </a>
          </div>
          <div className="btn bg-primary bg-opacity-50 col-5 col-md-4 col-lg-3 py-4 px-3">
            <a href="/task">
              <img className="col-3 mb-3" src={image4} alt="" />
              <h4 className="text4">Все заявки</h4>
            </a>
          </div>
        </div>
      </div>
    );
  } else if (
    (permmission.implementer && permmission.state && permmission.priority) ||
    permmission.admin
  ) {
    return (
      <div>
        <div className="d-flex justify-content-evenly mt-5 pb-md-5">
          <div className="btn bg-primary bg-opacity-50 col-4 col-md-3 py-4 px-3">
            <a href="/addclient">
              <img className="col-3 mb-3" src={image5} alt="" />
              <h4 className="text4">Добавить сотрудника</h4>
            </a>
          </div>
          <div className="btn bg-primary bg-opacity-50 col-4 col-md-3 py-4 px-3">
            <a href="/addorganisation">
              <img className="col-3 mb-3" src={image6} alt="" />
              <h4 className="text4">Добавить организацию:</h4>
            </a>
          </div>
          <div className="btn bg-primary bg-opacity-50 col-4 col-md-3 py-4 px-3">
            <a href="/addrole">
              <img className="col-3 mb-3" src={image6} alt="" />
              <h4 className="text4">Добавить роль:</h4>
            </a>
          </div>
          <div className="btn bg-primary bg-opacity-50 col-4 col-md-3 py-4 px-3 d-none d-md-block">
            <a href="/task">
              <img className="col-3 mb-3" src={image4} alt="" />
              <h4 className="text4">Все заявки</h4>
            </a>
          </div>
        </div>
      </div>
    );
  }

  return "Ok";
}

function ForTaskPage() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const { loading, error, data } = useQuery(GET_USERROLE, {
    variables: {
      token: userToken.token,
    },
  });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  const { permmission } = data.getRole;

  if (permmission.files && permmission.title && permmission.description) {
    return null;
  } else if (
    (permmission.implementer && permmission.state && permmission.priority) ||
    permmission.admin
  ) {
    return (
      <div className="mb-3 d-flex">
        <div className="col-6 col-md-4 bg-light rounded d-flex align-items-center px-2 py-2 me-md-5 me-2">
          <h1 className="text-primary text1">125 &ensp;</h1>
          <h3 className="text3">закрытых заявок</h3>
        </div>
        <div className="col-6 col-md-4 bg-light rounded d-flex align-items-center px-2 py-2">
          <h1 className="text-primary text1">84 &ensp;</h1>
          <h3 className="text3">заявок в работе</h3>
        </div>
      </div>
    );
  }

  return "Ok";
}

function ForIntoTaskPage() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const { loading, error, data } = useQuery(GET_USERROLE, {
    variables: {
      token: userToken.token,
    },
  });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  const { permmission } = data.getRole;

  if (permmission.files && permmission.title && permmission.description) {
    return null;
  } else if (
    (permmission.implementer && permmission.state && permmission.priority) ||
    permmission.admin
  ) {
    return (
      <div className="card card-time bg-primary text-light mt-4">
        <div className="card-body pb-0">
          <div className="card-title">Время с момента подачи заявки:</div>
          <h4>
            <input className="form-control bg-transparent" type="time" />
          </h4>
        </div>
        <div className="card-body">
          <div className="card-title">Время с момента принятия заявки:</div>
          <h4>
            <input className="form-control bg-transparent" type="time" />
          </h4>
        </div>
      </div>
    );
  }

  return "Ok";
}

function ForProfile() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const { loading, error, data } = useQuery(GET_USERROLE, {
    variables: {
      token: userToken.token,
    },
  });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }

  const { permmission } = data.getRole;
  if (permmission.files && permmission.title && permmission.description) {
    return <div></div>;
  } else if (
    (permmission.implementer && permmission.state && permmission.priority) ||
    permmission.admin
  ) {
    return (
      <div className="mb-3 d-flex">
        <div className="col-6 col-md-4 bg-light rounded d-flex align-items-center px-md-2 py-2 me-md-5 me-2">
          <h1 className="text-primary text1 ms-1">125 &ensp;</h1>
          <h3 className="text3">закрытых заявок</h3>
        </div>
        <div className="col-5 col-md-4 bg-light rounded d-flex align-items-center px-md-2 py-2">
          <h1 className="text-primary text1 ms-1">84 &ensp;</h1>
          <h3 className="text3">заявок в работе</h3>
        </div>
      </div>
    );
  }
}

function ForAdminAddClient() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const { loading, error, data } = useQuery(GET_USERROLE, {
    variables: {
      token: userToken.token,
    },
  });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  const { permmission } = data.getRole;

  if (permmission.files && permmission.title && permmission.description) {
    return <div>Error 404: Page is not found</div>;
  } else if (
    (permmission.implementer && permmission.state && permmission.priority) ||
    permmission.admin
  ) {
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
            <AddClientForm />
          </div>
        </div>
      </div>
    );
  }
}
function ForAdminAddOrg() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const { loading, error, data } = useQuery(GET_USERROLE, {
    variables: {
      token: userToken.token,
    },
  });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  const { permmission } = data.getRole;

  if (permmission.files && permmission.title && permmission.description) {
    return <div>Error 404: Page is not found</div>;
  } else if (
    (permmission.implementer && permmission.state && permmission.priority) ||
    permmission.admin
  ) {
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

function ForAdminAddRole() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const { loading, error, data } = useQuery(GET_USERROLE, {
    variables: {
      token: userToken.token,
    },
  });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  const { permmission } = data.getRole;

  if (permmission.files && permmission.title && permmission.description) {
    return <div>Error 404: Page is not found</div>;
  } else if (
    (permmission.implementer && permmission.state && permmission.priority) ||
    permmission.admin
  ) {
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
            <AddRole />
          </div>
        </div>
      </div>
    );
  }
}

function ForInfoTask() {
  const userToken = JSON.parse(localStorage.getItem("token"));

  const { loading, error, data } = useQuery(GET_USERROLE, {
    variables: {
      token: userToken.token,
    },
  });

  if (loading) {
    return <div>Loading..</div>;
  }
  if (error) {
    return <div>error</div>;
  }
  const { permmission } = data.getRole;

  if (permmission.files && permmission.title && permmission.description) {
    console.log("OKOKOK")
    return (
      <div className="mt-4 d-md row mb-4">
        <button className="btn bg-primary text-light col mx-1" onClick={(e) => {
          e.preventDefault();
          
        }}>
          {" "}
          <h5 className="text4">Отменить заявку</h5>{" "}
        </button>
        <button className="btn bg-light text-primary col mx-1">
          <a href="/task"><h5 className="text4">Закрыть заявку</h5>{" "}</a>
        </button>
      </div>
    );
  } else if (
    (permmission.implementer && permmission.state && permmission.priority) ||
    permmission.admin
  ) {
    return <div></div>;
  } 
}

export {
  ForHomePage,
  ForTaskPage,
  ForIntoTaskPage,
  ForProfile,
  ForAdminAddClient,
  ForAdminAddOrg,
  ForAdminAddRole,
  ForInfoTask
};
