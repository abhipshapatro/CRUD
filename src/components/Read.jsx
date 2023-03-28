import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Read = () => {

    const [data, setData] = useState([]);

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
            <h2>READ Operation</h2>
            <table className="table">
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