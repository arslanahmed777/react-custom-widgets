import React, { useState } from 'react'
import Table from '../components/Table/Table'
import Mock_Data from "../utils/data.json"

const TablePage = () => {
    const [data] = useState(Mock_Data)
    const columns = [
        {
            Header: 'ID',
            accessor: 'id',
            Footer: 'ID',
            Cell: ((row) => {
                return (
                    <>
                        <div className="dropdown">
                            <div id="userdropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                sdfsdfsd
                            </div>
                            <ul class="dropdown-menu" aria-labelledby="userdropdown">
                                <li><a class="dropdown-item" href="#">Action</a></li>
                                <li><a class="dropdown-item" href="#">Another action</a></li>
                                <li><a class="dropdown-item" href="#">Something else here</a></li>
                            </ul>
                        </div>

                    </>
                )
            })
        },
        { Header: 'First Name', accessor: 'first_name', Footer: 'First Name', },
        { Header: 'Last Name', accessor: 'last_name', Footer: 'Last Name', },
        { Header: 'Email', accessor: 'email', Footer: 'Email', },
        { Header: 'Gender', accessor: 'gender', Footer: 'Gender', },
        { Header: 'IP Address', accessor: 'ip_address', Footer: 'IP Address', },
    ]
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 border">
                    <Table columns={columns} data={data} />
                </div>
            </div>


        </div>
    )
}

export default TablePage
