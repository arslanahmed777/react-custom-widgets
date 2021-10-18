import React, { useMemo, useEffect } from "react";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    useFilters,
    usePagination,
    useRowSelect,
} from "react-table";
import "./Table.styles.css";

const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef()
        const resolvedRef = ref || defaultRef

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate
        }, [resolvedRef, indeterminate])

        return (
            <>
                <input type="checkbox" ref={resolvedRef} {...rest} />
            </>
        )
    },
)

const Table = (props) => {
    const columns = props.columns;
    const data = props.data;
    const GlobalFilterComponent = props.globalFilterComponent;
    const ColumnFilterComponent = props.columnFilterComponent || "";
    const pagination = props.pagination;
    const rowSelection = props.rowSelection
    const handleRowClicked = props.handleRowClicked

    const defaultColumn = useMemo(() => {
        return { Filter: ColumnFilterComponent };
    }, [ColumnFilterComponent]);

    const tableInstance = useTable(
        { columns, data, defaultColumn },
        useFilters,
        useGlobalFilter,
        useSortBy,
        usePagination,
        useRowSelect,
        (hooks) => {
            // console.log(hooks.visibleColumns);
            if (rowSelection) {
                hooks.visibleColumns.push((columns) => [
                    {
                        id: 'selection',
                        Header: ({ getToggleAllRowsSelectedProps }) => {

                            return (
                                <div>
                                    <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                                </div>
                            )

                        }, Cell: ({ row }) => (
                            <div>
                                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                            </div>
                        ),

                    },
                    ...columns,
                ])
            }

        },
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
        selectedFlatRows
    } = tableInstance;

    const { globalFilter, pageIndex } = state;
    const haveFooterValues = footerGroups[0].headers.some(
        (fG) => typeof fG["Footer"] === "string"
    );

    const tablerows = pagination ? page : rows;


    useEffect(() => {
        if (handleRowClicked) {
            rowSelected()
        }
    }, [selectedFlatRows])

    const rowSelected = () => {
        handleRowClicked(selectedFlatRows)
    }

    console.log("Table component run");
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
                                        {headerGroup.headers.map((column, i) => {
                                            return (
                                                <th
                                                    {...column.getHeaderProps(
                                                        column.getSortByToggleProps()
                                                    )}
                                                >
                                                    {headerGroup.headers.length - 1 === i ?
                                                        (
                                                            <>
                                                                {column.render("Header")}
                                                                <div>{column.canFilter ? column.render("Filter") : null}</div>
                                                            </>
                                                        ) :
                                                        (
                                                            <>
                                                                {column.render("Header")}
                                                                <span>{column.isSorted ? column.isSortedDesc ? " 🔽" : " 🔼" : ""}</span>
                                                                <div>{column.canFilter ? column.render("Filter") : null}</div>
                                                            </>
                                                        )
                                                    }
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

function chkStateProps(prevProps, nextProps) {
    console.log("prevProps", prevProps);
    console.log("nextProps", nextProps);
    if (
        prevProps.data === nextProps.data &&
        prevProps.pagination === nextProps.pagination &&
        prevProps.rowSelection === nextProps.rowSelection
    ) {
        return false
    } else {
        return false
    }
}

export default React.memo(Table, chkStateProps);
