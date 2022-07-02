import React from "react";
import logo from "./logo.png";
import "./App.css";
import { v4 as uuidv4 } from "uuid";

// components
import { getKey, todayDate, monthMapping, getTransactions } from "./utils.js";
import TestTransactions from "./TestTransactions.js";
import DateComponent from "./DateComponent.js";
import ShowIETransactions from "./ShowIETransactions.js";
import TransactionDetailsModal from "./TransactionDetailsModal.js";
import EditTransaction from "./EditTransaction.js";
import NewTransaction from "./NewTransaction.js";
import CurrentBalance from "./CurrentBalance.js";
import DonutChart from "./DonutChart.js";
import StackedBarChart from "./StackedBarChart.js";
import CashTransactions from "./CashTransactions";
import CardTransactions from "./CardTransactions";

// MUI
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedYear: "",
      selectedMonth: "",
      selectedTransactions: [],
      selectedView: "",
      allTransactions: [],
      currTransaction: {
        id: "",
        date: "",
        type: "",
        category: "",
        description: "",
        amount: "",
        paymentMethod: "",
        cardNum: null,
        rewardsCat: "",
      },
      transactionDetailsModalOpen: false,
      editModalOpen: false,
      newTransactionModalOpen: false,
    };

    this.handleYearChange = this.handleYearChange.bind(this);
    this.handleMonthChange = this.handleMonthChange.bind(this);
    this.handleRenderSelectedTransactions =
      this.handleRenderSelectedTransactions.bind(this);
    this.handleTransactionDetailsModalOpen =
      this.handleTransactionDetailsModalOpen.bind(this);
    this.handleTransactionDetailsModalClose =
      this.handleTransactionDetailsModalClose.bind(this);
    this.handleEditModalOpen = this.handleEditModalOpen.bind(this);
    this.handleEditModalClose = this.handleEditModalClose.bind(this);
    this.handleDeleteTransaction = this.handleDeleteTransaction.bind(this);
    this.handleTransactionChange = this.handleTransactionChange.bind(this);
    this.handleEditFormSubmit = this.handleEditFormSubmit.bind(this);
    this.handleNewTransactionModalOpen =
      this.handleNewTransactionModalOpen.bind(this);
    this.handleNewTransactionModalClose =
      this.handleNewTransactionModalClose.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleViewChange = this.handleViewChange.bind(this);
  }

  componentDidMount() {
    const currYear = new Date(todayDate()).getFullYear();
    const currMonth = getKey(
      monthMapping,
      new Date(todayDate()).getMonth() + 1
    );

    this.setState({
      selectedYear: currYear,
      selectedMonth: currMonth,
      selectedView: "income/expense",
      allTransactions: TestTransactions,
    });

    this.handleRenderSelectedTransactions();
  }

  handleYearChange(e) {
    this.setState({ selectedYear: e.target.value });
    this.handleRenderSelectedTransactions();
  }

  handleMonthChange(e) {
    this.setState({ selectedMonth: e.target.value });
    this.handleRenderSelectedTransactions();
  }

  handleRenderSelectedTransactions() {
    console.log("render transaction");

    this.setState((prev) => ({
      selectedTransactions: getTransactions(
        prev.allTransactions,
        prev.selectedYear,
        prev.selectedMonth
      ),
    }));
  }

  handleTransactionDetailsModalOpen(e) {
    console.log("viewing indiv transactions");
    this.setState({ transactionDetailsModalOpen: true });

    const clickedTransactionId =
      e.target.parentElement.parentElement.parentElement.id;
    console.log(clickedTransactionId);
    // add in modal details to display
    for (let i = 0; i < this.state.selectedTransactions.length; i += 1) {
      //console.log(this.state.selectedTransactions[i]);
      if (this.state.selectedTransactions[i].id === clickedTransactionId) {
        const transactionObj = this.state.selectedTransactions[i];
        //console.log(transactionObj.id);
        this.setState({
          currTransaction: {
            indivTransactionModalOpen: true,
            id: transactionObj.id,
            date: transactionObj.date,
            type: transactionObj.type,
            category: transactionObj.category,
            description: transactionObj.description,
            amount: transactionObj.amount,
            paymentMethod: transactionObj.paymentMethod,
            cardNum: transactionObj.cardNum,
            rewardsCat: transactionObj.rewardsCat,
          },
        });
      }
    }
  }

  handleTransactionDetailsModalClose() {
    console.log("closing indiv transactions view");
    this.setState({ transactionDetailsModalOpen: false });
  }

  handleEditModalOpen() {
    console.log("in edit modal state");
    console.log(this.state.allTransactions);
    console.log(this.state.currTransaction);
    this.handleTransactionDetailsModalClose();
    this.setState({ editModalOpen: true });
  }

  handleEditModalClose() {
    console.log("closing edit modal");
    this.setState({ editModalOpen: false });
  }

  handleDeleteTransaction() {
    console.log("deleting transaction...");
    this.handleTransactionDetailsModalClose();
    const remainingTransactions = [];
    this.state.allTransactions.forEach((item) => {
      if (item.id != this.state.currTransaction.id) {
        remainingTransactions.push(item);
      }
    });

    //console.log("remaining", remainingTransactions);

    this.setState({
      allTransactions: remainingTransactions,
      currTransaction: {
        id: "",
        date: "",
        type: "",
        category: "",
        description: "",
        amount: "",
        paymentMethod: "",
        cardNum: null,
        rewardsCat: "",
      },
    });
    this.handleRenderSelectedTransactions();
    this.handleEditModalClose();
  }

  handleTransactionChange(e) {
    //https://stackoverflow.com/questions/47129840/how-to-access-form-inputs-in-react-js-with-nested-object
    //const { transaction } = this.state.currTransaction;
    // can have different change handles for validation
    const name = e.target.name;
    const value = e.target.value;

    // if card is clicked
    // default cardNum is 1111 and rewardsCat is paywave
    if (value === "card") {
      this.setState({
        currTransaction: {
          ...this.state.currTransaction,
          paymentMethod: "card",
          cardNum: "1111",
          rewardsCat: "paywave",
        },
      });
      // if cash is clicked
      // default cardNum is null and rewardsCat is ""
    } else if (value === "cash") {
      this.setState({
        currTransaction: {
          ...this.state.currTransaction,
          paymentMethod: "cash",
          cardNum: null,
          rewardsCat: "",
        },
      });
      // if cardNum 2222 is clicked
      // default rewardsCat is all
    } else if (value === "2222") {
      this.setState({
        currTransaction: {
          ...this.state.currTransaction,
          cardNum: "2222",
          rewardsCat: "all",
        },
      });
      // if cardNum 1111 is clicked
      // default rewardsCat is paywave
    } else if (value === "1111") {
      this.setState({
        currTransaction: {
          ...this.state.currTransaction,
          cardNum: "1111",
          rewardsCat: "paywave",
        },
      });
      // all others, function as per normal
    } else {
      this.setState({
        currTransaction: { ...this.state.currTransaction, [name]: value },
      });
    }
  }

  handleEditFormSubmit(e) {
    // this.handleTransactionDetailsModalClose();
    console.log(this.state.currTransaction.id);
    const remainingTransactions = [];
    console.log("yass");

    this.state.allTransactions.forEach((item) => {
      console.log(item);
      if (item.id != this.state.currTransaction.id) {
        remainingTransactions.push(item);
      }
    });

    console.log(remainingTransactions);
    this.setState({
      allTransactions: remainingTransactions,
    });

    this.setState((prev) => ({
      allTransactions: [...prev.allTransactions, prev.currTransaction],
      currTransaction: {
        id: "",
        date: "",
        type: "",
        category: "",
        description: "",
        amount: "",
        paymentMethod: "",
        cardNum: null,
        rewardsCat: "",
      },
    }));
    this.handleRenderSelectedTransactions();
    this.handleEditModalClose();
  }

  handleNewTransactionModalOpen() {
    console.log("new transaction modal open");
    this.setState({
      newTransactionModalOpen: true,
      currTransaction: {
        id: uuidv4(),
        date: todayDate(),
        type: "expense",
        category: "others",
        description: "",
        amount: "",
        paymentMethod: "cash",
        cardNum: null,
        rewardsCat: "",
      },
    });
  }

  handleNewTransactionModalClose() {
    console.log("new transaction modal close");
    this.setState({ newTransactionModalOpen: false });
  }

  handleFormSubmit() {
    this.setState((prev) => ({
      allTransactions: [...prev.allTransactions, prev.currTransaction],
      currTransaction: {
        id: "",
        date: "",
        type: "",
        category: "",
        description: "",
        amount: "",
        paymentMethod: "",
        cardNum: null,
        rewardsCat: "",
      },
    }));
    this.handleRenderSelectedTransactions();
    this.handleNewTransactionModalClose();
  }

  handleViewChange(e) {
    this.setState({ selectedView: e.target.value });
  }

  render() {
    //console.log("alltransaction", this.state.allTransactions);
    //console.log(this.state.selectedTransactions);
    return (
      <div className="App">
        {/* {Object.entries(this.state.currTransaction).map(([key, value]) => {
          return (
            <div key={key}>
              {key}: {value}
            </div>
          );
        })} */}
        <h3>Spendiwise</h3>
        <DateComponent
          year={this.state.selectedYear}
          month={this.state.selectedMonth}
          handleYearChange={this.handleYearChange}
          handleMonthChange={this.handleMonthChange}
        />
        <h3>
          {this.state.selectedMonth.toUpperCase()} {this.state.selectedYear}
        </h3>
        <ToggleButtonGroup
          color="primary"
          value={this.state.selectedView}
          exclusive
          onChange={this.handleViewChange}
        >
          <ToggleButton value="income/expense">Income/Expense</ToggleButton>
          <ToggleButton value="rewards">Rewards</ToggleButton>
        </ToggleButtonGroup>

        {/* FOR INCOME/EXPENSE VIEW */}

        {this.state.selectedView === "income/expense" && (
          <Box>
            <CurrentBalance transactions={this.state.selectedTransactions} />
            <Box sx={{ display: "block", justifyContent: "center" }}>
              <Box>
                {this.state.selectedMonth === "jan-dec" && (
                  <StackedBarChart
                    sx={{ width: 100 }}
                    transactions={this.state.selectedTransactions}
                  />
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                }}
              >
                <Box>
                  <DonutChart
                    transactions={this.state.selectedTransactions}
                    type="expense"
                  />
                </Box>

                <Box>
                  <DonutChart
                    transactions={this.state.selectedTransactions}
                    type="income"
                  />
                </Box>
              </Box>
            </Box>
            <h5>Transactions </h5>
            <ShowIETransactions
              transactions={this.state.selectedTransactions}
              onClick={this.handleTransactionDetailsModalOpen}
            />
          </Box>
        )}

        {/* FOR REWARDS VIEW */}
        {this.state.selectedView === "rewards" && (
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-evenly" }}>
              <CashTransactions
                transactions={this.state.selectedTransactions}
                onClick={this.handleTransactionDetailsModalOpen}
              />
              <CardTransactions
                transactions={this.state.selectedTransactions}
                month={this.state.selectedMonth}
                year={this.state.selectedYear}
                selectedCard="1111"
                cardType="visa"
                onClick={this.handleTransactionDetailsModalOpen}
              />
              <CardTransactions
                transactions={this.state.selectedTransactions}
                month={this.state.selectedMonth}
                year={this.state.selectedYear}
                selectedCard="2222"
                cardType="amex"
                onClick={this.handleTransactionDetailsModalOpen}
              />
            </Box>
          </Box>
        )}

        {/* MODALS */}

        <Modal
          open={this.state.transactionDetailsModalOpen}
          onClose={this.handleTransactionDetailsModalClose}
        >
          <Box sx={{ width: "50%" }}>
            <TransactionDetailsModal
              currTransaction={this.state.currTransaction}
              onEditClick={this.handleEditModalOpen}
              onDeleteClick={this.handleDeleteTransaction}
            />
          </Box>
        </Modal>
        <Dialog
          open={this.state.editModalOpen}
          onClose={this.handleEditModalClose}
        >
          <DialogTitle> Edit Current Transaction </DialogTitle>
          <DialogContent>
            <EditTransaction
              onChange={this.handleTransactionChange}
              value={this.state.currTransaction}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleEditModalClose}>Cancel</Button>
            <Button onClick={this.handleEditFormSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
        <Fab
          color="primary"
          aria-label="add"
          sx={{ position: "absolute", top: 0, left: 0 }}
          onClick={this.handleNewTransactionModalOpen}
        >
          <AddIcon />
        </Fab>
        <Dialog
          open={this.state.newTransactionModalOpen}
          onClose={this.handleNewTransactionModalClose}
        >
          <DialogTitle> Add New Transaction </DialogTitle>
          <DialogContent>
            <NewTransaction
              onChange={this.handleTransactionChange}
              value={this.state.currTransaction}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleNewTransactionModalClose}>
              Cancel
            </Button>
            <Button onClick={this.handleFormSubmit}>Submit</Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default App;
