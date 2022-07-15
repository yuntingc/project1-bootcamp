import React from "react";
import { categoryIconMapping } from "./utils";

// MUI
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#f6f6f6",
  padding: theme.spacing(1),
  textAlign: "center",
}));

class ShowIETransactions extends React.Component {
  individualTransactions() {
    const sortedTransaction = this.props.transactions.sort((a, b) => {
      return new Date(b.date) - new Date(a.date);
    });

    const individualTransactions = sortedTransaction.map(
      ({ id, date, type, category, description, amount }, i) => {
        return (
          <Box id={id} key={id} onClick={this.props.onClick}>
            <Item
              sx={{
                width: 250,
                userSelect: "none",
              }}
            >
              <Box sx={{ display: "flex", flexDirection: "column" }}>
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
      <Box>
        <Stack spacing={2} sx={{ alignItems: "center" }}>
          {this.individualTransactions()}
        </Stack>
      </Box>
    );
  }
}

export default ShowIETransactions;
