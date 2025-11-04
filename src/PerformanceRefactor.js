import React, { useState, useEffect, useMemo, useCallback } from 'react';

const Chart = React.memo(function Chart({ data }) {
  const points = useMemo(() =>   data.map((d) => ({
    x: d.timestamp,
    y: d.value * Math.random(),
  })), [data])


  const total = useMemo(() => points.reduce((sum, p) => sum + p.y, 0), [points]);

  return (
    <div>
      <h3>Chart</h3>
      <p>Total: {total}</p>
      <svg width="400" height="100">
        <polyline
          fill="none"
          stroke="blue"
          strokeWidth="2"
          points={points.map((p) => `${p.x % 400},${100 - p.y % 100}`).join(' ')}
        />
      </svg>
    </div>
  );
})

function Dashboard() {

    const updateCharts = useCallback(() => {
      setCharts((prev) =>
        prev.map((chart) => ({
          ...chart,
          data: chart.data.map((d) => ({
            ...d,
            value: Math.random() * 100,
          })),
        }))
      );
    }, [])
    
  const [charts, setCharts] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      data: Array.from({ length: 100 }, (_, j) => ({
        timestamp: j,
        value: Math.random() * 100,
      })),
    }))
  );

  useEffect(() => {
    const interval = setInterval(updateCharts, 1000);
    // console.log(charts)
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {charts && charts.map((chart) => (
        <Chart key={chart.id} data={chart.data} />
      ))}
    </div>
  );
}

export default Dashboard;
