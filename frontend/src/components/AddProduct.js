import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = ({ setMsg }) => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const navigate = useNavigate()

    const saveProduct = async (e) => {
        e.preventDefault()
        const response = await axios.post('http://localhost:5000/products', {
            title: title,
            price: price
        })
        setMsg(response.data.message)
        navigate("/products")
    }
    return (
        <div className="container-fluid">
            <div className="row justify-content-center mt-5" >
                <div className="col-7">
                    <div>
                        <form onSubmit={saveProduct}>
                            <div className="mb-3">
                                <label htmlFor="exampleInputEmail1" className="form-label">Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputEmail1"
                                    aria-describedby="text"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                ></input>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Price</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="exampleInputPassword1"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                ></input>
                            </div>
                            <button className="btn btn-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddProduct
