import React from "react";
import { useNavigate } from "react-router";

function Create() {
  const [form, setForm] = React.useState({
    name: "",
    position: "",
    level: "",
  });
  const navigate = useNavigate();

  function updateForm(value) {
    setForm({ ...form, ...value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    fetch(process.env.REACT_APP_API,{
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
    })
      .then((response) => console.log(response.status))
      .catch((error) => console.error(error));
    navigate("/");
  }

  return (
    <div className="form">
      <h1>Create new User</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            required
            onChange={(e) => {
              updateForm({ name: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="position">Position</label>
          <input
            type="text"
            className="form-control"
            id="position"
            onChange={(e) => {
              updateForm({ position: e.target.value });
            }}
          />
        </div>
        <div className="form-group">
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionIntern"
              value="intern"
              required
              onChange={(e) => {
                updateForm({ level: e.target.value });
              }}
            />
            <label htmlFor="positionIntern" className="form-check-label">
              Intern
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionJunior"
              value="junior"
              onChange={(e) => {
                updateForm({ level: e.target.value });
              }}
            />
            <label htmlFor="positionJunior" className="form-check-label">
              Junior
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="positionOptions"
              id="positionSenior"
              value="Senior"
              onChange={(e) => {
                updateForm({ level: e.target.value });
              }}
              required
            />
            <label htmlFor="positionSenior" className="form-check-label">
              Senior
            </label>
          </div>
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create person"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}

export default Create;
