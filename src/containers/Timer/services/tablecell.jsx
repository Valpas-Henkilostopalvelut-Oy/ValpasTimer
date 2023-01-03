import { styled } from "@mui/material/styles";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";

export const CustomTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    borderTopRadius: "1px",
    borderTopStyle: "solid",
    borderTopColor: theme.palette.table.cell.border_color,
    borderBottom: "0px",
    borderBottomColor: theme.palette.table.cell.border_color,
  },
}));
