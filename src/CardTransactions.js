import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import LinearProgressWithLabel from "@mui/material/LinearProgress";
import { categoryIconMapping } from "./utils";
import Divider from "@mui/material/Divider";
import { getTransactions } from "./utils.js";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class CardTransactions extends React.Component {
  // get transactions for type=expense
  getCardTransactions() {
    let cardTransactions = [];

    for (let i = 0; i < this.props.transactions.length; i += 1) {
      if (
        this.props.transactions[i].paymentMethod === "card" &&
        this.props.transactions[i].type === "expense" &&
        this.props.selectedCard === this.props.transactions[i].cardNum
      ) {
        cardTransactions.push(this.props.transactions[i]);
      }
    }

    return cardTransactions;
  }

  // get total expense for card
  totalSum(transactions) {
    let transactionSum = 0;

    transactions.forEach(({ amount }) => {
      transactionSum += Number(amount);
    });

    return transactionSum;
  }

  // get monthly expense transactions
  getMonthlyCardTransactions(month) {
    let monthlyCardTransactions = getTransactions(
      this.getCardTransactions(),
      this.props.year,
      month
    );

    return monthlyCardTransactions;
  }

  // return category : amount object, depending on transaction input period
  monthlyRewardsCatObj(transactions) {
    let rewardsCatObj = {};

    let rewardsCategories = [];
    if (this.props.selectedCard === "1111") {
      //console.log("select 1111");
      rewardsCategories = ["paywave", "online", "green", "others", "na"];
    } else {
      //console.log("select 2222");
      rewardsCategories = ["all", "na"];
    }

    transactions.forEach(({ id, description, rewardsCat, amount }) => {
      for (let i = 0; i < rewardsCategories.length - 1; i += 1) {
        if (rewardsCatObj[rewardsCategories[i]]) {
          if (rewardsCat === rewardsCategories[i]) {
            rewardsCatObj[rewardsCat] += Number(amount);
          }
        } else {
          if (rewardsCat === rewardsCategories[i]) {
            rewardsCatObj[rewardsCategories[i]] = Number(amount);
          } else {
            rewardsCatObj[rewardsCategories[i]] = 0;
          }
        }
      }
    });

    return rewardsCatObj;
  }

  // calculate category cashback for selected month
  // returns an object value
  // THIS GIVES NAN when summing up
  getMonthlyCategoryCashback(category, month) {
    // get monthly trasactions

    let monthlyExpensesTransactions = this.getMonthlyCardTransactions(month);

    // check total sum for that month
    let totalSum = this.totalSum(monthlyExpensesTransactions);

    // get monthlyCatObj
    let monthlyRewardsCatObj = this.monthlyRewardsCatObj(
      monthlyExpensesTransactions
    );

    let categoryCashback = {};

    if (typeof monthlyRewardsCatObj[category] === "undefined") {
      //console.log(monthlyRewardsCatObj[category], category);
      monthlyRewardsCatObj[category] = 0;
    }

    if (this.props.selectedCard === "1111") {
      if (totalSum >= 600) {
        if (category === "others") {
          categoryCashback[category] =
            Number(monthlyRewardsCatObj[category]) * 0.003;
        } else {
          categoryCashback[category] = Math.min(
            20,
            Number(monthlyRewardsCatObj[category]) * 0.05
          );
        }
      } else {
        categoryCashback[category] =
          Number(monthlyRewardsCatObj[category]) * 0.003;
      }
    }

    // for card 2222
    if (this.props.selectedCard === "2222") {
      categoryCashback[category] =
        Number(monthlyRewardsCatObj[category]) * 0.017;
    }

    // console.log("categoryCashback", categoryCashback[category]);
    return categoryCashback[category];
  }

  getFullYearCategoryCashback(category) {
    let month = [
      "jan",
      "feb",
      "mar",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];

    let fullYearCategoryCashback = {};

    for (let i = 0; i < month.length; i += 1) {
      if (fullYearCategoryCashback[category]) {
        fullYearCategoryCashback[category] += this.getMonthlyCategoryCashback(
          category,
          month[i]
        );
      } else {
        fullYearCategoryCashback[category] = this.getMonthlyCategoryCashback(
          category,
          month[i]
        );
      }
    }
    return Math.max(0, fullYearCategoryCashback[category]);
  }

  // calculate depending on cashback period == indiv month or full year i.e. monthly vs yearly
  totalCashback(cashbackPeriod) {
    let totalCashback = 0;

    const rewardCatTypes1111 = ["paywave", "online", "green", "others"];
    const rewardCatTypes2222 = ["all"];

    if (this.props.selectedCard === "1111") {
      if (cashbackPeriod !== "jan-dec") {
        for (let i = 0; i < rewardCatTypes1111.length; i += 1) {
          totalCashback += this.getMonthlyCategoryCashback(
            rewardCatTypes1111[i],
            this.props.month
          );
        }
      } else {
        for (let i = 0; i < rewardCatTypes1111.length; i += 1) {
          totalCashback += this.getFullYearCategoryCashback(
            rewardCatTypes1111[i],
            this.props.month
          );
        }
      }
    }

    if (this.props.selectedCard === "2222") {
      if (cashbackPeriod !== "jan-dec") {
        for (let i = 0; i < rewardCatTypes2222.length; i += 1) {
          totalCashback += this.getMonthlyCategoryCashback(
            rewardCatTypes2222[i],
            this.props.month
          );
        }
      } else {
        for (let i = 0; i < rewardCatTypes2222.length; i += 1) {
          totalCashback += this.getFullYearCategoryCashback(
            rewardCatTypes2222[i],
            this.props.month
          );
        }
      }
    }

    return totalCashback;
  }

  rewardsCatSum() {
    const rewardsCatSum = Object.entries(
      this.monthlyRewardsCatObj(this.getCardTransactions())
    ).map(([key, value], i) => {
      return (
        <div key={i}>
          <Stack spacing={0.5}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ fontSize: 10 }}>{key.toUpperCase()}</Box>
              <Box sx={{ display: "flex", alignItems: "baseline" }}>
                <Box>{value} </Box>
                <Box sx={{ fontSize: 7 }}>
                  {this.props.month !== "jan-dec" &&
                  this.props.selectedCard === "1111" &&
                  key !== "others"
                    ? " / 400"
                    : ""}
                </Box>
              </Box>
            </Box>
            {this.props.month !== "jan-dec" &&
              key !== "others" &&
              key !== "all" && (
                <Box sx={{ width: "100%" }}>
                  <LinearProgressWithLabel
                    variant="determinate"
                    value={value > 400 ? 100 : (value / 400) * 100}
                  />
                </Box>
              )}

            <Box
              sx={{ fontSize: 10, display: "flex", alignItems: "flex-start" }}
            >
              Cashback:{" "}
              {this.props.month !== "jan-dec"
                ? Number(
                    this.getMonthlyCategoryCashback(key, this.props.month)
                  ).toFixed(2)
                : Number(this.getFullYearCategoryCashback(key)).toFixed(2)}
            </Box>
            <Divider />
          </Stack>
        </div>
      );
    });
    //console.log("rewardsCatSum:", rewardsCatSum);
    return rewardsCatSum;
  }

  individualTransactions() {
    const individualTransactions = this.getCardTransactions().map(
      ({ id, date, type, category, description, amount }, i) => {
        return (
          <Box id={id} key={id} onClick={this.props.onClick}>
            <Item
              sx={{
                width: "100%",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <Box>{date}</Box>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-around",
                    }}
                  >
                    <Box>{categoryIconMapping[category]}</Box>
                    <Box>{description}</Box>
                  </Box>
                  <Box>{type === "expense" ? "- " + amount : amount}</Box>
                </Box>
              </Box>
            </Item>
          </Box>
        );
      }
    );
    return individualTransactions;
  }

  render() {
    return (
      <Box>
        <Item>
          <h3>
            {this.props.cardType.toUpperCase()} {this.props.selectedCard}
          </h3>
          <Divider />
          <div>Expense: {this.totalSum(this.getCardTransactions())}</div>
          <div>Cashback: {this.totalCashback(this.props.month).toFixed(2)}</div>
        </Item>

        {this.getCardTransactions().length >= 1 && (
          <Stack spacing={1} sx={{ my: 1 }}>
            <Item>{this.rewardsCatSum()}</Item>
          </Stack>
        )}
        <h5>Transactions</h5>
        <Stack spacing={2}>{this.individualTransactions()}</Stack>
      </Box>
    );
  }
}

export default CardTransactions;
