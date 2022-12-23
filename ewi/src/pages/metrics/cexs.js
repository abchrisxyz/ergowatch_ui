import { useState, useEffect } from "react";

import { AddressLink } from "../../components/links";
import Card from "../../components/card";
import colors from "../../config/colors";
import SeriesChart from "./common/series-chart";
import MetricTemplate from "./common/template";
import ChangeSummary from "./common/change-summary";
import { API2_ROOT } from "../../config";

import "./cexs.css";

const seriesOptions = [
  { label: "Total", value: "total", index: 0, color: colors.orange, scale: 10 ** -9 },
  { label: "Deposits", value: "deposit", index: 1, color: colors.green, scale: 10 ** -9 },
];

const Cexs = () => {
  const id = "cexs";

  const relative = false;

  return (
    <MetricTemplate id={id} name="Exchanges">
      <Card>
        <SeriesChart
          api="/metrics/exchanges/supply"
          seriesOptions={seriesOptions}
          initialOptions={[0,]}
          yLabel={relative ? "% of Circ. Supply" : "ERG"}
          ySize={relative ? 60 : 80}
          // setRelative={setRelative}
          // relative={relative}
          // relativeTo="circ_supply"
          toFixed={relative ? 2 : 0}
          units={relative ? "%" : ""}
        />
      </Card>
      <Card title="Description">
        <p>ERG supply on <b>known</b> exchange addresses.</p>
        <ul>
          <li>Total: supply on both main and deposit addresses</li>
          <li>Deposit: supply on deposit addresses only</li>
        </ul>
        <p>
          Significant jumps are likely the result of untracked exchange addresses and do not necessarily represent actual flow to/from exchanges at that point in time.<br />
          Data can change as more CEX addresses get tracked.
        </p>
        <p>
          For supply on exchanges expressed as % of circulating supply, see <a href="/metrics/supply-composition">supply composition</a>.
        </p>
      </Card>
      <Card title="Change Summary">
        <ChangeSummary
          api="/metrics/summary/exchanges/supply"
          headers={["", "Current", "1 Day", "1 Week", "4 Weeks", "6 Months ", "1 Year"]}
          fields={["current", "diff_1d", "diff_1w", "diff_4w", "diff_6m", "diff_1y"]}
          keys={["total", "main", "deposits"]}
          labels={{
            total: "Total",
            main: "Main addresses",
            deposits: "Deposit addresses",
          }}
          scale={10 ** -9}
        />
      </Card>
      <Card title="Tracked Addresses">
        <ExchangeAddresses />
      </Card>
    </MetricTemplate>
  )
}

const cexLogos = {
  coinex: 'https://www.coinex.com/favicon.ico',
  gate: 'https://www.gate.io/favicon.ico',
  kucoin: 'https://assets.staticimg.com/cms/media/7AV75b9jzr9S8H3eNuOuoqj8PwdUjaDQGKGczGqTS.png',
  tradeogre: '/tradeogre-favicon.ico',
  huobi: 'https://www.huobi.com/favicon.ico?1125',
  probit: 'https://static-landing.probit.com/favicon.ico',
};

const cexNames = {
  coinex: 'Coinex',
  gate: 'Gate.io',
  kucoin: 'Kucoin',
  tradeogre: 'TradeOgre',
  huobi: 'Huobi',
  probit: 'ProBit',
};


const ExchangeAddresses = () => {
  const [data, setData] = useState([])

  useEffect(() => {
    const qry = API2_ROOT + "/exchanges/tracklist";
    fetch(qry)
      .then(res => res.json())
      .then(res => setData(res))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="cex-list">
      <div className="rows">
        <div className="header">
          <div>Exchange</div>
          <div>Address</div>
          <div className="right">Balance</div>
        </div>
        {data.map((r, i) => <div key={i}>
          <div className="cex"><img src={cexLogos[r.cex]} alt="logo" />{cexNames[r.cex]}</div>
          <AddressLink address={r.address}><span>{r.address.substring(0, 8)}</span></AddressLink>
          <div className="right">{Number((r.balance / 10 ** 9).toFixed(0)).toLocaleString('en')} ERG</div>
        </div>
        )}
      </div>
    </div>
  );
}


export default Cexs;
