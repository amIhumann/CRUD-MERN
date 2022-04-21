import React from 'react'
// import { Link } from 'react-router-dom'

const ReadOnlyRows = (props) => {
    const product = props.data
    let i = props.i
    return (
        <tr key={product.id}>
            <td>
                <input type="checkbox"
                    checked={product.select}
                    onChange={e => {
                        let value = e.target.checked;
                        props.setProducts(
                            props.products.map((sd) => {
                                if (sd.id === product.id) {
                                    sd.select = value;
                                }
                                return sd;
                            })
                        );
                    }}
                />
            </td>
            <td>{i += 1}</td>
            <td>{product.title}</td>
            <td>{product.price}</td>
            <td>
                {/* <Link to={`/edit/${product.id}`} className="btn btn-info mx-2">Edit</Link> */}
                <button className="btn btn-info mx-2" onClick={(e) => props.edit(e, product)}>Edit</button>
                {/* <button onClick={() => props.delete(product.id)} className="btn btn-danger">Delete</button> */}
            </td>
        </tr>
    )
}

export default ReadOnlyRows
