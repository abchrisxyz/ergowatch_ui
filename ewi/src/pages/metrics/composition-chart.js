import { useEffect, useState } from "react";
import { MultiSelect } from "react-multi-select-component"

import UPlot from "../../components/uplot";
import { Selector, SelectorOption } from "../../components/controls/selector";
import { API2_ROOT } from "../../config";

import './common/series-chart.css';


const SeriesChart = ({ id, api, seriesOptions, initialOptions, toFixed = 0, relative = false, setRelative, yLabel = null, ySize = 80, units = '' }) => {
  const [window, setWindow] = useState('30d');
  const [logScale, setLogScale] = useState(false);
  const [data, setData] = useState(undefined);

  const [selectedOpts, setSelectedOpts] = useState(
    initialOptions.map((i) => seriesOptions[i])
  );

  function sortAndSetSelectedOpts(opts) {
    setSelectedOpts(opts.sort((a, b) => {
      return a.index - b.index;
    }));
  }

  useEffect(() => {
    setData(undefined);
    const to = Date.now();
    const fr = window === '30d'
      ? to - 86400000 * 30
      : window === '90d'
        ? to - 86400000 * 90
        : window === '1y'
          ? to - 86400000 * 365
          : 1561978800000
    const r = window === '30d'
      ? '1h'
      : '24h'

    const qry = API2_ROOT + `${api}?fr=${fr}&to=${to}&r=${r}&ergusd=1`;
    fetch(qry)
      .then(res => res.json())
      .then(res => {
        const data = res;
        data.timestamps = data.timestamps.map(t => t * 0.001);
        seriesOptions.filter(so => so.scale !== undefined).forEach(so => {
          data[so.value] = data[so.value].map(v => v * so.scale);
        });
        // Compute total to calculate relative values
        // Recent values for CEX deposits can be negative (deposits addresses get detected when claimed
        // by CEX, i.e. spending tx, while funding txs won't be accounted for until next repair session)
        // The negative deposit value balance out what's still in p2pk but will be assigned to deposits
        // once repaired.
        // So total is computed as sum of all terms.
        // Then we cap deposit values to 0 for cosmetics.
        data["total"] = data.p2pks.map((_, i) => data.p2pks[i] + data.cex_main[i] + data.cex_deposits[i] + data.contracts[i] + data.miners[i] + data.treasury[i]);
        // data["cex_deposits"] = data["cex_deposits"].map(v => Math.max(v, 0));
        setData(data);
      })
      .catch(err => console.error(err));
  }, [api, window, seriesOptions]);

  if (data === undefined) return <div style={{ height: "610px" }}>Loading...</div>;

  const filteredData = relative ? [
    data.timestamps,
    ...selectedOpts.map((opt) => data[opt.value].map((v, i) => v / data.total[i] * 100)),
    data.ergusd,
  ] : [
    data.timestamps,
    ...selectedOpts.map((opt) => data[opt.value]),
    data.ergusd,
  ]

  const filteredSeries = selectedOpts.map((opt) => {
    const decimals = opt.toFixed ? opt.toFixed : toFixed;
    return {
      label: opt.label,
      stroke: opt.color,
      width: 1,
      value: (u, val) => val !== null ? Number(val.toFixed(decimals)).toLocaleString('en') + units : 'N/A',
    }
  });

  const options = {
    width: 0, // will be set by UPlot
    height: 400,
    scales: {
      x: {
        time: true,
      },
      y: {
        distr: logScale ? 3 : 1,
      },
    },
    axes: [
      {
        scale: 'x'
      },
      {
        label: yLabel,
        size: ySize,
        labelFont: "14px Arial",
        labelSize: 20,
        values: (u, vals) => vals.map(v => v !== null ? Number(v.toFixed(toFixed)).toLocaleString('en') + units : ''),
      },
      {
        label: "ERG / USD",
        side: 1,
        scale: "$",
        values: (u, vals) => vals.map(v => "$" + v.toFixed(2)),
        grid: { show: false },
        stroke: "rgba(122, 122, 122, 0.8)",
        ticks: { show: false },
        labelFont: "14px Arial",
        labelSize: 20,
      },
    ],
    series: [
      {},
      ...filteredSeries,
      {
        label: 'ERG/USD',
        stroke: "rgba(122, 122, 122, 0.6)",
        width: 1,
        scale: "$",
      },
    ]
  };

  return (
    <div id={`${id}-chart`} className="chart">
      <div className="chart-options">
        <Selector>
          <SelectorOption label='1m' active={window === '30d'} onClick={() => setWindow('30d')} />
          <SelectorOption label='3m' active={window === '90d'} onClick={() => setWindow('90d')} />
          <SelectorOption label='1y' active={window === '1y'} onClick={() => setWindow('1y')} />
          <SelectorOption label='all' active={window === 'all'} onClick={() => setWindow('all')} />
        </Selector>
        {seriesOptions.length < 2 ? null :
          <MultiSelect
            className="series-select"
            options={seriesOptions}
            value={selectedOpts}
            onChange={sortAndSetSelectedOpts}
            // labelledBy="Select"
            hasSelectAll={false}
            disableSearch={true}
            ClearIcon=''
          />
        }
        <Selector>
          <SelectorOption label='Absolute' active={!relative} onClick={() => setRelative(false)} />
          <SelectorOption label='Relative' active={relative} onClick={() => setRelative(true)} />
        </Selector>
        <Selector>
          <SelectorOption label='Linear' active={!logScale} onClick={() => setLogScale(false)} />
          <SelectorOption label='Log' active={logScale} onClick={() => setLogScale(true)} />
        </Selector>
      </div>
      {<UPlot options={options} data={filteredData} />}
    </div>
  );
}

export default SeriesChart;
