import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import BreadCrumbs from "../components/breadcrumbs";

import './oracle-pool.css';

const OracleStatsRow = ({ id, address, commits, acceptanceRate, lastCommit }) => {
  return (
    <li className="oracle-stats-row">
      <div>{id}</div>
      <div>{address}</div>
      <div>{commits}</div>
      <div>{acceptanceRate}</div>
      <div>{lastCommit}</div>
    </li>
  );
}


const OracleStats = ({ data }) => {
  if (!data) return "";
  const rows = data.map((r, idx) =>
    <OracleStatsRow
      key={idx}
      id={idx + 1}
      address={r.address}
      commits={r.commits}
      acceptanceRate={r.accepted_commits / r.commits}
      lastCommit={r.last_commit}
    />
  )
  return (
    <div className="oracle-stats">
      <h2>Oracle stats</h2>
      <ul>
        {rows}
      </ul>
    </div>
  );
}

const OraclePool = () => {
  const { pair } = useParams();
  const [stats, setStats] = useState(undefined)

  useEffect(() => {
    const qry = "http://localhost:8000/oracle-pools/commit-stats/ergusd";
    fetch(qry)
      .then(res => res.json())
      .then(res => setStats(res))
      .catch(err => console.error(err));
  }, [])

  return (
    <main>
      <h1>{pair} Oracle Pool</h1>
      <BreadCrumbs>
        <Link to="/" exact>Home</Link>
        <Link to="/oracle-pools">Oracle Pools</Link>
        <Link to="/oracle-pools/{pair}">{pair}</Link>
      </BreadCrumbs>
      <div className="oracle-pool-wrapper">
        <OracleStats data={stats} />
      </div>
    </main>
  )
}

export default OraclePool;