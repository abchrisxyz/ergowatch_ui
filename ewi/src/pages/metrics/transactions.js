import Card from "../../components/card";
import colors from "../../config/colors";
import SeriesChart from "./common/series-chart";
import MetricTemplate from "./common/template";


const seriesOptions = [
  { label: "Daily 1d", value: "daily_1d", index: 0, color: colors.orange },
  { label: "Daily 7d", value: "daily_7d", index: 0, color: colors.green },
  { label: "Daily 28d", value: "daily_28d", index: 0, color: colors.blue },
];

const Transactions = () => {
  const id = "transactions";
  return (
    <MetricTemplate id={id} name="Transactions">
      <Card>
        <SeriesChart
          api="/metrics/transactions"
          seriesOptions={seriesOptions}
          initialOptions={[0,]}
          yLabel="Transactions / 24h"
          ySize={70}
          markLast={colors.blue}
        />
      </Card>
      <Card title="Description">
        <p>Total number of transactions per day over the past 1, 7, or 28 days prior.</p>
      </Card>
    </MetricTemplate>
  )
}

export default Transactions;
