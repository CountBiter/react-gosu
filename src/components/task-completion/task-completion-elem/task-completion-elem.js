import { useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import {
  GET_ALLTASKS,
  GET_ALL_STATE,
  GET_ORG,
} from "../../../apollo-client/apollo-request";
import { formatDate, formatDuration } from "../../format-date/";
import { GetOrgName, GetUserName } from "../../hooks";
import { useStates } from "../../hooks/hooks";

function MoreState() {
  const { data, loading, error } = useQuery(GET_ALL_STATE);

  if (loading) {
    return <option>Loading...</option>;
  }
  if (error) {
    return <option>{error.message} </option>;
  }
  return data.getAllState.map((item) => (
    <th scope="col" value={item._id} key={item._id}>
      {item.title}
    </th>
  ));
}

function useOrgName({ id }) {
  const { data, loading, error } = useQuery(GET_ORG, {
    variables: {
      userId: id,
    },
  });
  const [orgName, setOrgName] = useState(null);

  useEffect(() => {
    if (!loading && !data?.message) {
      setOrgName(data.getOrgByUserId);
    }
  }, [data, loading]);

  return { orgName: orgName };
}

function DownloadExcel({ page, state }) {
  const { loading, error, data } = useQuery(GET_ALLTASKS, {
    variables: {
      page: page,
      stateId: state,
    },
  });
  const [asd, setasd] = useState("");
  const { states } = useStates();

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
          body: JSON.stringify({
            tasks: data.getTaskByState,
            state: states.getAllState,
          }),
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
  const { states } = useStates();
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

  if (data.getTaskByState) {
    console.log(data.getTaskByState);
    return (data.getTaskByState ?? [])
      .map((t, i) => (
        <tr key={Math.random().toString()}>
          <th scope="row" key={Math.random().toString()}>
            {i + 1}
          </th>
          <td className="btn" key={Math.random().toString()}>
            <a
              href="/infotask"
              onClick={() => localStorage.setItem("taskId", t._id)}
            >
              {t.title}
            </a>
          </td>
          <td key={Math.random().toString()}>
            {(t.mata_tags ?? []).map((item) => `${item}, `)}
          </td>
          <td key={Math.random().toString()}>
            <GetUserName id={t.implementer_id} />
          </td>
          <td key={Math.random().toString()}>
            <GetOrgName id={t.author_id} />
          </td>
          <td key={Math.random().toString()}>
            <GetUserName id={t.author_id} />
          </td>
          <td key={Math.random().toString()}>{formatDate(t.create_date)}</td>
          <td key={Math.random().toString()}>{t.priority}</td>
          {(states?.getAllState ?? []).map((state) => {
            const comp = (t.state_time.old_state ?? []).map((old_state) => {
              if (state._id === old_state.state_id) {
                return (
                  <td key={Math.random().toString()}>
                    {formatDuration(Number(old_state.duration))}
                  </td>
                );
              }
            });
            if (!comp) {
              return <td key={Math.random().toString()}>&nbsp;</td>;
            } else {
              return comp;
            }
          })}
        </tr>
      ))
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
