import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const DialogAddTeam = ({ handleChange, addTeam, closeDialog, open, team }) => {
  return (
    <React.Fragment>
      <Dialog fullWidth="true" maxWidth="md" open={open} onClose={closeDialog}>
        <DialogTitle>ADD SQUAD</DialogTitle>
        <DialogContent>
          <Box>
            <form onSubmit={addTeam}>
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  name="squad"
                  onChange={handleChange}
                  placeholder="Squad Name"
                  value={team.squad}
                ></textarea>
                <br></br>
              </div>
              <div class="row g-2">
                <div class="col-md">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInputGrid"
                      name="P"
                      onChange={handleChange}
                      value={team.P}
                    />
                    <label htmlFor="floatingInputGrid">P</label>
                  </div>
                </div>
                <div class="col-md">
                  <div class="form-floating">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInputGrid"
                        name="W"
                        onChange={handleChange}
                        value={team.W}
                      />
                      <label htmlFor="floatingInputGrid">W</label>
                    </div>
                  </div>
                </div>
              </div> <br></br>
              <div class="row g-2">
                <div class="col-md">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInputGrid"
                      name="L"
                      onChange={handleChange}
                      value={team.L}
                    />
                    <label htmlFor="floatingInputGrid">L</label>
                  </div>
                </div>
                <div class="col-md">
                  <div class="form-floating">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInputGrid"
                        name="D"
                        onChange={handleChange}
                        value={team.D}
                      />
                      <label htmlFor="floatingInputGrid">D</label>
                    </div>
                  </div>
                </div>
              </div> <br></br>
              <div class="row g-2">
                <div class="col-md">
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInputGrid"
                      name="F"
                      onChange={handleChange}
                      value={team.F}
                    />
                    <label htmlFor="floatingInputGrid">F</label>
                  </div>
                </div>
                <div class="col-md">
                  <div class="form-floating">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInputGrid"
                        name="A"
                        onChange={handleChange}
                        value={team.A}
                      />
                      <label htmlFor="floatingInputGrid">A</label>
                    </div>
                  </div>
                </div>
              </div><br></br>
              <div class="row g-2">
                <div class="col-md">
                  <div class="form-floating">
                    <div class="form-floating">
                      <input
                        type="text"
                        class="form-control"
                        id="floatingInputGrid"
                        name="Punti"
                        onChange={handleChange}
                        value={team.Punti}
                      />
                      <label htmlFor="floatingInputGrid">Punti</label>
                    </div>
                  </div>
                </div>
              </div>
              <br></br>
              <br></br>
              <button type="submit" className="btn btn-primary">
                ADD TEAM INPUT EXAMPLE
              </button>
            </form>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDialog}>Close</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default DialogAddTeam;
