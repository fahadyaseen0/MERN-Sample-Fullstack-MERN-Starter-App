import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function Edit() {
  const params = useParams();
  const navigate = useNavigate();
  const [form, setForm] = React.useState({
    name: "",
    position: "",
    level: "",
  });
  

  const updateForm = (value) => {
    setForm({ ...form, ...value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(process.env.REACT_APP_API + params.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    }).catch((error) => {
      console.log(error);
    });
    navigate("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      const record = await fetch(process.env.REACT_APP_API + params.id);
      const data = await record.json();
      setForm({
        name: data.name,
        position: data.position,
        level: data.level,
      });
    };
    fetchData();
  }, []);

  return (
    <div className="form">
      <h1>Edit existing user</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={form.name}
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
            value={form.position}
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
              checked={form.level === "intern"}
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
              checked={form.level === "junior"}
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
              checked={form.level === "Senior"}
              onChange={(e) => {
                updateForm({ level: e.target.value });
              }}
            />
            <label htmlFor="positionSenior" className="form-check-label">
              Senior
            </label>
          </div>
        </div>
        <div className="form-group">
          <input type="submit" value="Edit" className="btn btn-primary" />
          <Link className="btn btn-secondary  mx-3" to="/">Cancel</Link>
        </div>
      </form>
    </div>
  );
}

export default Edit;
