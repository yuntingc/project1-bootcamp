import React from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import InputLabel from "@mui/material/InputLabel";
import NativeSelect from "@mui/material/NativeSelect";
import Box from "@mui/material/Box";
import { v4 as uuidv4 } from "uuid";

import { getTransactions, todayDate } from "./utils.js";

class NewTransaction extends React.Component {
  render() {
    console.log(this.props.value.id);
    return (
      <FormControl onSubmit={this.props.onSubmit}>
        {/* <TextField name="id" value={this.props.value.id} /> */}
        <Grid container spacing={2.5}>
          <Grid item xs={12}>
            <Box sx={{ mt: 1 }}>
              <Stack component="form" noValidate spacing={3}>
                <TextField
                  id="date"
                  label="Date"
                  type="date"
                  name="date"
                  onChange={this.props.onChange}
                  value={this.props.date}
                  defaultValue={todayDate()}
                  sx={{ width: 220 }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
            </Box>
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Type:</FormLabel>
            <RadioGroup
              row
              onChange={this.props.onChange}
              name="type"
              defaultValue="expense"
            >
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
              />
              <FormControlLabel
                value="income"
                control={<Radio />}
                label="Income"
              />
            </RadioGroup>
          </Grid>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <InputLabel variant="standard" htmlFor="uncontrolled-native">
                Category
              </InputLabel>
              <NativeSelect
                defaultValue="others"
                inputProps={{
                  name: "category",
                }}
                onChange={this.props.onChange}
              >
                <option value="food">Food</option>
                <option value="entertainment">Entertainment</option>
                <option value="shopping">Shopping</option>
                <option value="sports">Sports</option>
                <option value="transport">Transport</option>
                <option value="utilities">Utilities</option>
                <option value="others">Others</option>
                <option value="salary">Salary</option>
              </NativeSelect>
            </FormControl>
          </Grid>
          <Grid item xs={8}>
            <TextField
              required
              fullWidth
              label="Description"
              name="description"
              onChange={this.props.onChange}
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              required
              label="Amount"
              name="amount"
              onChange={this.props.onChange}
            />
          </Grid>
          <Grid item xs={12}>
            <FormLabel>Payment Method: </FormLabel>
            <RadioGroup
              row
              name="paymentMethod"
              onChange={this.props.onChange}
              defaultValue="cash"
            >
              <FormControlLabel value="cash" control={<Radio />} label="Cash" />
              <FormControlLabel value="card" control={<Radio />} label="Card" />
            </RadioGroup>
          </Grid>
          <Grid item xs={8}>
            {this.props.value.paymentMethod === "card" && (
              <div>
                <FormControl fullWidth>
                  <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    {" "}
                    Card Number
                  </InputLabel>
                  <NativeSelect
                    inputProps={{
                      name: "cardNum",
                    }}
                    defaultValue="1111"
                    onChange={this.props.onChange}
                  >
                    <option value="1111">xxxx xxxx xxxx 1111</option>
                    <option value="2222">xxxx xxxx xxxx 2222</option>
                  </NativeSelect>
                </FormControl>
              </div>
            )}
          </Grid>
          <Grid item xs={4}>
            {this.props.value.paymentMethod === "card" &&
              this.props.value.cardNum === "1111" && (
                <div>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      {" "}
                      Rewards Category
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        name: "rewardsCat",
                      }}
                      defaultValue="paywave"
                      onChange={this.props.onChange}
                    >
                      <option value="paywave">Paywave</option>
                      <option value="online">Online</option>
                      <option value="green">Green</option>
                      <option value="others">Others</option>
                      <option value="na">Not Applicable</option>
                    </NativeSelect>
                  </FormControl>
                </div>
              )}
            {this.props.value.paymentMethod === "card" &&
              this.props.value.cardNum === "2222" && (
                <div>
                  <FormControl fullWidth>
                    <InputLabel
                      variant="standard"
                      htmlFor="uncontrolled-native"
                    >
                      {" "}
                      Rewards Category
                    </InputLabel>
                    <NativeSelect
                      inputProps={{
                        name: "rewardsCat",
                      }}
                      defaultValue="all"
                      onChange={this.props.onChange}
                    >
                      <option value="all">All</option>
                      <option value="na">Not Applicable</option>
                    </NativeSelect>
                  </FormControl>
                </div>
              )}
          </Grid>
        </Grid>
      </FormControl>
    );
  }
}

export default NewTransaction;
