import Card from "../../components/card";
import colors from "../../config/colors";
import SeriesChart from "./common/series-chart";
import MetricTemplate from "./common/template";


const seriesOptions = [
  { label: "Overall", value: "overall", index: 0, color: colors.black },
  { label: "P2PK's", value: "p2pks", index: 0, color: colors.orange },
  { label: "Exchanges", value: "cexs", index: 0, color: colors.green },
  { label: "Contracts", value: "contracts", index: 0, color: colors.blue },
  { label: "Mining contracts", value: "miners", index: 0, color: colors.pink },
];

const Age = () => {
  const id = "age";
  return (
    < MetricTemplate id={id} name="Supply Age" >
      <Card>
        <SeriesChart
          api="/metrics/supply/age"
          seriesOptions={seriesOptions}
          initialOptions={[0,]}
          yLabel="Days"
          ySize={50}
          toFixed={1}
          incrs={[1, 2, 5, 10, 30, 60, 90, 180]}
        />
      </Card>
      <Card title="Description">
        <p>Mean supply age represents the average time since last change of address across all circulating supply.</p>
        <p>Updates every 24h.</p>
      </Card>
    </MetricTemplate >
  )
}

export default Age;
