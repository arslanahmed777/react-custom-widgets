import React from 'react'
import Tree from "./Tree"
import { FaFolder } from "react-icons/fa";
const treeData = [
    {
        key: "0",
        label: "Documents",
        icon: <FaFolder />,
        title: "Documents Folder",
        children: [
            {
                key: "0-0",
                label: "Document 1-1",
                icon: "fa fa-folder",
                title: "Documents Folder",
                children: [
                    {
                        key: "0-1-1",
                        label: "Document-0-1.doc",
                        icon: "fa fa-file",
                        title: "Documents Folder",
                    },
                    {
                        key: "0-1-2",
                        label: "Document-0-2.doc",
                        icon: "fa fa-file",
                        title: "Documents Folder",
                    },
                    {
                        key: "0-1-3",
                        label: "Document-0-3.doc",
                        icon: "fa fa-file",
                        title: "Documents Folder",
                    },
                    {
                        key: "0-1-4",
                        label: "Document-0-4.doc",
                        icon: "fa fa-file",
                        title: "Documents Folder",
                    },
                ],
            },
        ],
    },
    {
        key: "1",
        label: "Desktop",
        icon: <FaFolder />,
        title: "Desktop Folder",
        children: [
            {
                key: "1-0",
                label: "document1.doc",
                icon: "fa fa-file",
                title: "Documents Folder",
            },
            {
                key: "0-0",
                label: "documennt-2.doc",
                icon: "fa fa-file",
                title: "Documents Folder",
            },
        ],
    },
    {
        key: "2",
        label: "Downloads",
        icon: <FaFolder />,
        title: "Downloads Folder",
        children: [],
    },
];
const TreeView = () => {
    return (
        <div>
            <div className="row mt-3 d-flex justify-content-center">
                <div className="col-lg-8 text-left text-white bg-dark ">
                    <Tree data={treeData} />
                </div>
            </div>
        </div>
    )
}

export default TreeView
