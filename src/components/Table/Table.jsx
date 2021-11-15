import React, { useMemo, useState, useEffect } from "react";
import {
    useTable,
    useSortBy,
    useGlobalFilter,
    useFilters,
    usePagination,
    useRowSelect,
    useExpanded,
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
    //Here you define state to handle pageIndex
    const [pageChange, setpageChange] = useState(1)

    const columns = props.columns;
    const data = props.data;
    const GlobalFilterComponent = props.globalFilterComponent;
    const ColumnFilterComponent = props.columnFilterComponent || "";
    const pagination = props.pagination;
    const rowSelection = props.rowSelection
    const handleRowClicked = props.handleRowClicked
    const handlePageChange = props.handlePageChange
    const handlePerRowChange = props.handlePerRowsChange
    const totalCount = props.totalCount
    const rowsPerPage = props.rowsPerPage

    const paginationindex = [10, 20, 30, 40, 50, 100, 200, 500, 800, 1000]

    const defaultColumn = useMemo(() => {
        return { Filter: ColumnFilterComponent };
    }, [ColumnFilterComponent]);

    const tableInstance = useTable(
        { columns, data, defaultColumn, initialState: { pageSize: rowsPerPage ? rowsPerPage : 10 } },
        useFilters,
        useGlobalFilter,
        useSortBy,
        useExpanded,
        usePagination,
        useRowSelect,
        (hooks) => {

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
        setPageSize,
        prepareRow,
        visibleColumns,
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

    const { globalFilter, pageIndex, pageSize } = state;
    const haveFooterValues = footerGroups[0].headers.some(
        (fG) => typeof fG["Footer"] === "string"
    );
    // useEffect(() => {
    //     controlPagination()
    // }, [props.toRestTable])
    // to handle the pagination..
    // const controlPagination = () => {
    //     setpageChange(1)
    //     setPageSize(10)
    // }


    const tablerows = pagination ? page : rows;


    useEffect(() => {
        if (handleRowClicked) {
            rowSelected()
        }
        console.log("useEffect run");
    }, [selectedFlatRows])

    const rowSelected = () => {
        handleRowClicked(selectedFlatRows)
    }

    const Pages = (e, status) => {
        e.preventDefault()
        if (status === 'previous') {
            // previousPage();
            setpageChange(pageChange - 1)
            if (handlePageChange) {
                handlePageChange(pageChange - 1)
            } else {
                console.log('Please Contact BellMedex', '', 'info')
            }
        } else if (status === 'forward') {
            // nextPage();

            setpageChange(pageChange + 1)
            if (handlePageChange) {
                handlePageChange(pageChange + 1)
            } else {
                console.log('Please Contact BellMedex', '', 'info')
            }
        } else if (status === 'gotonext') {
            // gotoPage(0);
            let totalPage =
                (totalCount / pageSize) % 1 === 0
                    ? totalCount / pageSize
                    : parseInt(totalCount / pageSize) + 1
            setpageChange(totalPage)
            if (handlePageChange) {
                handlePageChange(totalPage)
            } else {
                console.log('Please Contact BellMedex', '', 'info')
            }
        } else if (status === 'gotopre') {
            // gotoPage(pageCount - 1);
            setpageChange(1)
            if (handlePageChange) {
                handlePageChange(1)
            } else {
                console.log('Please Contact BellMedex', '', 'info')
            }
        } else {
            console.log('Click not found')
        }
    }
    let totalPage =
        totalCount === 0
            ? 1
            : (totalCount / pageSize) % 1 === 0
                ? totalCount / pageSize
                : parseInt(totalCount / pageSize) + 1
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
                                    <React.Fragment key={i}>
                                        <tr {...row.getRowProps()}>
                                            {row.cells.map((cell, i) => {
                                                return (
                                                    <td {...cell.getCellProps()}> {cell.render("Cell")}</td>
                                                );
                                            })}
                                        </tr>
                                        {row.isExpanded ? (
                                            <>
                                                <tr>
                                                    <td colSpan={visibleColumns.length}>
                                                        {props.subTableComp(row)}
                                                    </td>
                                                </tr>
                                            </>
                                        ) : null}
                                    </React.Fragment>
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
                    {/* <span>
                        Page{" "}<strong>{pageIndex + 1} of {pageOptions.length}</strong>{" "}
                    </span> */}
                    <span className="p-2">
                        Showing {pageChange} to {totalPage} of Pages
                    </span>
                    <button onClick={(e) => Pages(e, 'previous')} disabled={pageChange === 1 ? true : false} className="btn btn-success">
                        Previous
                    </button>
                    <button onClick={(e) => Pages(e, 'forward')} disabled={totalCount == 0 ? true : pageChange == totalPage ? true : false} className="btn btn-danger" >
                        Next
                    </button>
                    <div>
                        <select value={pageSize} onChange={(e) => {
                            setPageSize(Number(e.target.value))
                            if (handlePerRowChange) {
                                handlePerRowChange(Number(e.target.value), 1)
                            } else {
                                console.log('Please Contact BellMedex', '', 'info')
                            }

                        }}>
                            {paginationindex.map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </div>
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
        return true
    } else {
        return false
    }
}

export default React.memo(Table, chkStateProps);
