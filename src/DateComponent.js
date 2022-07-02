import React from "react";

// MUI
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

class DateComponent extends React.Component {
  render() {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Box>
          <FormControl>
            <InputLabel id="demo-simple-select-label">Year</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={this.props.year}
              label="Year"
              onChange={this.props.handleYearChange}
            >
              <MenuItem value={2021}>2021</MenuItem>
              <MenuItem value={2022}>2022</MenuItem>
              <MenuItem value={2023}>2023</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Box>
          <ButtonGroup
            variant="text"
            aria-label="text button group"
            onClick={this.props.handleMonthChange}
            value={this.props.month}
          >
            <Button value="jan-dec">All Months</Button>
            <Button value="jan">Jan</Button>
            <Button value="feb">Feb</Button>
            <Button value="mar">Mar</Button>
            <Button value="apr">Apr</Button>
            <Button value="may">May</Button>
            <Button value="jun">Jun</Button>
            <Button value="jul">Jul</Button>
            <Button value="aug">Aug</Button>
            <Button value="sep">Sep</Button>
            <Button value="oct">Oct</Button>
            <Button value="nov">Nov</Button>
            <Button value="dec">Dec</Button>
          </ButtonGroup>
        </Box>
      </Box>
    );
  }
}

export default DateComponent;
