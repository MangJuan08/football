import React, { useEffect, useState } from "react";
import axios from "axios";
import CardResult from "../components/Cards/CardResult";
import TableTeams from "../components/Tables/TableTeams";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import DialogAddTeam from "../components/Dialog/DialogAddTeam";

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
  { field: "Delete", headerName: "Actions", width: 130 },
];

const url = "http://localhost:3000/teams";

const Football = () => {
  const [squadTable, setSquadTable] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [team, setTeam] = useState({
    squad: "",
    P: 0,
    W: 0,
    L: 0,
    D: 0,
    F: 0,
    Punti: 0,
    A: 0,
  });
  const [open, isShow] = useState(false);
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
    setTeam({ ...team, [name]: value });
    console.log(team);
  };

  const addTeam = (e) => {
    e.preventDefault();
    console.log(team);
    if (team.squad && team.P && team.W) {
      axios
        .post(url, {
          id: squadTable.id + 1,
          squad: team.squad,
          P: team.P,
          W: team.W,
          L: team.L,
          D: team.D,
          F: team.F,
          A: team.A,
          Punti: team.Punti,
        })
        .then((res) => {
          console.log(res);
          fetch();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      alert("failed adding team");
    }
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

  const closeDialog = (stat) => {
    isShow(false);
  };

  const showDialog = (stat) => {
    isShow(true);
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
      <div className="row" style={{ marginTop: "20px" }}>
        <div className="col-md-12">
          <br></br>
          <br></br>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                TEAM TABLE
              </Typography>
              <button className="btn btn-dark" onClick={showDialog}>
                <AddIcon />{" "}
              </button>
            </Toolbar>
          </AppBar>
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
          <Link to="/" className="nav-link">
            Home
          </Link>
          {open ? (
            <DialogAddTeam
              handleChange={handleChange}
              addTeam={addTeam}
              closeDialog={closeDialog}
              open={open}
              team={team}
            />
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

export default Football;

/*
* Lega football
Il file football.dat contiene i risultati della premier league inglese. Le colonne con 
etichetta "F" e "A" contengono il numero totale di goal segnati e subiti da ogni squadra
nella stagione. Ad esempio l'Arsenal ha segnato 79 goal (F) e ne ha subiti 36 (A).
Scrivere un programma che dato il file in input ritorni la squadra con la minor differenza
fra goal segnati e subiti.


*/
