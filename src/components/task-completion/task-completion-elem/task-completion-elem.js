import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_ALLTASKS,
  GET_ALL_STATE,
  GET_ORG,
  GET_STATE,
  GET_USER,
} from "../../../apollo-client/apollo-request";
import formatDuration, { formatDate } from "../../format-date/formate-date";

function MoreState() {
  const { data, loading, error } = useQuery(GET_ALL_STATE);

  if (loading) {
    return <option>Loading...</option>;
  }
  if (error) {
    console.log(error.message);
    return <option>{error.message} </option>;
  }
  return data.getAllState.map((item) => (
    <th scope="col" value={item._id} key={item._id}>
      {item.title}
    </th>
  ));
}

function DownloadExcel({ page, state }) {
  const { loading, error, data } = useQuery(GET_ALLTASKS, {
    variables: {
      page: page,
      stateId: state,
    },
  });
  const [asd, setasd] = useState("");
  let excel;

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    console.log("asdasd");
  });

  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td>Error : {error.message}</td>
      </tr>
    );

  return (
    <button
      onClick={async () => {
        const a = await fetch("http://localhost:5000/dowload", {
          method: "POST",
          body: JSON.stringify(data.getTaskByState),
          headers: {
            access: "application.json",
            "Content-Type": "application/json",
          },
        })
          .then((r) => r.json())
          .then((data) => data);
        console.log(a);
        setasd(a);
      }}
    >
      <a href={asd.url}>dasdsadsa</a>
    </button>
  );
}

function AllTaskCompletion({ page = 0, state }) {
  const { loading, error, data } = useQuery(GET_ALLTASKS, {
    variables: {
      page: page,
      stateId: state,
    },
  });

  if (loading)
    return (
      <tr>
        <td>Loading...</td>
      </tr>
    );
  if (error)
    return (
      <tr>
        <td>Error : {error.message}</td>
      </tr>
    );
  function GetOrgName({ id }) {
    const { data, loading, error } = useQuery(GET_ORG, {
      variables: {
        userId: id,
      },
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }

    return <span>{data.getOrgByUserId.title}</span>;
  }

  function GetUserName({ id }) {
    const { data, loading, error } = useQuery(GET_USER, {
      variables: { userId: id },
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }

    if (data.getUser.length === 0) {
      return <span>не назначен</span>;
    } else {
      return data.getUser.map(({ first_name, middle_name }) => (
        <span>
          {first_name} {middle_name}
          <br />
        </span>
      ));
    }
  }
  function GetStateName({ id }) {
    const { data, loading, error } = useQuery(GET_STATE, {
      variables: { stateId: id },
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }

    if (data.getState === null) {
      return <span>не назначен</span>;
    } else {
      return <span>{data.getState.title}</span>;
    }
  }
  if (data.getTaskByState) {
    console.log(data.getTaskByState);
    return data.getTaskByState
      .map(
        (
          {
            _id,
            implementer_id,
            priority,
            state_id,
            author_id,
            mata_tags,
            create_date,
            title,
          },
          i
        ) => (
          <tr key={Math.random().toString()}>
            <th scope="row" key={Math.random().toString()}>
              {_id}
            </th>
            <td className="btn" key={Math.random().toString()}>
              <a
                href="/infotask"
                onClick={() => localStorage.setItem("taskId", _id)}
              >
                {title}
              </a>
            </td>
            <td key={Math.random().toString()}>
              {mata_tags.map((item) => `${item}, `)}
            </td>
            <td key={Math.random().toString()}>
              <GetUserName id={implementer_id} />
            </td>
            <td key={Math.random().toString()}>
              <GetOrgName id={author_id} />
            </td>
            <td key={Math.random().toString()}>
              <GetUserName id={author_id} />
            </td>
            <td key={Math.random().toString()}>{formatDate(create_date)}</td>
            <td key={Math.random().toString()}>{priority}</td>
            <td key={Math.random().toString()}>
              <GetStateName id={state_id} />
            </td>
          </tr>
        )
      )
      .reverse();
  } else {
    return (
      <tr>
        <td>sdgfhjg</td>
      </tr>
    );
  }
}

export { AllTaskCompletion, MoreState, DownloadExcel };
