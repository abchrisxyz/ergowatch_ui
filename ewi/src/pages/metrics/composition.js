import { useState } from 'react';

import Card from "../../components/card";
import colors from "../../config/colors";
import SeriesChart from "./composition-chart";
import MetricTemplate from "./common/template";
import ChangeSummary from "./common/change-summary";

import './composition.css';

const seriesOptions = [
  { label: "P2PK's", value: "p2pks", index: 0, color: colors.black, scale: 10 ** -9 },
  { label: "CEX main", value: "cex_main", index: 1, color: colors.orange, scale: 10 ** -9 },
  { label: "CEX deposit", value: "cex_deposits", index: 2, color: colors.green, scale: 10 ** -9 },
  { label: "Contracts", value: "contracts", index: 3, color: colors.blue, scale: 10 ** -9 },
  { label: "Mining contracts", value: "miners", index: 4, color: colors.pink, scale: 10 ** -9 },
  { label: "Treasury", value: "treasury", index: 5, color: colors.purple, scale: 10 ** -9 },
];

const Composition = () => {
  const id = "distribution";

  const [relative, setRelative] = useState(true);

  return (
    <MetricTemplate id={id} name="Supply Composition">
      <Card>
        <SeriesChart
          api="/metrics/supply/composition"
          seriesOptions={seriesOptions}
          initialOptions={[0,]}
          yLabel={relative ? "% of Circ. Supply" : "ERG"}
          ySize={relative ? 65 : 80}
          setRelative={setRelative}
          relative={relative}
          toFixed={relative ? 2 : 0}
          units={relative ? "%" : ""}
        />
      </Card>
      <Card title="Description">
        <p>Breakdown of circulating supply by address group.</p>
        <div className='categories'>
          <div>P2PK's:</div><div> Supply on typical wallet addresses</div>
          <div>CEX main:</div><div> Supply on known exchange main addresses</div>
          <div>CEX deposit:</div><div> Supply on known exchange deposit addresses</div>
          <div>Contracts:</div><div> Supply on non-mining contracts, excluding the EF treasury</div>
          <div>Mining contracts:</div><div> Supply on mining contracts</div>
          <div>Treasury:</div><div> Supply on the EF treasury contract</div>
        </div>
      </Card>
      <Card title="Change Summary">
        <ChangeSummary
          api="/metrics/summary/supply/composition"
          variant={relative ? "relative" : "absolute"}
          headers={["Addresses", "Last", "1 Day", "1 Week", "4 Weeks", "6 Months ", "1 Year"]}
          fields={["current", "diff_1d", "diff_1w", "diff_4w", "diff_6m", "diff_1y"]}
          keys={["p2pks", "cex_main", "cex_deposits", "contracts", "miners", "treasury"]}
          labels={{
            p2pks: "P2PK's",
            cex_main: "CEX main",
            cex_deposits: "CEX deposit",
            contracts: "Contracts",
            miners: "Mining contracts",
            treasury: "Treasury",
          }}
          toFixed={relative ? 2 : 0}
          units={relative ? "%" : ""}
          scale={relative ? 100 : 10 ** -9}
        />
      </Card>
    </MetricTemplate >
  )
}

export default Composition;
