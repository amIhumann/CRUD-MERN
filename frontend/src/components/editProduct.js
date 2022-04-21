import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'

const EditProduct = () => {
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const { id } = useParams()
    const navigate = useNavigate()
    const updateProduct = async (e) => {
        e.preventDefault()
        await axios.patch(`http://localhost:5000/products/${id}`, {
            title: title,
            price: price
        })
        navigate("/")
    }

    useEffect(() => {
        const getProductById = async () => {
            await axios.get(`http://localhost:5000/products/${id}`).then((response) => {
                setTitle(response.data[0].title)
                setPrice(response.data[0].price)
            })

        }
        getProductById()
    }, [id])


    return (
        <div>
            <form onSubmit={updateProduct}>
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
                <button className="btn btn-primary">Update</button>
            </form>
        </div>
    )
}

export default EditProduct
