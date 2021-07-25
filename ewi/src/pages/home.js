import './home.css';

const Home = () => {
  return (
    <main style={{ padding: 0 }}>
      <div className="banner">
        <div className="logo">
          Ergo Watch<span>beta</span>
        </div>
        <div className="description">
          Ergo blockchain stats and monitoring
        </div>
      </div>
      <div className="menu">
        <a className="item" href="/emission"><h2>Emission</h2></a>
        <a className="item" href="/oracle-pools"><h2>Oracle Pools</h2></a>
        <a className="item" href="/sigmausd"><h2>SigmaUSD</h2></a>
      </div>
    </main>
  );
}

export default Home;