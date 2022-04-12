import React from 'react'
import DataGrid from '../components/DataGrid/DataGrid'

const DataGridPage = () => {
    const Data = [
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },

        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },

        {
            'planFollowUpID': 74358,
            'entryDate': "03/03/2022",
            'visitID': 588760,
        },
    ]

    const GridCol = [
        {
            name: 'FOLLOW UP #',
            key: 'planFollowUpID',
            sortable: true,
            formatter({ row }) {
                return (
                    <>
                        <div onClick={(() => { alert("Asdf") })}  >asdfsad</div>
                    </>
                )
            },
        },
        {
            name: 'ENTRY DATE',
            key: 'entryDate',
            sortable: true,
        },
        {
            name: 'VISIT #',
            key: 'visitID',
            sortable: true,
        },


    ]
    return (
        <div>
            <DataGrid

                columns={GridCol} //required
                rows={Data} //required
                isLoading={false} //required
            />
        </div>
    )
}

export default DataGridPage