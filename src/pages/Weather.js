import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import axios from "axios";

const columns = [
  { field: "dy", headerName: "Giorno", width: 70 },
  { field: "mxT", headerName: "Max Temperatura", width: 130 },
  { field: "mnT", headerName: "Min Temperatura", width: 130 },
];

const url = "http://localhost:3000/weather";

const Weather = () => {
  const [weatherTable, setWeatherTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const [risultati, setRisultati] = useState({
    ris: 0,
    giorno: 0,
    status: false,
  });
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const fetch = () => {
    axios
      .get(url)
      .then((res) => {
        setWeatherTable(res.data);
        setPageCount(res.data.length);
      })
      .catch((err) => console.group(err));
  };

  const showRisultato = (status) => {
    //remove special character "*" in the array
    //remove the value that contains a special character
    console.log(weatherTable);
    let maxT = weatherTable.map((el, index) => parseInt(el.MxT));
    let minT = weatherTable.map((el, index) => parseInt(el.MnT));

    //differenza tra MaxTemperatura e MinTemperatura
    let differenza = maxT.map((it, i) => it - minT[i]);

    //prendere il risultato minore
    let risultatoMinore = differenza.reduce((prev, curr) => {
      return prev < curr ? prev : curr;
    });

    console.log('risultato minore',risultatoMinore);
    setRisultati({ ...risultati, ris: risultatoMinore, status: status });
  };

  useEffect(() => {
    fetch();
    console.log(risultati);
  }, [risultati]);
  return (
    <React.Fragment>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-12">
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ maxHeight: 740 }}>
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
                  {weatherTable
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
                            {row.dy}
                          </TableCell>
                          <TableCell style={{ fontWeight: "Bold" }}>
                            {row.MxT} °
                          </TableCell>
                          <TableCell style={{ fontWeight: "Bold" }}>
                            {row.MnT} °
                          </TableCell>
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

      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-2">
          <button
            className="btn btn-outline-primary btn-lg w-100"
            onClick={() => showRisultato(!risultati.status)}
          >
            {!risultati.status ? "SHOW" : "HIDE"}
          </button>

          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
        <div className="col-md-10">
          {risultati.status ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Giorno: <b>{risultati.giorno}</b>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Risultato Minore: {risultati.ris}
                </h6>
                <p className="card-subtitle mb-2 text-muted">
                  Id: {risultati.id}
                </p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </React.Fragment>
  );
};

export default Weather;

/*


* Dati meteo
In weather.dat ci sono dei dati con rilevazioni meteorologiche. La prima colonna contiene 
il giorno del mese, mentre la seconda e la terza contengono rispettivamente la temperatura
massima e minima per quel giorno. Scrivere un programma che dato il file in input ritorni
il giorno con l'escursione termica pių piccola.

*/
