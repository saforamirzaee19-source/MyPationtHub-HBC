import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const barValueLabels = {
  id: "barValueLabels",
  afterDatasetsDraw(chart) {
    if (chart.config.type !== "bar") return;
    const { ctx } = chart;
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.font = "600 10px Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    chart.data.datasets.forEach((dataset, datasetIndex) => {
      const bars = chart.getDatasetMeta(datasetIndex).data;
      bars.forEach((bar, index) => {
        const value = dataset.data[index];
        if (value === null || value === undefined) return;
        const { x, y } = bar.getCenterPoint();
        ctx.fillText(String(value), x, y);
      });
    });
    ctx.restore();
  },
};

const baseOptions = {
  responsive: true,
  maintainAspectRatio: false,
  animation: { duration: 650 },
  interaction: { intersect: false, mode: "index" },
  plugins: {
    tooltip: { enabled: true, padding: 12, displayColors: true },
    legend: { position: "bottom", labels: { usePointStyle: true, padding: 16 } },
  },
};

export default function ReactCharts({
  type = "line",
  labels,
  datasets,
  options = {},
  className = "react-chart",
  ariaLabel = "Interactive chart",
}) {
  const data = { labels, datasets };
  const mergedOptions = {
    ...baseOptions,
    ...options,
    plugins: { ...baseOptions.plugins, ...options.plugins },
  };

  return (
    <div className={className} role="img" aria-label={ariaLabel}>
      <Chart
        type={type}
        data={data}
        options={mergedOptions}
        plugins={type === "bar" ? [barValueLabels] : []}
      />
    </div>
  );
}
