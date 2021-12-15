import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

import axios from "axios";
/*"squad": "Arsenal", "P": 38, "W":26  , "L":9, "D":3, "F":79, "A":36, "Punti":87*/
const columns = [
  { field: "id", headerName: "id", width: 70 },
  { field: "squad", headerName: "Team", width: 130 },
  { field: "P", headerName: "P", width: 130 },
  { field: "W", headerName: "W", width: 130 },
  { field: "L", headerName: "L", width: 130 },
  { field: "D", headerName: "D", width: 130 },
  { field: "F", headerName: "F", width: 130 },
  { field: "A", headerName: "A", width: 130 },
  { field: "Punti", headerName: "Punti", width: 130 },
];

const url = "http://localhost:3000/teams";

function App() {
  const [squadTable, setSquadTable] = useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [newSquad, setNewSquad] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setNewSquad(value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSquadTable([
      ...squadTable,
      {
        id: Math.random(),
        squad: newSquad,
        P:0,
        W:0,
        L:0,
        D:0,
        F:0,
        A:0,
        Punti:0
      },
    ]);
    console.log(squadTable)
  };

  const fetch = () => {
    axios
      .get(url)
      .then((res) => {
        setSquadTable(res.data);
        setPageCount(res.data.length);
      })
      .catch((err) => console.group(err));
  };

  useEffect(() => {
    console.log(squadTable)
    
    const timer = setInterval(()=> {
      fetch();
    },1000);

      return() => {
        clearInterval(timer);
      }
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 740 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    {columns.map((item) => {
                      return (
                        <TableCell key={item.id} style={{fontWeight:"Bold"}}>{item.headerName.toUpperCase()}</TableCell>
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
                          <TableCell  style={{fontWeight:"Bold"}}>{row.id}</TableCell>
                          <TableCell style={{fontWeight:"Bold"}}>{row.squad}</TableCell>
                          <TableCell style={{fontWeight:"Bold"}}>{row.P}</TableCell>
                          <TableCell style={{fontWeight:"Bold"}}>{row.W}</TableCell>
                          <TableCell style={{fontWeight:"Bold"}}>{row.L}</TableCell>
                          <TableCell style={{fontWeight:"Bold"}}>{row.D}</TableCell>
                          <TableCell style={{fontWeight:"Bold"}}>{row.F}</TableCell>
                          <TableCell style={{fontWeight:"Bold"}}>{row.A}</TableCell>
                          <TableCell style={{fontWeight:"Bold"}}>{row.Punti}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 20]}
              component="div"
              count={pageCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </div>
      </div>
      <br></br>
      <div className="row">
        <div className="col-md-4"></div>
        <div className="col-md-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="squad" className="form-label">
                Add Squad
              </label>
              <input
                type="text"
                className="form-control"
                id="squad"
                value={newSquad}
                onChange={handleChange}
              ></input>
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
/*


<TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={squadTable}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />


        <DataGrid
        rows={squadTable}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
      />
*/
