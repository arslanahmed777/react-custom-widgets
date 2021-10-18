import React, { useState } from "react";
import Table from "../components/Table/Table";
import Mock_Data from "../utils/data.json";

import { useAsyncDebounce } from "react-table";

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
  const [data] = useState(Mock_Data);
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
    { Header: "IP Address", accessor: "ip_address" },
  ];
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
          />
        </div>
      </div>
    </div>
  );
};

export default TablePage;
