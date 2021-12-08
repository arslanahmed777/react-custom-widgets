import React from 'react'
import { useNamedState } from "../../hooks/useNamedState"
import nodes from "./nodes"
import Tree from "./Tree"
import { FaChevronRight, FaChevronDown, FaFolder, FaFolderOpen } from "react-icons/fa";

const GetUniqueFiles = (e, oldfiles) => {
    let files = e.target.files
    let uniqueFiles = oldfiles
    for (let i = 0; i < files.length; i++) {
        const isFileExist = uniqueFiles.find((existingFile) => existingFile.name === files[i].name)
        if (isFileExist) {
            console.log("EXISTED FILE:", files[i]);
        }
        else {
            uniqueFiles.push(files[i])
        }
    }
    return uniqueFiles
}
const GetBase64 = (file, cb) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
        cb(reader.result)
    };
    reader.onerror = function (error) {
        console.log('Error: ', error);
    };
}

const MultipleFileUploader = (files) => {
    if (files.length > 0) {
        let updatedFilesArr = [];
        for (let i = 0; i < files.length; i++) {
            GetBase64(files[i], (result) => {
                let obj = { name: files[i].name, file: result }
                updatedFilesArr.push(obj)
            });
        }
        return updatedFilesArr;
    }
};
const TreeView = () => {
    const [Nodes, setNodes] = useNamedState("Nodes", nodes)
    const [expanded, setExpanded] = useNamedState("expanded", [])
    const [attatchments, setAttatchments] = useNamedState("attatchments", [])
    const [base64Attatchments, setBase64Attatchments] = useNamedState("base64Attatchments", [])
    const handleExpand = (newArray) => {
        console.log("handleExpand", newArray);
        setExpanded([...newArray])
    }
    const handleCheck = (treeNodes) => {
        console.log("handleCheck", treeNodes);
        setNodes([...treeNodes])
    }

    const handeleSave = (chklist) => {
        console.log("handeleSave", chklist);
    }
    const onUploadChange = (e) => {
        const uniquefiles = GetUniqueFiles(e, attatchments)
        setAttatchments([...uniquefiles])
        const base64atts = MultipleFileUploader(uniquefiles)
        setBase64Attatchments(base64atts)
        console.log("base64atts", base64atts);



    };
    return (
        <div className="container">
            <div className="row g-0 mt-3 d-flex justify-content-center">
                <div className="col-lg-12 text-left   bg-dark ">
                    <Tree
                        filternodes={Nodes}
                        expanded={expanded}
                        handleExpand={handleExpand}
                        changeState={handleCheck}
                    //saveTree={handeleSave}
                    // column={12}
                    // savebtnClass={"btn btn-success"}
                    // expandIcon={<FaFolderOpen style={{ color: "#e6c300" }} />}
                    // compressIcon={< FaFolder style={{ color: "#e6c300" }} />}
                    // fontSize={"18px"}
                    // backgroundColor={"lightblue"}
                    // color={"black"}
                    // horizontalSpacing={"14px"}
                    // verticalSpacing={"5px"}
                    // borderLeft={"1px dotted red"}
                    // allowCheck={false}
                    />
                </div>
                <div className="col-12">
                    <input onChange={onUploadChange} type="file" multiple />
                    <ul>
                        {attatchments && attatchments.length > 0 ?
                            attatchments.map((item, i) => {
                                return (
                                    <li key={i}>{item.name}</li>
                                )
                            })
                            : <li>No Files</li>}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default TreeView
