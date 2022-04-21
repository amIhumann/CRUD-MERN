import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate,Link } from 'react-router-dom'

const Login = () => {
    const [msg, setMsg] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const auth = async (e) => {
        e.preventDefault()
        try {
            await axios.post('http://localhost:5000/login', {
                email: email,
                password: password
            })
            navigate('/products')
        } catch (error) {
            if (error.response) setMsg(error.response.data.message)
        }
    }
    return (
        <div className="container-fluid">
            <section className="vh-100" >
                <div className="container py-5 h-100 ">
                    <div className="row d-flex align-items-center justify-content-center h-100">
                        <div className="col-md-8 col-lg-7 col-xl-5">
                            <img src={process.env.PUBLIC_URL + "logo512.png"}
                                className="img-fluid" alt='' />
                        </div>
                        <div className="card col-md-7 col-lg-5 col-xl-6 offset-xl-1">
                            <div className="card-body">
                                {(msg.length !== 0) ? <div className="alert fw-bold text-center" role="alert">{msg}</div> : null}
                                <form onSubmit={auth}>

                                    <div className="form-outline mb-5 mt-3">
                                        <input type="email" id="form1Example13" className="form-control form-control-lg" placeholder='Email@email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                                        {/* <label className="form-label" htmlFor="form1Example13">Email address</label> */}
                                    </div>


                                    <div className="form-outline my-5">
                                        <input type="password" id="form1Example23" className="form-control form-control-lg" placeholder='*******' value={password} onChange={(e) => setPassword(e.target.value)} />
                                        {/* <label className="form-label" htmlFor="form1Example23">Password</label> */}
                                    </div>

                                    <button type="submit" className="btn btn-primary btn-lg btn-block mb-3">Sign in</button>
                                    <div className="d-flex justify-content-around align-items-center mb-2">

                                        {/* <div className="form-check">
                                    <input className="form-check-input" type="checkbox" value="" id="form1Example3" defaultChecked />
                                    <label className="form-check-label" for="form1Example3"> Remember me </label>
                                </div> */}
                                        <a href="#!">Forgot password?</a>
                                    </div>



                                    <div className="divider d-flex align-items-center my-4">
                                        <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                                    </div>
                                    <div className="row justify-content-evenly">
                                        <div className="col">
                                            <a className="btn btn-primary btn-lg btn-block" style={{ backgroundColor: "#3b5998" }} href="#!"
                                                role="button">
                                                <i className="fa fa-facebook-f me"> Continue with Facebook</i>
                                            </a>
                                        </div>
                                        <div className="col">
                                            <a className="btn btn-primary btn-lg btn-block mb-4" style={{ backgroundColor: "#55acee" }} href="#!"
                                                role="button">
                                                <i className="fa fa-twitter me">Continue with Twitter</i>
                                            </a>
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-around align-items-center">
                                        <Link to="/register">Don't have an account yet? Sign Up</Link>
                                    </div>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Login