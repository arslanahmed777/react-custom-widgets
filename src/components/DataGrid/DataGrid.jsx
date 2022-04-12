import React, { useState, useMemo } from "react";
import Grid, { SelectColumn } from "react-data-grid";

import isNull from "./null-checking";
import TableLoader from "./TableLoader";
import Pagination from "./Pagination";

const DataGrid = (props) => {
    const [loadingMoreRows, setLoadingMoreRows] = useState(false);
    const [sortColumns, setSortColumns] = useState([]);
    const [noRows, setNoRows] = useState(false);
    const [pageNo, setPageNo] = useState(1);
    const [unSortedRows, setUnSortedRows] = useState([]);

    const rows = props.rows?.slice(0);
    const tableColumns = props.selectColumn
        ? [SelectColumn, ...props.columns]
        : props.columns;

    const checkFieldType = (columnName) => {
        var date = Date.parse(columnName);
        if (isNaN(date)) return false;
        else return true;
    };

    const sortedRows = useMemo(() => {
        setLoadingMoreRows(false);
        if (sortColumns.length === 0) {
            if (props.onScrollPagination) {
                return [...unSortedRows, ...props.rows];
            } else {
                return props.rows;
            }
        }
        let previousIndex = "";
        let nextIndex = "";
        const comparer = (a, b) => {
            let isDateColumn = false;
            //////// For Link Fields ////////

            if (
                !isNull(b[sortColumns[0].columnKey]) &&
                !isNull(b[sortColumns[0].columnKey].props)
            ) {
                isDateColumn = checkFieldType(b[sortColumns[0].columnKey].props.title);
                if (isDateColumn === true) {
                    previousIndex = new Date(a[sortColumns[0].columnKey].props.title);
                    nextIndex = new Date(b[sortColumns[0].columnKey].props.title);
                } else {
                    previousIndex = isNull(a[sortColumns[0].columnKey].props.title)
                        ? ""
                        : a[sortColumns[0].columnKey].props.title;
                    nextIndex = isNull(b[sortColumns[0].columnKey].props.title)
                        ? ""
                        : b[sortColumns[0].columnKey].props.title;
                }
                if (sortColumns[0].direction === "ASC") {
                    return previousIndex > nextIndex ? 1 : -1;
                } else if (sortColumns[0].direction === "DESC") {
                    return previousIndex < nextIndex ? 1 : -1;
                }
            }
            //////// For simple Fields////////
            else {
                isDateColumn = checkFieldType(b[sortColumns[0].columnKey]);
                if (isDateColumn === true) {
                    previousIndex = new Date(a[sortColumns[0].columnKey]);
                    nextIndex = new Date(b[sortColumns[0].columnKey]);
                } else {
                    previousIndex = isNull(a[sortColumns[0].columnKey])
                        ? ""
                        : a[sortColumns[0].columnKey];
                    nextIndex = isNull(b[sortColumns[0].columnKey])
                        ? ""
                        : b[sortColumns[0].columnKey];
                }
                if (sortColumns[0].direction === "ASC") {
                    return previousIndex > nextIndex ? 1 : -1;
                } else if (sortColumns[0].direction === "DESC") {
                    return previousIndex < nextIndex ? 1 : -1;
                }
            }
        };
        let filterRows = props.onScrollPagination
            ? [...unSortedRows, ...props.rows]
            : rows;
        const sortRows =
            sortColumns.direction === "NONE" ? filterRows : filterRows.sort(comparer);

        return sortRows;
    }, [props.rows, sortColumns]);

    const rowKeyGetter = (row) => {
        return row.id;
    };

    const isAtBottom = ({ currentTarget }) => {
        return (
            currentTarget.scrollTop + 10 >=
            currentTarget.scrollHeight - currentTarget.clientHeight
        );
    };

    const handleScroll = async (event) => {
        let newRows = [...unSortedRows, ...props.rows];
        if (rows.length !== 0) {
            if (loadingMoreRows || !isAtBottom(event)) {
                setNoRows(false);
            } else if (newRows.length !== props.totalCount) {
                setLoadingMoreRows(true);
                // let getRowsLength = rows.length + props.pageSize
                setUnSortedRows(newRows);
                setPageNo(pageNo + 1);
                await props.getMoreRows(pageNo + 1);
            } else {
                setLoadingMoreRows(false);
                setNoRows(true);
            }
        }
    };

    const summaryRows = sortedRows.length !== 0 ? [sortedRows] : null;

    return (
        <React.Fragment>
            <div style={{ position: "relative" }}>
                <Grid
                    rowKeyGetter={rowKeyGetter}
                    summaryRows={props.fixedFooter ? summaryRows : null}
                    columns={tableColumns}
                    rows={sortedRows}
                    sortColumns={sortColumns}
                    onSortColumnsChange={setSortColumns}
                    selectedRows={props.selectedRows}
                    onSelectedRowsChange={props.onSelectedRowsChange}
                    onScroll={props.onScrollPagination ? handleScroll : null}
                    style={{
                        height: rows.length === 0 ? "100px" : "100%",
                        maxHeight: props.height ? props.height : "330px",
                        overflowY:
                            !props.onScrollPagination && rows.length <= 10 ? "hidden" : "",
                    }}
                    rowHeight={30}
                    className={props.dynamicClass ? props.dynamicClass : ""}
                />

                {loadingMoreRows && (
                    <div
                        style={{
                            width: " 180px",
                            padding: "8px 16px",
                            position: "absolute",
                            bottom: "8px",
                            right: "8px",
                            color: "white",
                            lineHeight: "35px",
                            background: "rgb(0 0 0 / 0.6)"
                        }}
                    >
                        Loading More Rows...
                    </div>
                )}
                {noRows && (
                    <div
                        style={{
                            width: " 180px",
                            padding: "8px 16px",
                            position: "absolute",
                            bottom: "8px",
                            right: "8px",
                            color: "white",
                            lineHeight: "35px",
                            background: "rgb(0 0 0 / 0.6)",
                        }}
                    >
                        No more rows
                    </div>
                )}
                {props.isLoading || sortedRows.length === 0 ? (
                    <div
                        style={{
                            position: "absolute",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -20%)",
                        }}
                    >
                        <TableLoader
                            isLoading={loadingMoreRows ? false : props.isLoading}
                            dataLength={sortedRows.length}
                        // customMessage={props.customMessage}
                        />
                    </div>
                ) : null}
                {props.manualPagination && sortedRows.length > 0 ? (
                    <Pagination
                        handlePerRowsChange={props.handlePerRowsChange}
                        handlePageChange={props.handlePageChange}
                        pagination={props.pagination}
                    />
                ) : null}
            </div>
        </React.Fragment>
    );
};

export default DataGrid
