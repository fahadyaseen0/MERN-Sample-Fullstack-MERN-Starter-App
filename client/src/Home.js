import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [users, setUsers] = useState([]);

  const fetchData = async () => {
    const response = await fetch(process.env.REACT_APP_API);
    const data = await response.json();
    setUsers(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteUser = async (id) => {
    if(window.confirm("Are you sure you want to delete this user?")){
        await fetch(process.env.REACT_APP_API + id, {
          method: "DELETE",
        });
    }
    fetchData();
  }

  function User(props) {
    return (
          <tr key={props.data._id}>
            <td>{props.data.name}</td>
            <td>{props.data.position}</td>
            <td>{props.data.level}</td>
            <td className="text-end"><Link to={"/edit/" + props.data._id} className="btn btn-link">Edit</Link> | <button className="btn btn-link" onClick={()=>{deleteUser(props.data._id)}}>Delete</button></td>
          </tr>
        );
  }

  function Users(props) {
    return props.data.map((user) => {
      return (
        <User key={user._id} data={user} />
      );
    });
  }
  return (
    <div className="home">
      <h1 className="py-5">Record List</h1>
      <table className="table table-striped">
        <thead className="thead-light">
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
          <Users data={users} />
        </tbody>
      </table>
    </div>
  );
}

export default Home;
