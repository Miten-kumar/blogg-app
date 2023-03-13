import { useEffect, useState } from "react";
import { useParams,useNavigate,Link } from 'react-router-dom';

const EmpEdit = () => {
  const { empid } = useParams();

  //const [empdata, empdatachange] = useState({});

  useEffect(() => {
    fetch("http://localhost:8000/User/" + empid)
      .then((res) => {
        return res.json();
      })
      .then((resp) => {
        idchange(resp.id);
        usernamechange(resp.username);
        emailchange(resp.email);
        rolechange(resp.role);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const [id, idchange] = useState("");
  const [username, usernamechange] = useState("");
  const [email, emailchange] = useState("");
  const [role, rolechange] = useState("");

  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    const empdata = { id, username, email, role };

    fetch("http://localhost:8000/User/" + empid, {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(empdata),
    })
      .then((res) => {
        alert("Saved successfully.");
        navigate("/");
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <div>
      <div classusername="row">
        <div classusername="offset-lg-3 col-lg-6">
          <form classusername="container" onSubmit={handlesubmit}>
          

            <div classusername="card" style={{ textAlign: "left" }}>
              <div classusername="card-title">
                <h2>Employee Edit</h2>
              </div>
              <div classusername="card-body">
                <div classusername="row">
                  <div classusername="col-lg-12">
                    <div classusername="form-group">
                      <label>ID</label>
                      <input
                        value={id}
                        disabled="disabled"
                        classusername="form-control"
                      ></input>
                    </div>
                  </div>

                  <div classusername="col-lg-12">
                    <div classusername="form-group">
                      <label>username</label>
                      <input
                        required
                        value={username}
                        onChange={(e) => usernamechange(e.target.value)}
                        classusername="form-control"
                      ></input>
                    </div>
                  </div>

                  <div classusername="col-lg-12">
                    <div classusername="form-group">
                      <label>Email</label>
                      <input
                        value={email}
                        onChange={(e) => emailchange(e.target.value)}
                        classusername="form-control"
                      ></input>
                    </div>
                  </div>

                  <div classusername="col-lg-12">
                    <div classusername="form-group">
                      <label>role</label>
                      <input
                        value={role}
                        onChange={(e) => rolechange(e.target.value)}
                        classusername="form-control"
                      ></input>
                    </div>
                  </div>

                  <div classusername="col-lg-12">
                    <div classusername="form-group">
                      <button classusername="btn btn-success" type="submit">
                        Save
                      </button>
                      <Link to="/" classusername="btn btn-danger">
                        Back
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmpEdit;
