import React, { useState, useEffect } from 'react'
export default function Pagination(props) {
    const [pageSize, setPageSize] = useState(10)
    const [pageChange, setpageChange] = useState(1)
    const paginationindex = [10, 20, 30, 40, 50, 100, 500, 1000,]
    const totalCount = props.pagination.totalCount
    const handlePerRowChange = props.handlePerRowsChange
    const handlePageChange = props.handlePageChange
    let totalPage =
        totalCount === 0
            ? 1
            : (totalCount / pageSize) % 1 === 0
                ? totalCount / pageSize
                : parseInt(totalCount / pageSize) + 1

    useEffect(() => {
        if (props.pagination.pageSize !== pageSize)
            setPageSize(props.pagination.pageSize)
    }, [props.pagination.pageSize])

    const Pages = (e, status) => {
        e.preventDefault()
        if (status === 'previous') {
            // previousPage();
            setpageChange(pageChange - 1)
            if (handlePageChange) {
                handlePageChange(pageChange - 1)
            } else {
                alert('Please Contact BellMedex', '', 'info')
            }
        } else if (status === 'forward') {
            // nextPage();
            setpageChange(pageChange + 1)
            if (handlePageChange) {
                handlePageChange(pageChange + 1)
            } else {
                alert('Please Contact BellMedex', '', 'info')
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
                alert('Please Contact BellMedex', '', 'info')
            }
        } else if (status === 'gotopre') {
            // gotoPage(pageCount - 1);
            setpageChange(1)
            if (handlePageChange) {
                handlePageChange(1)
            } else {
                alert('Please Contact BellMedex', '', 'info')
            }
        } else {
        }
    }

    return (
        <div className="row mt-2">
            {/* <div className="col-md-6"></div> */}
            <div className="col-md-6 text-left">
                <span className="p-2">
                    Showing {pageChange} to {totalPage} of Pages
                </span>
            </div>
            <div className="col-md-6 text-right">
                <ul className="pagination">
                    <li
                        className={
                            pageChange === 1
                                ? 'paginate_button page-item previous disabled'
                                : 'paginate_button page-item previous'
                        }
                        id="DataTables_Table_0_previous"
                    >
                        <a
                            href="#/"
                            aria-controls="DataTables_Table_0"
                            className="page-link"
                            onClick={(e) => Pages(e, 'previous')}
                        >
                            Previous
                        </a>
                    </li>
                    {props.listOfpages &&
                        props.listOfpages.slice(0, 10).map((info, index) => {
                            return (
                                <>
                                    <li className="paginate_button page-item ">
                                        <a
                                            aria-controls="DataTables_Table_0"
                                            className="page-link"
                                            onClick={(e) => handlePageChange(info)}
                                        >
                                            {info}
                                        </a>
                                    </li>
                                </>
                            )
                        })}

                    <li
                        className={
                            totalCount === 0
                                ? 'paginate_button page-item next disabled'
                                : pageChange === totalPage
                                    ? 'paginate_button page-item next disabled'
                                    :
                                    'paginate_button page-item next '
                        }
                        id="DataTables_Table_0_next"
                    >
                        <a
                            aria-controls="DataTables_Table_0"
                            className="page-link"
                            onClick={(e) => Pages(e, 'forward')}
                        >
                            Next
                        </a>
                    </li>
                    <li className="paginate_button page-item next">
                        <select
                            value={pageSize}
                            onChange={(e) => {
                                setPageSize(Number(e.target.value))
                                if (handlePerRowChange) {
                                    handlePerRowChange(Number(e.target.value), 1)
                                } else {
                                    alert('Please Contact BellMedex', '', 'info')
                                }
                                setpageChange(1)
                            }}
                            className="tablePaginationDropDown"
                        >
                            {paginationindex.map((pageSize) => (
                                <option key={pageSize} value={pageSize}>
                                    {pageSize}
                                </option>
                            ))}
                        </select>
                    </li>
                </ul>
            </div>
        </div>
    )
}
