import { useState, useEffect } from "react";

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';

import { API2_ROOT } from "../../../config";

import './change-summary.css';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';


const ChangeSummary = ({ api, keys, headers, fields, labels, toFixed = 0, units = "", scale = 1, variant = undefined }) => {
  const [apiData, setApiData] = useState(undefined)
  const [data, setData] = useState(undefined)

  function formatDiff(rawValue, addSign = false) {
    if (rawValue === null) return 'N/A'
    const sign = Math.sign(rawValue);
    const signString = sign === 0 || addSign === false ? '' : sign === 1 ? '+ ' : '- ';
    const value = Number(Math.abs(rawValue).toFixed(toFixed))
    return signString + value.toLocaleString('en') + units
  }

  useEffect(() => {
    const qry = API2_ROOT + api;
    fetch(qry)
      .then(res => res.json())
      .then(res => setApiData(res))
      .catch(err => console.error(err));
  }, [api]);

  useEffect(() => {
    if (apiData === undefined) {
      return;
    }
    else if (variant === undefined) {
      // Map each row to its own label so we can pick the ones we need
      const d = Object.assign({}, ...apiData.map((r) => ({ [r.label]: r })));
      setData(d);
    }
    else {
      // Map each row to its own label so we can pick the ones we need
      const d = Object.assign({}, ...apiData[variant].map((r) => ({ [r.label]: r })));
      setData(d);
    }
  }, [apiData, variant]);

  if (data === undefined) return null;

  // for (let k of keys) {
  //   console.log(k);
  //   console.log(data[k]);
  // }

  return (
    <div className='change-summary'>
      <Table>
        <Thead>
          <Tr>
            {headers.map(h => <Th key={h}>{h}</Th>)}
          </Tr>
        </Thead>
        <Tbody>
          {keys.map((k) =>
            <Tr key={k}>
              <Td>{labels[k]}</Td>
              {fields.map((f, i) => <Td key={f}>{formatDiff(data[k][f] * scale, i !== 0)}</Td>)}
            </Tr>
          )}
        </Tbody>
      </Table>
    </div>
  );
}

export default ChangeSummary;
