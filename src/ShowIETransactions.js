import React from "react";

// components
import { categoryIconMapping } from "./utils";

// MUI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

class ShowIETransactions extends React.Component {
  individualTransactions() {
    const sortedTransaction = this.props.transactions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });
    //console.log(sortedTransaction);

    const individualTransactions = sortedTransaction.map(
      ({ id, date, type, category, description, amount }, i) => {
        return (
          <Box id={id} key={id} onClick={this.props.onClick}>
            <Item
              sx={{
                width: 250,
              }}
              // onClick={this.props.onClick}
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
    //console.log("selectedTransactions: ", this.props.transactions);
    return (
      <div>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          {this.individualTransactions()}
        </Stack>
      </div>
    );
  }
}

export default ShowIETransactions;
