import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";

import BreadCrumbs from "../components/breadcrumbs";

import './oracle-pool.css';

const Status = ({ lastCommit }) => {
  const hoursSinceLastCommit = (Date.now() - Date.parse(lastCommit)) / 1000 / 3600;
  var status = 'offline';
  if (hoursSinceLastCommit <= 1) {
    status = 'active'
  }
  else if (hoursSinceLastCommit <= 24) {
    status = 'idle'
  }

  return (
    <div className={"status " + status}>
      {status}
    </div>
  );
}

function formatCommitDate(timeString) {
  const d = new Date(timeString)
  return d.toLocaleDateString() + " " + d.toLocaleTimeString();
}

function formatRow(row, idx) {

  const acceptanceRate = row.commits > 0
    ? (row.accepted_commits / row.commits * 100).toFixed(1) + "%"
    : "-";

  return [
    <div key={"or-" + idx} className="address"><span className="header">Oracle:</span>{row.address.substring(0, 8)}</div>,
    <div key={"cs-" + idx} className="stats"><span className="header">Commits:</span>{row.commits}</div>,
    <div key={"ac-" + idx} className="stats"><span className="header">Accepted:</span>{acceptanceRate}</div>,
    <div key={"fc-" + idx} className="stats"><span className="header">First commit:</span>{formatCommitDate(row.first_commit)}</div>,
    <div key={"lc-" + idx} className="stats"><span className="header">Last commit:</span>{formatCommitDate(row.last_commit)}</div>,
    <Status key={"st-" + idx} lastCommit={row.last_commit} />
  ];
}

function reduceData(acc, row, idx) {
  acc.push(...formatRow(row, idx));
  return acc;
}


const CommitStats = ({ data }) => {
  if (!data) return "";

  return (
    <div>
      <h2>Commit stats</h2>
      <div className="commit-stats">
        {data.reduce(reduceData, [])}
      </div>
    </div>
  );
}

const OraclePool = () => {
  const { pair } = useParams();
  const [stats, setStats] = useState(undefined)

  useEffect(() => {
    const qry = "http://192.168.1.72:8000/oracle-pools/commit-stats/ergusd";
    fetch(qry)
      .then(res => res.json())
      .then(res => setStats(res))
      .catch(err => console.error(err));
  }, [])

  return (
    <main>
      <h1>{pair} Oracle Pool</h1>
      <BreadCrumbs>
        <Link to="/">Home</Link>
        <Link to="/oracle-pools">Oracle Pools</Link>
        <Link to="/oracle-pools/{pair}">{pair}</Link>
      </BreadCrumbs>
      <div className="oracle-pool-wrapper">
        <CommitStats data={stats} />
      </div>
    </main>
  )
}

export default OraclePool;