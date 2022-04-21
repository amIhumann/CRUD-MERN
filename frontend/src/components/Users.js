import axios from 'axios'
import { Table } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import React, { useEffect, useState } from 'react'
import Navigation from './Navigation'
import { refreshToken, useLocalStorage } from './utils'
import { Link, useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
const Users = ({ }) => {
    const navigate = useNavigate()
    const [name, setName] = useLocalStorage('name', '')
    const [token, setToken] = useState('')
    const [expire, setExpire] = useState('')
    const [users, setUsers] = useState([])
    const [search, setSearch] = useState('')
    const [filteredUser, setFilteredUser] = useState([])
    const axiosJWT = axios.create()

    useEffect(() => {
        refreshToken(setToken, setName, setExpire, navigate)
        getUsers()
    }, [])

    useEffect(() => {
        const result = users.filter((user) => {
            return user.name.toLowerCase().match(search.toLowerCase())
        })
        setFilteredUser(result)
    }, [search])

    const columns = [
        {
            name: 'Name',
            selector: row => row.name,
            sortable: true
        },
        {
            name: 'Email',
            selector: row => row.email,
            sortable: true
        },
        {
            nama: 'Action',
            cell: (row) => {
                <button className='btn btn-primary'
                    onClick={() => alert(row.alpha2Code)}>
                    Edit
                </button>
            },
        }
    ];

    axiosJWT.interceptors.request.use(async (config) => {
        const currentDate = new Date()
        if (expire * 1000 < currentDate.getTime()) {
            const response = await axios.get('http://localhost:5000/token')
            config.headers.Authorization = `Bearer ${response.data.accessToken}`
            setToken(response.data.accessToken)
            const decoded = jwt_decode(response.data.accessToken)
            setName(decoded.name)
            setExpire(decoded.exp)
        }
        return config
    }, (error) => Promise.reject(error))

    const getUsers = async () => {
        const response = await axiosJWT.get('http://localhost:5000/getUser', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setUsers(response.data)
        setFilteredUser(response.data)
    }
    return (
        <div className='container-fluid'>
            <div className="row justify-content-center">
                <Navigation />
                <div className="col-7 mt-5">
                    <Link to='/products' className='btn btn-primary'>Product</Link>
                    {/* <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>NO</th>
                                <th>Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, i) => (
                                <tr key={user.id}>
                                    <td>{i+=1}</td>
                                    <td>{user.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table> */}
                    <DataTable
                        columns={columns}
                        data={filteredUser}
                        pagination
                        fixedHeader
                        fixedHeaderScrollHeight='450px'
                        selectableRows
                        selectableRowsHighlight
                        highlightOnHover
                        // actions={<button className='btn btn-sm btn-info'>a</button>}
                        subHeader
                        subHeaderComponent={
                            <input
                                type='text'
                                placeholder='Search here'
                                className='w-25 form-control'
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        }
                    />
                </div>
            </div>
        </div>
    )
}

export default Users