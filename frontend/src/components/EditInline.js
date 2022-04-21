import { useEffect } from 'react'
import axios from 'axios'


const EditInline = ({i, setEditProduct, id, title, setTitle,price,setPrice }) => {
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

        <tr key={i}>
            <td>
                <input
                    type="checkbox"
                    
                />
            </td>
            <td>{i += 1}</td>
            <td>
                <input
                    className="text-center"
                    type="text"
                    required="required"
                    placeholder="title..."
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </td>
            <td>
                <input
                    type="text"
                    placeholder="price..."
                    name="price"
                    className="text-center"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />
            </td>
            <td>
                <button type="submit" className="btn btn-success mx-2">Update</button>
                <button onClick={() => setEditProduct(null)} className="btn btn-danger">Reset</button>
            </td>
        </tr>

    )
}

export default EditInline
