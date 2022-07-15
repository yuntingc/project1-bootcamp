import React from "react";
import "./App.css";

// MUI
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

class DateComponent extends React.Component {
  render() {
    return (
      <Box>
        <Box sx={{ my: 2 }}>
          <ButtonGroup
            variant="outlined"
            aria-label="text button group"
            onClick={this.props.handleYearChange}
            value={this.props.year}
          >
            <Button value={2021}>2021</Button>
            <Button value={2022}>2022</Button>
            <Button value={2023}>2023</Button>
          </ButtonGroup>
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
