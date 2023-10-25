<template>
  <Radar
    :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"
  />
</template>

<script>
import { Radar } from "vue-chartjs/legacy";

import { Chart as ChartJS, Title, Tooltip, Legend, PointElement, LineElement, RadialLinearScale } from "chart.js";

ChartJS.register(Title, Tooltip, Legend, PointElement, RadialLinearScale, LineElement);

export default {
  name: "RadarChart",
  components: {
    Radar,
  },
  props: {
    chartId: {
      type: String,
      default: "radar-chart",
    },
    datasetIdKey: {
      type: String,
      default: "label",
    },
    width: {
      type: Number,
      default: 400,
    },
    height: {
      type: Number,
      default: 400,
    },
    cssClasses: {
      default: "",
      type: String,
    },
    styles: {
      type: Object,
      default: () => {},
    },
    plugins: {
      type: Array,
      default: () => [],
    },
    chartData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          r: {
            beginAtZero: true, // Ensure the scale starts at 0
          },
        },
        elements: {
          line: {
            borderWidth: 2, // Adjust the line width as needed
            borderCapStyle: "round", // Make the lines rounded
          },
        },
      },
    };
  },
};
</script>
