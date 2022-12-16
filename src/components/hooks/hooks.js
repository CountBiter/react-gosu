import { useQuery } from "@apollo/client";
import { GET_ORG, GET_STATE, GET_USER } from "../../apollo-client/apollo-request";

export function GetOrgName({ id }) {
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

  export function GetUserName({ id }) {
    const { data, loading, error } = useQuery(GET_USER, {
      variables: { userId: id },
    });

    if (loading) {
      return <p>Loading...</p>;
    }
    if (error) {
      return <p>{error.message} </p>;
    }

    if (data.getUser.length === 0 && data.getUser === null) {
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
  export function GetStateName({ id }) {
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