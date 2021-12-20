import React from "react";

const FormAddTeam = ({ handleChange, addTeam }) => {
  return (
    <div>
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
    </div>
  );
};

export default FormAddTeam;
