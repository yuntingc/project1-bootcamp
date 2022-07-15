import React from "react";

// chartjs
import { Bar } from "react-chartjs-2";
import ChartDataLabels from "chartjs-plugin-datalabels";

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

    return categoryArrByMonth;
  }

  StackedBarData() {
    let expenseArrByMonth = this.categoryArrByMonth("expense");
    let incomeArrByMonth = this.categoryArrByMonth("income");
    console.log(expenseArrByMonth);

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
      for (let j = 0; j < expenseCategories.length; j += 1) {
        if (expenseArrByMonth[i]) {
          if (expenseCategories[j] === "food") {
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
          if (expenseCategories[j] === "shopping") {
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

    const data = {
      labels,
      datasets: [
        {
          label: "Salary",
          data: salaryDataset,
          backgroundColor: "#52BE80",
          stack: "income",
        },
        {
          label: "Food",
          data: foodDataset,
          backgroundColor: "#FF6384",
          stack: "expense",
        },
        {
          label: "Entertainment",
          data: entertainmentDataset,
          backgroundColor: "#36A2EB",
          stack: "expense",
        },
        {
          label: "Shopping",
          data: shoppingDataset,
          backgroundColor: "#FFCE56",
          stack: "expense",
        },
        {
          label: "Sports",
          data: sportsDataset,
          backgroundColor: "#F39C12",
          stack: "expense",
        },
        {
          label: "Transport",
          data: transportDataset,
          backgroundColor: "#A569BD",
          stack: "expense",
        },
        {
          label: "Utilities",
          data: utilitiesDataset,
          backgroundColor: "#D4AC0D",
          stack: "expense",
        },
        {
          label: "Others",
          data: othersDataset,
          backgroundColor: "#B2BABB",
          stack: "expense",
        },
      ],
    };
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
          font: { size: 10 },
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
