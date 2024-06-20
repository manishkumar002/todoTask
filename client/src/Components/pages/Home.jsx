import React, { useState } from 'react';
import '../styles/Home.css';

export default function Home() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");
  const [level, setLevel] = useState("");
  const [errors, setErrors] = useState({ title: "", description: "" });

  const data = { title, description,status,level };

  function validate() {
    let titleError = "";
    let descriptionError = "";

    if (!title) {
      titleError = "Title is required";
    }

    if (!description) {
      descriptionError = "Description is required";
    }

    if (titleError || descriptionError) {
      setErrors({ title: titleError, description: descriptionError });
      return false;
    }

    setErrors({ title: "", description: "" });
    return true;
  }

  function demo() {
    if (!validate()) {
      return;
    }

   

    fetch('http://localhost:8000/api/addTodo', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).then((res) => {
      return res.json();
    }).then(() => {
      alert("Content Added Successfully");
      setTitle("");
      setDescription("");
    }).catch((err) => {
      console.log(err);
    });
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-6'>
          <center>
            <img
              className='h-img'
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6vfI9MgghoaLwaK5jG9RRwjl3aYLI9QWRRA&s"
              height={"400"}
              alt="To-Do List"
            />
          </center>
        </div>
        <div className='col-sm-6'>
          <div className='h-box '>
            <div className='home p-2 '>
              <center className='fs-3'><b>TO-Do-List</b></center><br /><br />
              <input
                type='text'
                placeholder='Title'
                className='form-control w-100'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && <div style={{ color: "red" }}>{errors.title}</div>}
              <br />
              <input
                type='text'
                placeholder='Description'
                className='form-control w-100'
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && <div style={{ color: "red" }}>{errors.description}</div>}

              <div onChange={(e) => setStatus(e.target.value)}  >
  <input type='radio' name="status" value="completed" className='checkboxStyle m-3'/>
  <label>completed</label>
  <input type='radio' name="status" value="incomplete" className='checkboxStyle m-3'/>
  <label>incomplete</label>
</div>

<select className='form-control w-100' onChange={(e) => setLevel(e.target.value)}>
  <option >-----select------</option>
  <option name="level" value="low">low</option>
  <option name="level" value="medium">medium</option>
  <option name="level" value="high">high</option>
</select>


              <center>
                <button className='h-button mt-2' onClick={demo}>Submit</button>
              </center>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
