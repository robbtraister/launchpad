import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Link } from "react-router-dom";

import styles from "./table.scss";

export function Table() {
  return (
    <MuiTable data-testid="project-table" className={styles.table}>
      <TableHead>
        <TableRow>
          <TableCell>Project Title</TableCell>
          <TableCell align="right">Created On</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow component={Link} to="/abc">
          <TableCell>ABC</TableCell>
          <TableCell align="right">Yesterday</TableCell>
        </TableRow>
        <TableRow component={Link} to="/def">
          <TableCell>DEF</TableCell>
          <TableCell align="right">Last Week</TableCell>
        </TableRow>
      </TableBody>
    </MuiTable>
  );
}
