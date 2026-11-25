const points = [
  64, 58, 61, 52, 55, 48, 50, 44, 47, 40, 43, 36, 39, 33, 35, 30, 33, 27, 30, 25, 28, 24, 27, 22,
  25, 21, 24, 20, 23, 19, 22, 18, 21, 18, 20, 17, 19, 16, 18, 16,
];

const linePath = points
  .map((value, index) => `${index === 0 ? 'M' : 'L'}${((index / (points.length - 1)) * 300).toFixed(1)} ${value}`)
  .join(' ');

export default function ProductWindow() {
  return (
    <div className="product-window" aria-label="Sample Bryn operations dashboard">
      <div className="window-bar">
        <i className="window-dot" aria-hidden="true" />
        <i className="window-dot" aria-hidden="true" />
        <i className="window-dot" aria-hidden="true" />
        <span className="window-url">app.bryn.com / operations</span>
      </div>
      <div className="window-body">
        <div className="window-sidebar" aria-hidden="true">
          <span className="is-active">Overview</span>
          <span>Workflows</span>
          <span>Deployments</span>
          <span>Access policies</span>
          <span>Audit log</span>
          <span>Regions</span>
        </div>
        <div className="window-main">
          <div className="kpi-grid">
            <div className="kpi">
              <span>Requests / s</span>
              <b>48,210</b>
            </div>
            <div className="kpi">
              <span>P95 latency</span>
              <b>11.8ms</b>
            </div>
            <div className="kpi">
              <span>Active workflows</span>
              <b>1,284</b>
            </div>
            <div className="kpi">
              <span>Error rate</span>
              <b>0.002%</b>
            </div>
          </div>
          <div className="chart">
            <div className="chart-head">
              <span>Throughput · sample</span>
              <span>last 60s</span>
            </div>
            <svg viewBox="0 0 300 100" preserveAspectRatio="none" role="img" aria-label="Sample throughput chart">
              <path className="area" d={`${linePath} L300 100 L0 100 Z`} />
              <path className="line" d={linePath} />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
