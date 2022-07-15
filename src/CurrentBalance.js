import React from "react";

// MUI
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fafafa",
  padding: theme.spacing(1),
  textAlign: "center",
  width: 200,
}));

class CurrentBalance extends React.Component {
  incomeSum() {
    let incomeArr = [];

    this.props.transactions.forEach(({ type, amount }) => {
      if (type === "income") {
        incomeArr.push(Number(amount));
      }
    });

    let incomeSum = incomeArr.reduce((prev, curr) => prev + curr, 0);
    return incomeSum;
  }

  expenseSum() {
    let expenseArr = [];
    this.props.transactions.forEach(({ type, amount }) => {
      if (type === "expense") {
        expenseArr.push(Number(amount));
      }
    });

    let expenseSum = expenseArr.reduce((prev, curr) => prev + curr, 0);
    return expenseSum;
  }

  balanceSum() {
    let balanceSum = this.incomeSum() - this.expenseSum();
    return balanceSum;
  }

  render() {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          m: 2,
        }}
      >
        <Item>
          <h3>Income</h3>
          <Divider />
          <div>{this.incomeSum()}</div>
        </Item>
        <Item>
          <h3>Expense</h3>
          <Divider />
          <div>{this.expenseSum()}</div>
        </Item>
        <Item>
          <h3>Balance</h3>
          <Divider />
          <div>{this.balanceSum()}</div>
        </Item>
      </Box>
    );
  }
}

export default CurrentBalance;
