import Card from "../../components/card";
import colors from "../../config/colors";
import SeriesChart from "./common/series-chart";
import MetricTemplate from "./common/template";


const seriesOptions = [
  { label: "Daily 1d", value: "daily_1d", index: 0, color: colors.orange, scale: 10 ** -9 },
  { label: "Daily 7d", value: "daily_7d", index: 0, color: colors.green, scale: 10 ** -9 },
  { label: "Daily 28d", value: "daily_28d", index: 0, color: colors.blue, scale: 10 ** -9 },
];

const TransferVolume = () => {
  const id = "transfer-volume";
  return (
    <MetricTemplate id={id} name="Transfer Volume">
      <Card>
        <SeriesChart
          api="/metrics/volume"
          seriesOptions={seriesOptions}
          initialOptions={[0,]}
          markLast={colors.blue}
          yLabel="ERG"
          ySize={80}
        />
      </Card>
      <Card title="Description">
        <p>The amount of ERG transfered between different addresses over the past 1, 7, or 28 days prior.</p>
        <p>Does not include coinbase emission.</p>
      </Card>
    </MetricTemplate>
  )
}

export default TransferVolume;
