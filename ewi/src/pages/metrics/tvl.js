import { useState } from "react";

import Card from "../../components/card";
import colors from "../../config/colors";
import { AddressLink } from "../../components/links";
import SeriesChart from "./common/series-chart";
import MetricTemplate from "./common/template";
import ChangeSummary from "./common/change-summary";

const seriesOptions = [
  { label: "Top 10", value: "top_10", index: 0, color: colors.black, scale: 10 ** -9 },
  { label: "Top 100", value: "top_100", index: 1, color: colors.orange, scale: 10 ** -9 },
  { label: "Top 1k", value: "top_1k", index: 2, color: colors.green, scale: 10 ** -9 },
  { label: "Top 1%", value: "top_1prc", index: 3, color: colors.blue, scale: 10 ** -9 },
  { label: "Circulating Supply", value: "circ_supply", index: -1, scale: 10 ** -9 },
];

const Distribution = () => {
  const id = "tvl";

  const [relative, setRelative] = useState(true);

  return (
    <MetricTemplate id={id} name="Contracts Distribution">

      <Card>
        <SeriesChart
          api="/metrics/supply/distribution/contracts"
          seriesOptions={seriesOptions}
          initialOptions={[1,]}
          yLabel={relative ? "% of Circ. Supply" : "ERG"}
          ySize={relative ? 60 : 80}
          setRelative={setRelative}
          relative={relative}
          relativeTo="circ_supply"
          toFixed={relative ? 2 : 0}
          units={relative ? "%" : ""}
        />
      </Card>
      <Card title="Description">
        <p>ERG supply in top <i>x</i> contract addresses, excluding (re)emission contracts, mining contracts and the EF <AddressLink address="4L1ktFSzm3SH1UioDuUf5hyaraHird4D2dEACwQ1qHGjSKtA6KaNvSzRCZXZGf9jkfNAEC1SrYaZmCuvb2BKiXk5zW9xuvrXFT7FdNe2KqbymiZvo5UQLAm5jQY8ZBRhTZ4AFtZa1UF5nd4aofwPiL7YkJuyiL5hDHMZL1ZnyL746tHmRYMjAhCgE7d698dRhkdSeVy">treasury</AddressLink></p>
      </Card>
      <Card title="Change Summary">
        <ChangeSummary
          api="/metrics/summary/supply/distribution/contracts"
          variant={relative ? "relative" : "absolute"}
          headers={["Addresses", "Last", "1 Day", "1 Week", "4 Weeks", "6 Months ", "1 Year"]}
          fields={["current", "diff_1d", "diff_1w", "diff_4w", "diff_6m", "diff_1y"]}
          keys={["top_10", "top_100", "top_1k", "top_1_prc"]}
          labels={{
            top_10: "Top 10",
            top_100: "Top 100",
            top_1k: "Top 1k",
            top_1_prc: "Top 1%",
          }}
          toFixed={relative ? 2 : 0}
          units={relative ? "%" : ""}
          scale={relative ? 100 : 10 ** -9}
        />
      </Card>
    </MetricTemplate>
  )
}

export default Distribution;
