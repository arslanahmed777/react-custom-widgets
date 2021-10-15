import React, { useState } from 'react'
import { useSelector } from "react-redux";
import { selectCurrentUser } from '../redux/User/User.Selectors';
import { store } from '../redux/Store'

const UpdateProfilePage = () => {
    const { user } = useSelector(selectCurrentUser);
    const [userobj, setUserobj] = useState({ name: user.name, email: user.email, password: user.password })

    const handleChange = (e) => {
        const { name, value } = e.target
        setUserobj({ ...userobj, [name]: value })
    }


    const handleSubmit = (e) => {
        e.preventDefault()
        //dispatch(signUpStart(signupobj))
        let token = store.getState().user.currentUser.token;
        console.log(token);
    }


    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-4 ">
                    <form onSubmit={(e) => handleSubmit(e)}>
                        <div className="form-floating mb-3">
                            <input value={userobj.name} onChange={(e) => handleChange(e)} type="text" className="form-control" placeholder="name" name="name" id="name" required />
                            <label htmlFor="name">Username</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={userobj.email} onChange={(e) => handleChange(e)} type="email" className="form-control " placeholder="email" name="email" id="email" required />
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input value={userobj.password} onChange={(e) => handleChange(e)} type="password" className="form-control " placeholder="***" name="password" id="password" required />
                            <label htmlFor="password">Password</label>
                        </div>
                        <div className="d-grid gap-2">
                            <button className="btn btn-primary" type="submit">
                                Update
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}

export default UpdateProfilePage
