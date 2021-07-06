import './breadcrumbs.css';

function addSeparators(items) {
  return items.reduce((acc, item, idx) => {
    const wrapped_item = <li key={idx}>{item}</li>;
    if (idx < items.length - 1) {
      acc = acc.concat(wrapped_item, <li key={`sep-${idx}`} className="bc-sep">&gt;</li>);
    } else {
      acc.push(wrapped_item);
    }
    return acc;
  }, []);
}

const BreadCrumbs = ({ children }) => {
  return (
    <ol className="breadcrumbs">
      {addSeparators(children)}
    </ol>
  )
};

export default BreadCrumbs;