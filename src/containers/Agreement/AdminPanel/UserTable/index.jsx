import React from "react";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Paper,
  Toolbar,
  Typography,
  TableSortLabel,
  Checkbox,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";
import { PropTypes } from "prop-types";

const UserTableToolbar = ({ numSelected }) => {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: "default.white",
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography sx={{ flex: "1 1 100%" }} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div" id="tableTitle">
          User table
        </Typography>
      )}
    </Toolbar>
  );
};

const EnhancedTableHead = (props) => {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort, aditionalInfo = [] } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ "aria-label": "select all desserts" }}
          />
        </TableCell>
        {aditionalInfo.map((item) => (
          <TableCell
            key={item.id}
            align={"right"}
            padding={"default"}
            sortDirection={orderBy === item.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === item.name}
              direction={orderBy === item.name ? order : "asc"}
              onClick={createSortHandler(item.id)}
            >
              {item.name}
              {orderBy === item.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const UserTable = ({ data }) => {
  const [selected, setSelected] = React.useState([]);
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("name");

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Paper sx={{ width: "100%", mb: 2 }}>
        <UserTableToolbar numSelected={selected.length} selected={selected} setSelected={setSelected} />
        <TableContainer>
          <Table aria-labelledby="tableTitle" size="medium">
            <EnhancedTableHead
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              aditionalInfo={data.aditionalInfo}
              rowCount={data.userAgreement.length}
            />
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

UserTable.propTypes = {
  data: PropTypes.object,
};

UserTableToolbar.propTypes = {
  numSelected: PropTypes.number,
};

EnhancedTableHead.propTypes = {
  onSelectAllClick: PropTypes.func,
  order: PropTypes.string,
  orderBy: PropTypes.string,
  numSelected: PropTypes.number,
  rowCount: PropTypes.number,
  onRequestSort: PropTypes.func,
  aditionalInfo: PropTypes.array,
};
