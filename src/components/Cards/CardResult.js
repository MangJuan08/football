import React from 'react'

const CardResult = ({risultati}) => {
    return (
        <div>
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
        </div>
    )
}

export default CardResult
