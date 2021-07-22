import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableFooter from "@material-ui/core/TableFooter";
import TablePagination from "@material-ui/core/TablePagination";
import Avatar from "@material-ui/core/Avatar";
import LinearProgress from "@material-ui/core/LinearProgress";
import Alert from "@material-ui/lab/Alert";

import { LoginContext, ITEMS_PER_PAGE } from "../../providers/LoginProvider";
import {
  getLogins,
  getTotalCount,
  getLogin,
  getPage,
  getLoading,
  getError,
} from "./selectors";
import type { LoginsT } from "./selectors";

/**
 * Sort the logins asc or desc based on the login property.
 * @param {LoginsT} logins - All the logins that came from the API.
 * @param {string} dir the direction that we want to sort them.
 */
const sortLogins = (logins: LoginsT, dir: string) => {
  if (dir === "asc") {
    return logins.sort((a, b) => {
      const loginA = a.login.toLowerCase();
      const loginB = b.login.toLowerCase();
      return loginA < loginB ? -1 : loginA > loginB ? 1 : 0;
    });
  }

  return logins.sort((a, b) => {
    const loginA = a.login.toLowerCase();
    const loginB = b.login.toLowerCase();
    return loginA < loginB ? 1 : loginA > loginB ? -1 : 0;
  });
};

/**
 * Component that displays all the login results.
 * It has pagination which allows to load more results.
 * Displays errors or loading indications based on state.
 */
const LoginResults = () => {
  const { state, getResults } = React.useContext(LoginContext);
  const [sortDir, setSortDir] = React.useState<"asc" | "desc">("asc");
  const logins = getLogins(state);
  const count = getTotalCount(state);
  const login = getLogin(state);
  const page = getPage(state);
  const sortedLogins = sortLogins(logins, sortDir);
  const isLoading = getLoading(state);
  const error = getError(state);

  // Sets the sortin direction of the component.
  const handleSorting = () => {
    setSortDir((prevSorting) => {
      if (prevSorting === "asc") {
        return "desc";
      }
      return "asc";
    });
  };

  // Handles when the next or previous is clicking from the pagination.
  const handleChangePage = (event: any, newPage: number) => {
    getResults(login, newPage);
  };

  if (error) {
    return <Alert severity="error">{error}</Alert>;
  }

  if (isLoading) {
    return <LinearProgress />;
  }

  if (logins.length === 0) {
    return <>There are no results at the moment.</>;
  }

  return (
    <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>
              <TableSortLabel onClick={handleSorting} direction={sortDir}>
                <span data-testid="login-results-sort-span">Login</span>
              </TableSortLabel>
            </TableCell>
            <TableCell>Type</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedLogins.map((row, index) => (
            <TableRow key={row.login}>
              <TableCell>
                <Avatar alt={row.login} src={row.avatarUrl} />
              </TableCell>
              <TableCell>
                <span data-testid={`login-results-span-login-index-${index}`}>
                  {row.login}
                </span>
              </TableCell>
              <TableCell>{row.type}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              count={count}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={ITEMS_PER_PAGE}
              rowsPerPageOptions={[ITEMS_PER_PAGE]}
              nextIconButtonProps={{ role: "button" }}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
};

export default LoginResults;
