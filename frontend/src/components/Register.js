import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'
const Register = ({ msg, setMsg }) => {
    const [fName, setFname] = useState('')
    const [lName, setLname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confPassword, setConfPassword] = useState('')
    const name = fName + ' ' + lName
    const navigate=useNavigate()

    const register = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/register', {
                name: name,
                email: email,
                password: password,
                confirmPassword: confPassword
            }).then((response)=>setMsg(response.data.message))
            setTimeout(()=>navigate('/'),10000)
        } catch (error) {
            if(error.response)setMsg(error.response.data.message)
        }
    }
    return (
        <section>
            <div className="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
                <div className="row gx-lg-5 align-items-center mb-5">
                    <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
                        <h1 className="my-5 display-5 fw-bold ls-tight" style={{ color: "hsl(218, 81%, 95%)" }}>
                            The best offer <br />
                            <span style={{ color: "hsl(218, 81%, 75%)" }}>for your business</span>
                        </h1>
                        <p className="mb-4 opacity-70" style={{ color: "hsl(218, 81%, 85%)" }}>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                            Temporibus, expedita iusto veniam atque, magni tempora mollitia
                            dolorum consequatur nulla, neque debitis eos reprehenderit quasi
                            ab ipsum nisi dolorem modi. Quos?
                        </p>
                    </div>

                    <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
                        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
                        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>

                        <div className="card bg-glass">
                            <div className="card-body px-4 py-5 px-md-5">
                                {(msg.length !== 0) ? <div className="alert fw-bold text-center" role="alert">{msg}</div> : null}
                                <form onSubmit={register}>
                                    <div className="row">
                                        <div className="col-md-6 mb-5">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example1" className="form-control" placeholder='First Name' value={fName} onChange={(e) => setFname(e.target.value)} />
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-5">
                                            <div className="form-outline">
                                                <input type="text" id="form3Example2" className="form-control" placeholder='Last Name' value={lName} onChange={(e) => setLname(e.target.value)} />
                                                {/* <label className="form-label" htmlFor="form3Example2">Last name</label> */}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="form-outline mb-5">
                                        <input type="email" id="form3Example3" className="form-control" placeholder='Email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
                                    </div>

                                    <div className="form-outline mb-5">
                                        <input type="password" id="form3Example4" className="form-control" placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                                    </div>
                                    <div className="form-outline mb-5">
                                        <input type="password" id="form3Example6" className="form-control" placeholder='Confirm Password' value={confPassword} onChange={(e) => setConfPassword(e.target.value)} />
                                        {/* <label className="form-label" htmlFor="form3Example5">Confirm Password</label> */}
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-block mb-4">
                                        Sign up
                                    </button>

                                    <div className="text-center">
                                        <p>or sign up with:</p>
                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fa fa-facebook-f"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fa fa-google"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fa fa-twitter"></i>
                                        </button>

                                        <button type="button" className="btn btn-link btn-floating mx-1">
                                            <i className="fa fa-github"></i>
                                        </button>
                                    </div>
                                </form>
                                <div className="divider d-flex align-items-center my-4">
                                    <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                </div>
                                <div className="d-flex justify-content-around align-items-center">
                                    <Link to="/">Already have an Account? Login</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Register