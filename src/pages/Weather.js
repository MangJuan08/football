import React from 'react'
import { Link } from "react-router-dom";

const Weather = () => {
    return (
        <div className='row' style={{marginTop:'30px'}}>
            <div className="row" style={{ marginTop: "30px" }}>
        <div className="col-md-2"></div>
        <div className="col-md-8"></div>

        </div>
            <p>Weather</p>
            <Link to="/" className="nav-link">
            Home
          </Link>
        </div>
    )
}

export default Weather

/*


* Dati meteo
In weather.dat ci sono dei dati con rilevazioni meteorologiche. La prima colonna contiene 
il giorno del mese, mentre la seconda e la terza contengono rispettivamente la temperatura
massima e minima per quel giorno. Scrivere un programma che dato il file in input ritorni
il giorno con l'escursione termica pių piccola.

*/