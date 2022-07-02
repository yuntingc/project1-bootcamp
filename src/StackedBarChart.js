import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

class StackedBarChart extends React.Component {
  categoryArrByMonth(selectedType) {
    let categoryArrByMonth = {};
    this.props.transactions.forEach(({ type, category, amount, date }) => {
      const month = new Date(date).getMonth() + 1;

      if (type === selectedType) {
        if (categoryArrByMonth[month]) {
          if (categoryArrByMonth[month][category]) {
            categoryArrByMonth[month][category] += Number(amount);
          } else {
            categoryArrByMonth[month][category] = Number(amount);
          }
        } else {
          categoryArrByMonth[month] = {};
          categoryArrByMonth[month][category] = Number(amount);
        }
      }
    });

    //console.log(categoryArrByMonth);
    return categoryArrByMonth;
  }

  StackedBarData() {
    let expenseArrByMonth = this.categoryArrByMonth("expense");
    let incomeArrByMonth = this.categoryArrByMonth("income");

    //console.log(incomeArrByMonth);

    const labels = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    // categories available: food, entertainment, shopping, sports, transport, utilities, others, salary
    let foodDataset = [];
    let entertainmentDataset = [];
    let shoppingDataset = [];
    let sportsDataset = [];
    let transportDataset = [];
    let utilitiesDataset = [];
    let othersDataset = [];
    let salaryDataset = [];

    for (let i = 1; i <= 12; i += 1) {
      if (incomeArrByMonth[i]) {
        salaryDataset.push(incomeArrByMonth[i]["salary"]);
      } else {
        salaryDataset.push(0);
      }
    }

    //console.log(salaryDataset);

    let expenseCategories = [
      "food",
      "entertainment",
      "shopping",
      "sports",
      "transport",
      "utilities",
      "others",
    ];

    for (let i = 1; i <= 12; i += 1) {
      for (let j = 0; j < expenseCategories.length - 1; j += 1) {
        if (expenseArrByMonth[i]) {
          if (expenseCategories[j] === "food") {
            //console.log(expenseArrByMonth[i][expenseCategories[j]]);
            foodDataset.push(expenseArrByMonth[i][expenseCategories[j]]);
          }
          if (expenseCategories[j] === "entertainment") {
            entertainmentDataset.push(
              expenseArrByMonth[i][expenseCategories[j]]
            );
          }
          if (expenseCategories[j] === "shopping") {
            shoppingDataset.push(expenseArrByMonth[i][expenseCategories[j]]);
          }
          if (expenseCategories[j] === "sports") {
            sportsDataset.push(expenseArrByMonth[i][expenseCategories[j]]);
          }
          if (expenseCategories[j] === "transport") {
            transportDataset.push(expenseArrByMonth[i][expenseCategories[j]]);
          }
          if (expenseCategories[j] === "utilities") {
            utilitiesDataset.push(expenseArrByMonth[i][expenseCategories[j]]);
          }
          if (expenseCategories[j] === "others") {
            othersDataset.push(expenseArrByMonth[i][expenseCategories[j]]);
          }
        } else {
          if (expenseCategories[j] === "food") {
            foodDataset.push(0);
          }
          if (expenseCategories[j] === "entertainment") {
            entertainmentDataset.push(0);
          }
          if (expenseCategories[j] === "shopp[jg") {
            shoppingDataset.push(0);
          }
          if (expenseCategories[j] === "sports") {
            sportsDataset.push(0);
          }
          if (expenseCategories[j] === "transport") {
            transportDataset.push(0);
          }
          if (expenseCategories[j] === "utilities") {
            utilitiesDataset.push(0);
          }
          if (expenseCategories[j] === "others") {
            othersDataset.push(0);
          }
        }
      }
    }

    console.log(foodDataset);

    // each Data set is one category
    // need to map data by category by months

    //need to generate dataset for each category and stack
    // label: cateogory, data: by month

    // [ ]
    // label: cat name
    // data: [ 1 num for each month]
    // background color: ...
    // stack: income or expense

    const data = {
      labels,
      datasets: [
        {
          label: "Salary",
          data: salaryDataset,
          backgroundColor: "rgb(255, 99, 132)",
          stack: "income",
        },
        {
          label: "Food",
          data: foodDataset,
          backgroundColor: "rgb(75, 192, 192)",
          stack: "expense",
        },
        {
          label: "Entertainment",
          data: entertainmentDataset,
          backgroundColor: "rgb(53, 162, 235)",
          stack: "expense",
        },
        {
          label: "Shopping",
          data: shoppingDataset,
          backgroundColor: "rgb(53, 162, 235)",
          stack: "expense",
        },
        {
          label: "Sports",
          data: sportsDataset,
          backgroundColor: "rgb(84,95,129)",
          stack: "expense",
        },
        {
          label: "Transport",
          data: transportDataset,
          backgroundColor: "rgb(0,5,159)",
          stack: "expense",
        },
        {
          label: "Others",
          data: othersDataset,
          backgroundColor: "rgb(84, 100, 229)",
          stack: "expense",
        },
        {
          label: "Utilities",
          data: utilitiesDataset,
          backgroundColor: "rgb(53, 162, 235)",
          stack: "expense",
        },
      ],
    };
    console.log(data);
    return data;
  }

  StackedBarOptions() {
    const options = {
      plugins: {
        title: {
          display: true,
          text: "Monthly Income/Expense",
        },
        datalabels: {
          display: true,
          color: "white",
        },
      },
      responsive: true,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    return options;
  }

  render() {
    return (
      <Bar
        data={this.StackedBarData()}
        options={this.StackedBarOptions()}
        plugins={[ChartDataLabels]}
      />
    );
  }
}

export default StackedBarChart;
