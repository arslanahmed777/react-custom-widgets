import React, { useMemo } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  useFilters,
  usePagination,
} from "react-table";
import "./Table.styles.css";

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
const Table = (props) => {
  const columns = props.columns;
  const data = props.data;
  const GlobalFilterComponent = props.globalFilterComponent;
  const ColumnFilterComponent = props.columnFilterComponent || "";
  const pagination = props.pagination;

  const defaultColumn = useMemo(() => {
    return { Filter: ColumnFilterComponent };
  }, [ColumnFilterComponent]);

  const tableInstance = useTable(
    { columns, data, defaultColumn },
    useFilters,
    useGlobalFilter,
    useSortBy,
    usePagination
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    page,
    prepareRow,
    footerGroups,
    state,
    setGlobalFilter,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
  } = tableInstance;

  const { globalFilter, pageIndex } = state;
  const haveFooterValues = footerGroups[0].headers.some(
    (fG) => typeof fG["Footer"] === "string"
  );

  const tablerows = pagination ? page : rows;
  return (
    <>
      {GlobalFilterComponent && (
        <GlobalFilterComponent
          filter={globalFilter}
          setFilter={setGlobalFilter}
        />
      )}

      <div className="tableheighcalc">
        <div className="table-scroll">
          <table className="table border " {...getTableProps()}>
            <thead>
              {headerGroups.map((headerGroup) => {
                return (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map((column) => {
                      return (
                        <th
                          {...column.getHeaderProps(
                            column.getSortByToggleProps()
                          )}
                        >
                          {column.render("Header")}
                          <span>
                            {column.isSorted
                              ? column.isSortedDesc
                                ? "F"
                                : "d"
                              : ""}
                          </span>
                          <div>
                            {column.canFilter ? column.render("Filter") : null}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                );
              })}
            </thead>
            <tbody {...getTableBodyProps()}>
              {tablerows.map((row, i) => {
                prepareRow(row);
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map((cell, i) => {
                      return (
                        <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
            {haveFooterValues && (
              <tfoot>
                {footerGroups.map((footergroup) => (
                  <tr {...footergroup.getFooterGroupProps()}>
                    {footergroup.headers.map((column) => (
                      <td {...column.getFooterProps()}>
                        {column.render("Footer")}
                      </td>
                    ))}
                  </tr>
                ))}
              </tfoot>
            )}
          </table>
        </div>
      </div>
      {pagination && (
        <div>
          <span>
            Page{" "}
            <strong>
              {pageIndex + 1} of {pageOptions.length}
            </strong>{" "}
          </span>
          <button
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
            className="btn btn-success"
          >
            Previous
          </button>
          <button
            onClick={() => nextPage()}
            disabled={!canNextPage}
            className="btn btn-danger"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
};

export default React.memo(Table);
