




import React, { useEffect, useState } from 'react';

export default function View() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [level, setLevel] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [modalItemId, setModalItemId] = useState(null); 

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = () => {
    fetch('http://localhost:8000/api/getTodo', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then((result) => result.json())
    .then((res) => {
      setData(res);
      setFilteredData(res);
    })
    .catch((err) => console.error('Error fetching todos:', err));
  }

  const edit = (item) => {
    window.localStorage.setItem('stt2', JSON.stringify(item._id));
    setTitle(item.title);
    setDescription(item.description);
    setStatus(item.status);
    setLevel(item.level);
    setModalItemId(item._id); 
  }

  function handleUpdate(e) {
    e.preventDefault();
   
    const updatedItem = { title, description, status, level };
    let id = JSON.parse(window.localStorage.getItem("stt2"));
    
    fetch(`http://localhost:8000/api/getTodo/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedItem),
    })
    .then(() => {
      alert("Content Updated Successfully");
      fetchTodos();
      setTitle("");
      setDescription("");
      setStatus("");
      setModalItemId(null);
    })
    .catch((err) => console.error('Error updating todo:', err));
  }

  const del = (id) => {
    if (window.confirm('Are you sure you want to delete?')) {
      fetch(`http://localhost:8000/api/getTodo/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(() => {
        fetchTodos();
      })
      .catch((err) => console.error('Error deleting item:', err));
    }
  };
  
  const search = (event) => {
    let key = event.target.value.toLowerCase();
    if (key) {
      const filtered = data.filter(item => item.title.toLowerCase().includes(key));
      setFilteredData(filtered);
    } else {
      setFilteredData(data);
    }
  }

  return (
    <div className='container-fluid'>
      <input type='text' placeholder='Search Title....'  onChange={search} style={{ borderRadius: "10px", width: "200px" }} /> 
      <table className='table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Level</th>
            <th>Edit</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.description}</td>
              <td>{item.status}</td>
              <td>{item.level }</td>
              <td>
                <button type="button" onClick={() => edit(item)} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
                  Edit
                </button>
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div className="modal-dialog">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Update</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div className="modal-body">
                        <form onSubmit={handleUpdate}>
                          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className='form-control w-100' placeholder='Enter Your title' /><br />
                          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='form-control w-100' placeholder='Enter Your description' />
                          <div onChange={(e) => setStatus(e.target.value)}>
                            <input type='radio' name="status" value="completed" className='checkboxStyle m-3' />
                            <label>completed</label>
                            <input type='radio' name="status" value="incomplete" className='checkboxStyle m-3' />
                            <label>incomplete</label>
                          </div>
                          <select className='form-control w-100' onChange={(e) => setLevel(e.target.value)}>
                            <option>-----select------</option>
                            <option name="level" value="low">low</option>
                            <option name="level" value="medium">medium</option>
                            <option name="level" value="high">high</option>
                          </select>
                          <br />
                          <input type="submit" className='form-control' value="UPDATE" style={{ background: '#fdc700' }} /><br />
                        </form>
                      </div>
                      <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>    
                      </div>
                    </div>
                  </div>
                </div>
              </td>
              <td><button onClick={() => del(item._id)} className='btn btn-info'>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}















