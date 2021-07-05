import './breadcrumbs.css';

function wrapItems(items) {
  return items.map((item, idx) => <li key={idx}>{item}</li>);
}

function addSeparators(items) {
  return items.reduce((acc, current, index) => {
    if (index < items.length - 1) {
      acc = acc.concat(current, <li className="bc-sep">&gt;</li>);
    } else {
      acc.push(current);
    }
    return acc;
  }, []);
}

const BreadCrumbs = ({ children }) => {
  return (
    <ol className="breadcrumbs">
      {addSeparators(wrapItems(children))}
    </ol>
  )
};

export default BreadCrumbs;