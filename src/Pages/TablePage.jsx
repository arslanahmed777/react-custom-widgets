import React, { useState, useEffect } from "react";
import Table from "../components/Table/Table";
import { useAsyncDebounce } from "react-table";
import { useNamedState } from "../hooks/useNamedState"
import { FormatDate } from '../utils/functions'
import { callApi } from "../utils/call-api"

export const GlobalFilter = ({ filter, setFilter }) => {
    const [value, setValue] = useState(filter);

    const onChanges = useAsyncDebounce((value) => {
        setFilter(value || undefined);
    }, 1000);
    return (
        <div>
            <input
                value={value || ""}
                onChange={(e) => {
                    setValue(e.target.value);
                    onChanges(e.target.value);
                }}
                type="text"
                placeholder="asdf"
            />
        </div>
    );
};

export const ColumnFilter = ({ column }) => {
    const { filterValue, setFilter } = column;
    return (
        <div>
            <input
                value={filterValue || ""}
                onChange={(e) => setFilter(e.target.value)}
                type="text"
                placeholder="asdf"
            />
        </div>
    );
};

const TablePage = () => {
    const [data, setData] = useNamedState("Table Data", []);
    const [fromdate, setFromDate] = useNamedState("From date", FormatDate(new Date(), 'yyyy-mm-dd'));
    const [todate, setToDate] = useNamedState("To date", FormatDate(new Date(), 'yyyy-mm-dd'));
    const [tableModel, setTableModel] = useNamedState("Table Model", { first_name: "arslan", last_name: "ahmed", email: "arslan@gmail.com", gender: "male", access_date: FormatDate(new Date(), 'yyyy-mm-dd') })
    const [currentPage, setCurrentPage] = useNamedState("currentPage", 1)
    const [totalPagesCurrent, setTotalPagesCurrent] = useNamedState("totalPagesCurrent", 0)
    const [rowsPerPage, setRowsPerPage] = useNamedState("rowsPerPage", 10)

    // ********************************** COLUMNS START *********************** 
    const columns = [
        {
            // Make an expander cell
            Header: () => null, // No header
            id: 'expander', // It needs an ID
            width: '10px',
            Cell: ({ row }) => (
                // Use Cell to render an expander for each row.
                // We can use the getToggleRowExpandedProps prop-getter
                // to build the expander.
                <span {...row.getToggleRowExpandedProps()}>
                    {row.isExpanded ? '👇' : '👉'}
                </span>
            ),
        },
        { Header: "First Name", accessor: "first_name", Footer: "First Name" },
        { Header: "Last Name", accessor: "last_name" },
        { Header: "Email", accessor: "email" },
        { Header: "Gender", accessor: "gender" },
        {
            Header: "Access Date",
            accessor: "access_date",
            disableFilters: false,
            Cell: ({ row }) => {
                return (
                    <>
                        {FormatDate(row.original.access_date, 'yyyy-mm-dd')}
                    </>
                )
            },
        },
    ];
    // ********************************** COLUMNS END *********************** 

    const fetchData = async () => {
        console.log("fetchData run");
        const params = { PerPage: rowsPerPage, pageNo: currentPage, param_list: [{ key: "fromdate", value: fromdate }, { key: "todate", value: todate }] }
        try {
            const response = await callApi("testdata/gettestdata", "post", params)
            if (response.length > 0) {
                setTotalPagesCurrent(response[0].total_records)
                setData(response)
            }
        } catch (err) { console.log(err); }
    }

    useEffect(() => {
        fetchData()
        console.log("table page useEffect run");
    }, [currentPage, rowsPerPage])

    const addData = async () => {
        try {
            const response = await callApi("testdata/addtestdata", "post", tableModel)
            console.log("response", response);
            setTableModel({ first_name: "arslan", last_name: "ahmed", email: "arslan@gmail.com", gender: "male", access_date: FormatDate(new Date(), 'yyyy-mm-dd') })
        } catch (err) { console.log(err); }
    }

    // ************************** TABLE CALLBACK PROPS FUNCTIONS START ***************************
    const handlePageChange = (pageno) => {
        console.log("handlePageChange run");
        setCurrentPage(pageno)
    }
    const handlePerRowsChange = (rowsPerPage, pageno) => {
        console.log("handlePerRowsChange run");
        setCurrentPage(pageno)
        setRowsPerPage(rowsPerPage)
    }
    const handleRowClicked = async (rows) => {
        if (rows.length > 0) {
            console.log("event", rows[0].original._id);
            try {
                const response = await callApi(`testdata/deletetestdata/${rows[0].original._id}`, "delete")
                fetchData()
            } catch (err) { console.log(err) }
        }
    }
    const subTableComp = (row) => {
        return (
            <React.Fragment>
                <ul>
                    <li>{row.original.first_name}</li>
                    <li>{row.original.last_name}</li>
                    <li>{row.original.email}</li>
                    <li>{row.original.gender} name</li>
                    <li>{row.original.total_records}</li>
                </ul>
            </React.Fragment>
        )
    }
    // ************************** TABLE CALLBACK PROPS FUNCTIONS END ***************************
    console.log("TablePage component run");
    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mb-5">
                    <h5>Add data</h5>
                    <input onChange={(e) => setTableModel({ ...tableModel, [e.target.name]: e.target.value })} placeholder="First name" type="text" name="first_name" value={tableModel.first_name} />
                    <input onChange={(e) => setTableModel({ ...tableModel, [e.target.name]: e.target.value })} placeholder="Last name" type="text" name="last_name" value={tableModel.last_name} />
                    <input onChange={(e) => setTableModel({ ...tableModel, [e.target.name]: e.target.value })} placeholder="Email" type="email" name="email" value={tableModel.email} />
                    <input onChange={(e) => setTableModel({ ...tableModel, [e.target.name]: e.target.value })} placeholder="Gender" type="text" name="gender" value={tableModel.gender} />
                    <input onChange={(e) => setTableModel({ ...tableModel, [e.target.name]: e.target.value })} placeholder="Access Date" type="date" name="access_date" value={tableModel.access_date} />
                    <button onClick={addData} className="btn btn-primary">Add Data</button>
                </div>
                <div className="col-12 my-4">
                    <div className="row ">
                        <div className="col-4">
                            <label htmlFor="fromdate">From Date</label>
                            <input value={fromdate} onChange={(e) => setFromDate(e.target.value)} id="fromdate" name="fromdate" className="form-control" type="date" />
                        </div>
                        <div className="col-4">
                            <label htmlFor="todate">To Date</label>
                            <input value={todate} onChange={(e) => setToDate(e.target.value)} id="todate" name="todate" className="form-control" type="date" />
                        </div>
                        <div className="col-4 d-flex align-items-end justify-content-end">
                            <div>
                                <button onClick={fetchData} className="btn btn-success">Search</button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="col-md-12 border">
                    <Table
                        columns={columns}
                        globalFilterComponent={GlobalFilter}
                        columnFilterComponent={ColumnFilter}
                        data={data}
                        pagination={true}
                        rowSelection={true}
                        totalPages={totalPagesCurrent}
                        totalCount={totalPagesCurrent}
                        handleRowClicked={handleRowClicked}
                        handlePageChange={handlePageChange}
                        handlePerRowsChange={handlePerRowsChange}
                        rowsPerPage={rowsPerPage}
                        subTableComp={subTableComp}
                    />
                </div>
            </div>
        </div>
    );
};

export default TablePage;
