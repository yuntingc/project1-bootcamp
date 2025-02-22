import React from "react";
import "chart.js/auto";

// chartjs
import { Doughnut } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

class DonutChart extends React.Component {
  categoryArr() {
    let categoryArr = {};
    this.props.transactions.forEach(({ type, category, amount }) => {
      if (type === this.props.type) {
        if (categoryArr[category]) {
          categoryArr[category] += Number(amount);
        } else {
          categoryArr[category] = Number(amount);
        }
      }
    });

    return categoryArr;
  }

  totalSum() {
    let transactions = this.categoryArr();
    let totalSum = 0;
    Object.values(transactions).forEach((value) => (totalSum += Number(value)));
    return totalSum;
  }

  donutData() {
    let transactions = this.categoryArr();
    let donutLabel = [];
    let donutData = [];
    let donutLegend = [];
    Object.entries(transactions).forEach(([key, value]) => {
      donutLabel.push(key);
      donutData.push(value);
      donutLegend.push(key.concat(" " + value));
    });

    const data = {
      labels: donutLegend,
      datasets: [
        {
          data: donutData,
          backgroundColor: [
            "#52BE80",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#F39C12",
            "#A569BD",
            "#B2BABB",
            "#D4AC0D",
          ],
          hoverBackgroundColor: [
            "#52BE80",
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#F39C12",

            "#A569BD",
            "#B2BABB",
            "#D4AC0D",
          ],
          borderWidth: 2,
        },
      ],
    };

    return data;
  }

  donutOptions() {
    const options = {
      plugins: {
        legend: { display: true, position: "right", align: "center" },
        datalabels: {
          display: true,
          color: "white",
          formatter: (val) => `${Math.round((val / this.totalSum()) * 100)}%`,
          font: {
            size: 10,
          },
        },
        tooltip: { enabled: false },
      },
    };
    return options;
  }

  render() {
    return (
      <div>
        {this.totalSum() ? (
          <Doughnut
            data={this.donutData()}
            options={this.donutOptions()}
            plugins={[ChartDataLabels]}
          />
        ) : (
          ""
        )}
      </div>
    );
  }
}

export default DonutChart;
