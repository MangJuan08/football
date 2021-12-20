import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
const TableTeams = ({
  columns,
  squadTable,
  page,
  rowsPerPage,
  showTeam,
  deleteRow,
  pageCount,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  return (
    <div>
      <Paper sx={{ width: "100%" }}>
        <TableContainer
          sx={{ maxHeight: 740 }}
          actions={[
            {
              icon: "save",
              tooltip: "Save User",
              onClick: (event, rowData) => {
                console.log("hey");
              },
            },
          ]}
        >
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((item) => {
                  return (
                    <TableCell key={item.id} style={{ fontWeight: "Bold" }}>
                      {item.headerName.toUpperCase()}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {squadTable
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  return (
                    <TableRow
                      key={row.id}
                      style={
                        index % 2
                          ? { background: "#38abed" }
                          : { background: "white" }
                      }
                    >
                      <TableCell style={{ fontWeight: "Bold" }}>
                        {row.id}
                      </TableCell>
                      <TableCell
                        style={{ fontWeight: "Bold" }}
                        className="row-pointer"
                        onClick={() => showTeam(row)}
                      >
                        {row.squad}
                      </TableCell>
                      <TableCell style={{ fontWeight: "Bold" }}>
                        {row.P}
                      </TableCell>
                      <TableCell style={{ fontWeight: "Bold" }}>
                        {row.W}
                      </TableCell>
                      <TableCell style={{ fontWeight: "Bold" }}>
                        {row.L}
                      </TableCell>
                      <TableCell style={{ fontWeight: "Bold" }}>
                        {row.D}
                      </TableCell>
                      <TableCell style={{ fontWeight: "Bold" }}>
                        {row.F}
                      </TableCell>
                      <TableCell style={{ fontWeight: "Bold" }}>
                        {row.A}
                      </TableCell>
                      <TableCell style={{ fontWeight: "Bold" }}>
                        {row.Punti}
                      </TableCell>
                      <TableCell style={{ fontWeight: "Bold" }}>
                        <button className="btn btn-light">
                          <DeleteIcon onClick={() => deleteRow(row.id)} />
                        </button>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 30]}
          component="div"
          count={pageCount}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

export default TableTeams;
