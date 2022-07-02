import React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import { categoryIconMapping } from "./utils";
import Divider from "@mui/material/Divider";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
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
    const individualTransactions = this.getCashTransactions().map(
      ({ id, date, type, category, description, amount }, i) => {
        return (
          <Box id={id} key={id} onClick={this.props.onClick}>
            <Item>
              <Box
                sx={{ display: "flex", flexDirection: "column", width: 200 }}
              >
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
      <Box sx={{ justifyContent: "center" }}>
        <Item>
          <h3>Cash</h3>
          <Divider />
          <div>Expense: {this.totalSum()}</div>
        </Item>

        <Box sx={{ width: 200, m: 2 }}>
          <h5>Transactions</h5>
          <Stack
            spacing={2}
            sx={{ alignItems: "center", justifyContent: "center" }}
          >
            {this.individualTransactions()}
          </Stack>
        </Box>
      </Box>
    );
  }
}

export default CashTransactions;
