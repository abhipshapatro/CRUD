import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {

    const [data, setData] = useState([]);
    const [tabledark, setTabledark] = useState("");

    function getData() {
        axios
            .get("https://6423008d001cb9fc20359c6d.mockapi.io/crud")
            .then((res) => {
                console.log(res.data);
                setData(res.data);
            });
    }

    function handleDelete(id) {
        axios
            .delete(`https://6423008d001cb9fc20359c6d.mockapi.io/crud/${id}`)
            .then(() => {
                getData();
            })
    }


    const setToLocalStorage = (id, name, email) => {
        localStorage.setItem("id", id);
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <>
            <div class="form-check form-switch">
                <input 
                    className="form-check-input" 
                    type="checkbox"
                    onClick={() => {
                        (tabledark == "table-dark") ? setTabledark("") : setTabledark("table-dark");
                    }}
                    />
            </div>
            <div className='d-flex justify-content-between'>
                <h2>READ Operation</h2>
                <Link to="/">
                    <button className='btn btn-secondary'>Create</button>
                </Link>

            </div>

            <table className={`table ${tabledark}`}>
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                {
                    data.map((eachData) => {
                        return (
                            <>
                                <tbody>
                                    <tr>
                                        <th scope="row">{eachData.id}</th>
                                        <td>{eachData.name}</td>
                                        <td>{eachData.email}</td>
                                        <td>
                                            <Link to="/update">
                                                <button
                                                    className='btn-success'
                                                    onClick={() => setToLocalStorage(
                                                        eachData.id,
                                                        eachData.name,
                                                        eachData.email
                                                    )}
                                                >
                                                    Edit
                                                </button>
                                            </Link>
                                        </td>
                                        <td>
                                            <button
                                                className='btn-danger'
                                                onClick={() => handleDelete(eachData.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </>
                        );
                    })
                }
            </table>
        </>
    )
}

export default Read