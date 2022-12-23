import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import BreadCrumbs from "../../components/breadcrumbs";
import { API2_ROOT } from "../../config";

import './metrics.css';


const Metrics = () => {

  const [data, setData] = useState(undefined);

  useEffect(() => {
    const qry = API2_ROOT + "/metrics/";
    fetch(qry)
      .then(res => res.json())
      .then(res => {
        setData({
          counts_p2pks: Number(res.counts_p2pks),
          counts_contracts: Number(res.counts_contracts),
          counts_miners: Number(res.counts_miners),
          dist_1prc_p2pks: Number(res.dist_1prc_p2pks) * 100.,
          dist_1prc_contracts: Number(res.dist_1prc_contracts) * 100.,
          dist_1prc_miners: Number(res.dist_1prc_miners) * 100.,
          supply_prc_on_p2pks: Number(res.supply_prc_on_p2pks) * 100,
          supply_on_cexs: Number(res.supply_on_cexs / 10 ** 9 / 10 ** 6),
          // supply_age_overall: Number(res.supply_age_overall),
          usage_24h_volume: Number(res.usage_24h_volume) / 10 ** 9,
          usage_24h_transactions: Number(res.usage_24h_transactions),
          usage_utxos: Number(res.usage_utxos),
        })
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <main>
      <h1>On-Chain Metrics</h1>
      <BreadCrumbs>
        <Link to="/">Home</Link>
        <Link to="/metrics">Metrics</Link>
      </BreadCrumbs>
      <div className="container">
        <h2>Addresses</h2>
        <div className="on-chain-metrics">
          <Link to="/metrics/addresses">
            <div className="preview">
              <h2>P2PK's</h2>
              <div className="item">
                Total: {data ? data.counts_p2pks.toLocaleString('en') : '...'}
              </div>
            </div>
          </Link>
          <Link to="/metrics/contracts">
            <div className="preview">
              <h2>Contracts</h2>
              <div className="item">
                Total: {data ? data.counts_contracts.toLocaleString('en') : '...'}
              </div>
            </div>
          </Link>
          <Link to="/metrics/mining-contracts">
            <div className="preview">
              <h2>Mining Contracts</h2>
              <div className="item">
                Total: {data ? data.counts_miners.toLocaleString('en') : '...'}
              </div>
            </div>
          </Link>
        </div>

        <h2>Supply Distribution</h2>
        <div className="on-chain-metrics">
          <Link to="/metrics/distribution">
            <div className="preview">
              <h2>P2PK's</h2>
              <div className="item">
                Top 1%: {data ? data.dist_1prc_p2pks.toFixed(2) : '...'}%
              </div>
            </div>
          </Link>
          <Link to="/metrics/tvl">
            <div className="preview">
              <h2>Contracts</h2>
              <div className="item">
                Top 1%: {data ? data.dist_1prc_contracts.toFixed(2) : '...'}%
              </div>
            </div>
          </Link>
          <Link to="/metrics/mtvl">
            <div className="preview">
              <h2>Mining contracts</h2>
              <div className="item">
                Top 1%: {data ? data.dist_1prc_miners.toFixed(2) : '...'}%
              </div>
            </div>
          </Link>
        </div>
        <h2>Supply Stats</h2>
        <div className="on-chain-metrics">
          <Link to="/metrics/supply-composition">
            <div className="preview">
              <h2>Composition</h2>
              <div className="item">
                P2PK's: {data ? data.supply_prc_on_p2pks.toFixed(2).toLocaleString('en') : '...'}%
              </div>
            </div>
          </Link>
          <Link to="/metrics/cexs">
            <div className="preview">
              <h2>Exchanges</h2>
              <div className="item">
                ERG: {data ? data.supply_on_cexs.toFixed(2).toLocaleString('en') : '...'}M ERG
              </div>
            </div>
          </Link>
          {/* <Link to="/metrics/age">
            <div className="preview">
              <h2>Supply Age</h2>
              <div className="item">
                Overall: {data ? Number(data.supply_age_overall.toFixed(1)).toLocaleString('en') : '...'} days
              </div>
            </div>
          </Link> */}
        </div>
        <h2>Usage</h2>
        <div className="on-chain-metrics">
          <Link to="/metrics/transfer-volume">
            <div className="preview">
              <h2>Transfer Volume</h2>
              <div className="item">
                Last 24h: {data ? Number(data.usage_24h_volume.toFixed(0)).toLocaleString('en') : '...'} ERG
              </div>
            </div>
          </Link>
          <Link to="/metrics/transactions">
            <div className="preview">
              <h2>Transactions</h2>
              <div className="item">
                Last 24h: {data ? Number(data.usage_24h_transactions.toFixed(0)).toLocaleString('en') : '...'}
              </div>
            </div>
          </Link>
          <Link to="/metrics/utxos">
            <div className="preview">
              <h2>UTXO's</h2>
              <div className="item">
                Total: {data ? data.usage_utxos.toLocaleString('en') : '...'}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </main>
  )
}

export default Metrics;
