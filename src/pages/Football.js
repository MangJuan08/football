import React, { useEffect, useState } from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import TableHead from "@mui/material/TableHead";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { Link } from "react-router-dom";
import axios from "axios";

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

const Football = () => {
  const [squadTable, setSquadTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);

  const [risultati, setRisultati] = useState({
    id: 0,
    ris: 0,
    squad: "",
    status: false,
  });
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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

  const showRisultato = (status) => {
      console.log(status)
    let risultatiDifferenza = squadTable.map((item) => item.F - item.A);
    console.log(risultatiDifferenza);

    let risultatoMinore = risultatiDifferenza.reduce((prev, curr) => {
      return prev < curr ? prev : curr;
    });
    let ids = risultatiDifferenza.indexOf(risultatoMinore);
    let idP = ids + 1;

    let getSquadra = squadTable.find((item) => item.id === idP);

    setRisultati({
      ...risultati,
      id: idP,
      ris: risultatoMinore,
      squad: getSquadra.squad,
      status: status,
    });
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
              <Table>
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
                          <TableCell style={{ fontWeight: "Bold" }}>
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
        <button className="btn btn-primary btn-lg w-100" onClick={()=>showRisultato(!risultati.status)}>
           {!risultati.status ? 'show' : 'nascondi'}
          </button>
        </div>
        <div className="col-md-8">
          {risultati.status ? (
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Squadra: <b>{risultati.squad}</b></h5>
                <h6 className="card-subtitle mb-2 text-muted">Risultato Minore: {risultati.ris}</h6>
                <p className="card-subtitle mb-2 text-muted">Id: {risultati.id}</p>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default Football;

/*


* Lega football
Il file football.dat contiene i risultati della premier league inglese. Le colonne con 
etichetta "F" e "A" contengono il numero totale di goal segnati e subiti da ogni squadra
nella stagione. Ad esempio l'Arsenal ha segnato 79 goal (F) e ne ha subiti 36 (A).
Scrivere un programma che dato il file in input ritorni la squadra con la minor differenza
fra goal segnati e subiti.


*/
