import React, { useEffect, useState } from "react";
import axios from "axios";
import FormAddTeam from "../components/Forms/FormAddTeam";
import CardResult from "../components/Cards/CardResult";
import TableTeams from "../components/Tables/TableTeams";
import { Link } from "react-router-dom";
import "./table.css";

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
  { field: "Delete", headerName: "Delete", width: 130 },
];

const url = "http://localhost:3000/teams";

const Football = () => {
  const [squadTable, setSquadTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [team, setTeam] = useState("");
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

  const showRisultato = (status) => {
    //differenze tra Punti Segnati F e Punti Subiti
    let risultatiDifferenza = squadTable.map((item) => item.F - item.A);

    //prendere il risultato minore
    let risultatoMinore = risultatiDifferenza.reduce((prev, curr) => {
      return prev < curr ? prev : curr;
    });

    //prendere l'indice del risultato minore
    let ids = risultatiDifferenza.indexOf(risultatoMinore);

    //ids+1 perché nell'array è sempre +1;
    //per esempio il risultato è 19, nella tabella è sempre +1
    let idP = ids + 1;

    //cerca la squadra che ha l'idP
    let getSquadra = squadTable.find((item) => item.id === idP);

    //aggiorna i risultati
    setRisultati({
      ...risultati,
      id: idP,
      ris: risultatoMinore,
      squad: getSquadra.squad,
      status: status,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTeam(value);
  };

  const addTeam = (e) => {
    e.preventDefault();
    axios
      .post(url, {
        id: squadTable.id + 1,
        squad: team,
      })
      .then((res) => {
        console.log(res);
        fetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteRow = (id) => {
    axios
      .delete(url + "/" + id)
      .then((res) => {
        console.log(res);
        fetch();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showTeam = (team) => {
    console.log(team);
  };

  const fetch = async () => {
    axios
      .get(url)
      .then((res) => {
        setSquadTable(res.data);
        setPageCount(res.data.length);
        console.log(res);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetch();
    console.log(risultati);
  }, [risultati]);

  return (
    <React.Fragment>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-12">
          <h1 style={{ textAlign: "center" }}>TEAM TABLE</h1>
          <br></br>
          <TableTeams
            columns={columns}
            page={page}
            showTeam={showTeam}
            rowsPerPage={rowsPerPage}
            squadTable={squadTable}
            deleteRow={deleteRow}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
            pageCount={pageCount}
          ></TableTeams>
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
        </div>
        <div className="col-md-10">
          {risultati.status ? <CardResult risultati={risultati} /> : ""}
        </div>
      </div>
      <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-2">
          <FormAddTeam
            handleChange={handleChange}
            addTeam={addTeam}
          ></FormAddTeam>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
      </div>
      <br></br>
      <br></br>
      <br></br>
    </React.Fragment>
  );
};

export default Football;

/*
  <form onSubmit={addTeam}>
            <div className="mb-3">
              <textarea
                className="form-control"
                rows="3"
                name="team"
                onChange={handleChange}
              ></textarea>
              <br></br>
              <button type="submit" className="btn btn-primary">
                ADD TEAM INPUT EXAMPLE
              </button>
            </div>
          </form>

          <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Squadra: <b>{risultati.squad}</b>
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">
                  Risultato Minore: {risultati.ris}
                </h6>
                <p className="card-subtitle mb-2 text-muted">
                  Id: {risultati.id}
                </p>
              </div>
            </div>
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
                            <button
                              className="btn-close"
                              onClick={() => deleteRow(row.id)}
                            ></button>
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
* Lega football
Il file football.dat contiene i risultati della premier league inglese. Le colonne con 
etichetta "F" e "A" contengono il numero totale di goal segnati e subiti da ogni squadra
nella stagione. Ad esempio l'Arsenal ha segnato 79 goal (F) e ne ha subiti 36 (A).
Scrivere un programma che dato il file in input ritorni la squadra con la minor differenza
fra goal segnati e subiti.


*/
