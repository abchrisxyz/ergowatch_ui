import Card from "../../components/card";
import colors from "../../config/colors";
import SeriesChart from "./common/series-chart";
import MetricTemplate from "./common/template";
import ChangeSummary from "./common/change-summary";

import './contracts-chart.css';

const seriesOptions = [
  { label: "Total", value: "gt_0", index: 0, color: colors.black },
  { label: ">0.001", value: "ge_0p001", index: 1, color: colors.orange },
  { label: ">0.01", value: "ge_0p01", index: 2, color: colors.orange },
  { label: ">0.1", value: "ge_0p1", index: 3, color: colors.orange },
  { label: ">1", value: "ge_1", index: 4, color: colors.green },
  { label: ">10", value: "ge_10", index: 5, color: colors.green },
  { label: ">100", value: "ge_100", index: 6, color: colors.green },
  { label: ">1k", value: "ge_1k", index: 7, color: colors.blue },
  { label: ">10k", value: "ge_10k", index: 8, color: colors.blue },
  { label: ">100k", value: "ge_100k", index: 9, color: colors.blue },
  { label: ">1M", value: "ge_1m", index: 10, color: colors.pink },
];


const Contracts = () => {
  const id = "contracts";
  return (
    <MetricTemplate id={id} name="Contracts">
      <Card>
        <SeriesChart
          id={id}
          api="/metrics/addresses/contracts"
          seriesOptions={seriesOptions}
          initialOptions={[0, 1]}
          yLabel="Contract Addresses"
          ySize={70}
        />
      </Card>
      <Card title="Description">
        <p>Number of unique contract addresses by minimum balance.</p>
        <p>Does not include mining contracts.</p>
      </Card>
      <Card title="Summary">
        <ChangeSummary
          api="/metrics/summary/addresses/contracts"
          headers={["Minimal balance", "Current", "1 Day", "1 Week", "4 Weeks", "6 Months ", "1 Year"]}
          fields={["current", "diff_1d", "diff_1w", "diff_4w", "diff_6m", "diff_1y"]}
          keys={[
            "total",
            "ge_0p001",
            "ge_0p01",
            "ge_0p1",
            "ge_1",
            "ge_10",
            "ge_100",
            "ge_1k",
            "ge_10k",
            "ge_100k",
            "ge_1m",
          ]}
          labels={{
            total: "Total",
            ge_0p001: "0.001 ERG",
            ge_0p01: "0.01 ERG",
            ge_0p1: "0.1 ERG",
            ge_1: "1 ERG",
            ge_10: "10 ERG",
            ge_100: "100 ERG",
            ge_1k: "1k ERG",
            ge_10k: "10k ERG",
            ge_100k: "100k ERG",
            ge_1m: "1M ERG",
          }}
        />
      </Card>
    </MetricTemplate>
  )
}

export default Contracts;
