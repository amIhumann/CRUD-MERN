import { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import ReadOnlyRows from './ReadOnlyRows'
import EditInline from './EditInline'
import Swal from 'sweetalert2'
import Navigation from './Navigation'
import jwt_decode from 'jwt-decode'
import { refreshToken, useLocalStorage } from './utils'


const ProductList = ({ msg, setMsg }) => {
    const [products, setProducts] = useState([])
    const [editProduct, setEditProduct] = useState(null)
    const [title, setTitle] = useState('')
    const [price, setPrice] = useState('')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [name, setName] = useLocalStorage('name', '')
    const navigate = useNavigate()

    useEffect(() => {
        getProducts()
        refreshToken(setToken, setName, setExpire, navigate)
    }, [])


    const getProducts = async () => {
        const response = await axios.get('http://localhost:5000/products')
        setProducts(response.data)
        setTimeout(() => setMsg(''), 7500)
    }
    // const DeleteProduct = async (id) => {
    //     await axios.delete(`http://localhost:5000/products/${id}`)
    //     getProducts()
    // }
    const editClick = (e, product) => {
        e.preventDefault()
        setEditProduct(product.id)
    }
    const updateProduct = async (e) => {
        e.preventDefault()
        await axios.patch(`http://localhost:5000/products/${editProduct}`, {
            title: title,
            price: price
        }).then((response) => setMsg(response.data.message))
        setEditProduct(null)
        getProducts()
    }
    const deleteMulti = (e) => {
        e.preventDefault()
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then(async (result) => {
            if (result.isConfirmed) {
                let arrayids = [];
                products.forEach(d => {
                    if (d.select) {
                        arrayids.push(d.id);
                    }
                });
                await axios.delete('http://localhost:5000/products/' + arrayids).then((response) => {
                    Swal.fire(
                        'Deleted!',
                        response.data.message,
                        'success'
                    )
                })
            }

            getProducts()
        })
    }
    return (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <Navigation />
                <div className="col-7 mt-5">
                    <Link to='/users' className="btn btn-primary mb-2 me-2">Add</Link>
                    <button onClick={deleteMulti} className="btn btn-danger mb-2">Delete</button>
                    {(msg.length !== 0) ? <div className="alert alert-success fw-bold text-center" role="alert">{msg}</div> : null}
                    <form onSubmit={updateProduct} >
                        <table className="table table-striped table-bordered text-center">
                            <thead>
                                <tr>
                                    <th>
                                        <input
                                            type="checkbox"
                                            onChange={e => {
                                                let value = e.target.checked;
                                                setProducts(
                                                    products.map(d => {
                                                        d.select = value;
                                                        return d;
                                                    })
                                                );
                                            }}
                                        />
                                    </th>
                                    <th>NO</th>
                                    <th>TITLE</th>
                                    <th>PRICE</th>
                                    <th>ACTIONS</th>
                                </tr>
                            </thead>
                            <tbody >
                                {products.map((product, i) => (
                                    <Fragment>
                                        {editProduct === product.id ? (
                                            <EditInline
                                                i={i}
                                                setEditProduct={setEditProduct}
                                                id={editProduct}
                                                title={title}
                                                setTitle={setTitle}
                                                price={price}
                                                setPrice={setPrice}
                                            />) : (
                                            <ReadOnlyRows
                                                i={i}
                                                data={product}
                                                edit={editClick}
                                                setProducts={setProducts}
                                                products={products}
                                            />)
                                        }
                                    </Fragment>
                                ))}
                            </tbody>
                        </table>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ProductList
