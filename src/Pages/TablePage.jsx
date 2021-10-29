import React, { useState, useEffect } from "react";
import Table from "../components/Table/Table";
import Mock_Data from "../utils/data.json";
import { useAsyncDebounce } from "react-table";
import { useNamedState } from "../hooks/useNamedState"
import { Compare } from '../utils/functions'
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
    const [data, setData] = useNamedState("Table Data", Mock_Data);
    const columns = [
        {
            Header: "ID",
            accessor: "id",
            disableFilters: true,
            Footer: "id",
        },
        { Header: "First Name", accessor: "first_name" },
        { Header: "Last Name", accessor: "last_name" },
        { Header: "Email", accessor: "email" },
        { Header: "Gender", accessor: "gender" },
        { Header: "IP Address", accessor: "ip_address", disableFilters: true, },
    ];

    const handleRowClicked = (event) => {

        const newarr = event.map((e) => {
            return e.original
        })

        console.log("newarr", newarr);

        let oldarr = data;

        console.log("oldarr", oldarr);

        var updatedarray3 = Compare(oldarr, newarr, "id", "complement")
        console.log("updatedarray3", updatedarray3);
        if (newarr.length > 0) {
            setData(updatedarray3)
        }

    }


    useEffect(() => {
        const fetchData = async () => {
            const params = { PerPage: 10, pageNo: 1 }
            const data = await callApi("testdata", "post", params)
            console.log(data);
        }

        fetchData()
    }, [])
    console.log("TablePage component run");
    return (
        <div className="container">
            <div className="row">
                <div className="col-md-8 border">
                    <Table
                        columns={columns}
                        globalFilterComponent={GlobalFilter}
                        columnFilterComponent={ColumnFilter}
                        data={data}
                        pagination={true}
                        rowSelection={true}
                        handleRowClicked={handleRowClicked}
                    />
                </div>
            </div>
        </div>
    );
};

export default TablePage;
