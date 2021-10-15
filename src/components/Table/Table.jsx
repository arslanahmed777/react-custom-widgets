import React from 'react'
import { useTable } from 'react-table'
import "./Table.styles.css"

const Table = (props) => {
    const columns = props.columns
    const data = props.data
    const tableInstance = useTable({ columns, data },);
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, footerGroups } = tableInstance
    return (
        <div className="tableheighcalc">
            <div className="table-scroll">
                <table className="table border " {...getTableProps()}>
                    <thead>
                        {headerGroups.map((headerGroup) => {
                            return (
                                <tr  {...headerGroup.getHeaderGroupProps()}>
                                    {headerGroup.headers.map((column) => {
                                        return (
                                            <th {...column.getHeaderProps()}>{column.render("Header")}</th>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map((cell, i) => {
                                        return (
                                            <td {...cell.getCellProps()}> {cell.render('Cell')}</td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                    <tfoot>
                        {footerGroups.map((group) => (
                            <tr {...group.getFooterGroupProps()}>
                                {group.headers.map((column) => (
                                    <td {...column.getFooterProps()}>
                                        {column.render('Footer')}
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tfoot>
                </table>
            </div>
        </div>

    )
}

export default React.memo(Table)
