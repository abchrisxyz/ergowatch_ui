import { Link } from "react-router-dom";
import BreadCrumbs from "../components/breadcrumbs";

const SigmaUSD = () => {
  return (
    <main>
      <h1>SigmaUSD</h1>
      <BreadCrumbs>
        <Link to="/">Home</Link>
        <Link to="/sigmausd">SigmaUSD</Link>
      </BreadCrumbs>
    </main>
  )
}

export default SigmaUSD;