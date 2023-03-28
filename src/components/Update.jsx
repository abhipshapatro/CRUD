import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Update = () => {

    const [id, setId] = useState(0);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const navigate = useNavigate();


    const handleUpdate = (e) => {
        e.preventDefault();
        axios.put(`https://6423008d001cb9fc20359c6d.mockapi.io/crud/${id}`,
            {
                name: name,
                email: email
            }
        ).then(() => {
            navigate("/read");
        });
    }

    useEffect(() => {
        setId(localStorage.getItem("id"));
        setName(localStorage.getItem("name"));
        setEmail(localStorage.getItem("email"));
    }, [])


    return (
        <>
            <h5>UPDATE Operation</h5>
            <form>
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        value={name}
                        className="form-control"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email address</label>
                    <input
                        type="email"
                        value={email}
                        className="form-control"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-primary mx-2"
                    onClick={handleUpdate}
                >
                    Update
                </button>
                <Link to="/read">
                    <button
                        className="btn btn-secondary mx-2"
                    >
                        Back
                    </button>
                </Link>
            </form>
        </>
    )
}

export default Update