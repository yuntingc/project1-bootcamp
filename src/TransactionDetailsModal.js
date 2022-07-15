import React from "react";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { categoryIconMapping } from "./utils";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

class TransactionDetailsModal extends React.Component {
  render() {
    const expenseTypeColor =
      this.props.currTransaction.type === "expense" ? "red" : "green";
    return (
      <Box
        sx={{
          width: 400,
          bgcolor: "white",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: 4,
        }}
      >
        <Grid>
          <Grid container spacing={2.5}>
            <Grid
              item
              xs={12}
              sx={{
                color: expenseTypeColor,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ display: "flex" }} m={1}>
                <div>
                  {categoryIconMapping[this.props.currTransaction.category]}
                </div>
                <div> Current Transaction </div>
              </Box>
              <div>
                {" "}
                <Button onClick={this.props.onEditClick}>
                  {" "}
                  <EditIcon />
                </Button>
                <Button onClick={this.props.onDeleteClick}>
                  {" "}
                  <DeleteIcon />
                </Button>
              </div>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Date"
                value={this.props.currTransaction.date}
                disabled
              ></TextField>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Description"
                value={this.props.currTransaction.description}
                disabled
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Amount"
                value={this.props.currTransaction.amount}
                disabled
              ></TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Payment Method"
                value={this.props.currTransaction.paymentMethod}
                disabled
              ></TextField>
            </Grid>
            {this.props.currTransaction.paymentMethod !== "cash" && (
              <Grid item xs={6}>
                <TextField
                  label="Card Number"
                  value={this.props.currTransaction.cardNum}
                  disabled
                ></TextField>
              </Grid>
            )}

            {this.props.currTransaction.paymentMethod !== "cash" && (
              <Grid item xs={6}>
                <TextField
                  label="Rewards Category"
                  value={this.props.currTransaction.rewardsCat}
                  disabled
                ></TextField>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Box>
    );
  }
}
export default TransactionDetailsModal;
