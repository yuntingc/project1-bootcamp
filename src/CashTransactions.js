import React from "react";
import { categoryIconMapping } from "./utils";

// MUI
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";

const BalanceCard = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fafafa",
  padding: theme.spacing(1),
  textAlign: "center",
  width: 200,
}));

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f6f6f6",
  padding: theme.spacing(1),
  textAlign: "center",
  width: 200,
}));

class CashTransactions extends React.Component {
  getCashTransactions() {
    let cashTransactions = [];

    for (let i = 0; i < this.props.transactions.length; i += 1) {
      if (
        this.props.transactions[i].paymentMethod === "cash" &&
        this.props.transactions[i].type === "expense"
      ) {
        cashTransactions.push(this.props.transactions[i]);
      }
    }

    return cashTransactions;
  }

  totalSum() {
    let transactionSum = 0;

    this.getCashTransactions().forEach(({ amount }) => {
      transactionSum += Number(amount);
    });

    return transactionSum;
  }

  individualTransactions() {
    const sortedTransaction = this.getCashTransactions().sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const individualTransactions = sortedTransaction.map(
      ({ id, date, type, category, description, amount }, i) => {
        return (
          <Box id={id} key={id} onClick={this.props.onClick}>
            <Item>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  width: 200,
                  userSelect: "none",
                }}
              >
                <Box sx={{ fontStyle: "italic" }}>{date}</Box>
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
                    <Box sx={{ mr: 1 }}>{categoryIconMapping[category]}</Box>
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
      <Box sx={{ m: 2 }}>
        <BalanceCard>
          <h3>Cash</h3>
          <Divider />
          <div>Expense: {this.totalSum()}</div>
        </BalanceCard>

        <h5>Transactions</h5>
        <Stack spacing={2}>{this.individualTransactions()}</Stack>
      </Box>
    );
  }
}

export default CashTransactions;
