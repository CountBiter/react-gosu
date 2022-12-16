import { useQuery } from "@apollo/client";
import {
  GET_ALLTASKS,
  GET_ALL_STASUS,
  GET_ORG,
  GET_STATE,
  GET_USER,
} from "../../../apollo-client/apollo-request";
import  { formatDate } from "../../format-date/";

function AllTask({ page = 0, statusId }) {
  const { loading, error, data } = useQuery(GET_ALLTASKS, {
    variables: {
      page: page,
      stateId: statusId,
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
      return (
        <span>
          {data.getState.title}
        </span>
      );
    }
  }
  if (data.getTaskByState) {
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

function FilterTask() {
  const { loading, error, data } = useQuery(GET_ALL_STASUS);

  if (loading) return <option>Loading...</option>;
  if (error) return <option>Error : {error.message}</option>;

  return data.getAllState.map((item) => (
    <option key={item._id} value={item._id}>
      {item.title}
    </option>
  ));
}

export { AllTask, FilterTask };
