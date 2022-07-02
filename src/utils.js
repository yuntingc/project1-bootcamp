import DirectionsCarRoundedIcon from "@mui/icons-material/DirectionsCarRounded";
import FitnessCenterRoundedIcon from "@mui/icons-material/FitnessCenterRounded";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import SportsEsportsRoundedIcon from "@mui/icons-material/SportsEsportsRounded";
import ShoppingCartRoundedIcon from "@mui/icons-material/ShoppingCartRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";

const categoryIconMapping = {
  food: <RestaurantRoundedIcon />,
  shopping: <ShoppingCartRoundedIcon />,
  entertainment: <SportsEsportsRoundedIcon />,
  sports: <FitnessCenterRoundedIcon />,
  utilities: <HomeRoundedIcon />,
  transport: <DirectionsCarRoundedIcon />,
  others: <GridViewRoundedIcon />,
  salary: <PaidRoundedIcon />,
};

const monthMapping = {
  jan: 1,
  feb: 2,
  mar: 3,
  apr: 4,
  may: 5,
  jun: 6,
  jul: 7,
  aug: 8,
  sep: 9,
  oct: 10,
  nov: 11,
  dec: 12,
};

const getTransactions = (transactions, year, period) => {
  let selectedTransactions = [];

  // for each transaction get the date and return selected transactions
  for (let i = 0; i < transactions.length; i += 1) {
    let transactionDate = new Date(transactions[i].date);

    // return transactions for a particular year
    if (transactionDate.getFullYear() === year) {
      // if all the months are selected, return all transactions for that year
      if (period === "jan-dec") {
        selectedTransactions.push(transactions[i]);

        // if a particular month is selected, return transactions for that month
        // getMonth() starts at 0 for jan
      } else if (transactionDate.getMonth() + 1 === monthMapping[period]) {
        selectedTransactions.push(transactions[i]);
      }
    }
  }

  return selectedTransactions;
};

const todayDate = () => {
  const current = new Date();
  const currentYear = current.getFullYear();
  const currentMonth =
    current.getMonth().toString().length === 1
      ? "0" + (current.getMonth() + 1)
      : current.getMonth() + 1;
  const currentDate =
    current.getDate().toString().length === 1
      ? "0" + current.getDate()
      : current.getDate();
  const today = `${currentYear}-${currentMonth}-${currentDate}`;
  return today;
};

const getKey = (obj, val) => Object.keys(obj).find((key) => obj[key] === val);

export {
  monthMapping,
  getTransactions,
  todayDate,
  categoryIconMapping,
  getKey,
};
