
import React, { useState } from "react";
import "./Tree.css";

// ******************************** CUSTOM HELPER FUNCTIONS *********************


function recursivenode(nodes) {
    nodes.status = !nodes.status
    if (nodes.nodes && nodes.nodes.length > 0) {
        nodes.nodes.forEach(element => {
            element.status = !nodes.status
            recursivenode(element)
        });
    }
    return nodes
}
const findNode = (nodes, v, status) => {
    let nonMatch = [];
    let foundMatch = [];
    let updatedData = [];
    let parentNodes = (nodes) => {
        nodes.forEach((node) => {
            if (node.value !== v) {
                nonMatch.push(node);

                if (node.nodes) parentNodes(node.nodes);
            } else {
                foundMatch.push(node);
            }
        });
    };






    parentNodes(nodes);

    console.log("nonMatch", nonMatch);
    console.log("foundMatch", foundMatch);
    //findParentAndChild(foundMatch[0]?.value);

    // return Array.from(new Set([...nodes, updatedData[0]]));
};







const Tree = ({ filternodes = [], column, openIcon, closeIcon, expanded, handleExpand, changeState }) => {
    column = 12 / column
    return (
        <div className="row">
            {filternodes.map((items, i) => {
                return (
                    <div key={i} className={'col-lg-' + column + ' form-check'}>
                        <TreeNode filternodes={filternodes} nodes={items} openIcon={openIcon} closeIcon={closeIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} />
                    </div>
                )
            })}
        </div>
    );
};



const Tree1 = (props) => {
    return (
        <div className="d-tree">
            <ul className="d-flex d-tree-container flex-column">
                {props.data.map((items, i) => (
                    <TreeNode filternodes={props.filternodes} key={i} nodes={items} openIcon={props.openIcon} closeIcon={props.closeIcon} expanded={props.expanded} handleExpand={props.handleExpand} changeState={props.changeState} />
                ))}
            </ul>
        </div>
    );
};

const TreeNode = ({ filternodes, nodes, openIcon, closeIcon, expanded, handleExpand, changeState }) => {

    const [childVisible, setChildVisiblity] = useState(false);

    const hasChild = nodes.nodes ? true : false;

    const handleVisibility = (e) => {
        let newArray = expanded
        if (expanded.includes(e)) {
            newArray = expanded.filter((value) => { return value !== e })
        } else {
            newArray.push(e)
        }
        handleExpand(newArray)
        setChildVisiblity((visible) => !visible)
    }

    const handleCheck = (e) => {



        //   console.log("recursive node", recursivenode(nodes));


        let findDeep = function (data, activity) {

            const newdata = data.map(function (e) {
                if (e.value === activity) {

                    return recursivenode(nodes)
                }
                else {
                    return e
                }

                // if (e.value === activity) {
                //     console.log("ghgggg");
                //     //e.nodes = recursivenode(nodes)
                //     return data
                // }
                // else if (e.nodes && e.nodes.length > 0) {

                //     return findDeep(e.nodes, e.value)
                // }
                // else {
                //     return data
                // }


            })
            return newdata
        }

        //console.log(findDeep(filternodes, e.target.value))
        // changeState(findDeep(filternodes, e.target.value))
        function chfilnodes(filternodes, value) {
            const ffa = filternodes.map((anodes) => {
                let aanodes = JSON.stringify(anodes)
                if (aanodes.includes(value)) {
                    let parentcnode = JSON.parse(aanodes)
                    parentcnode.status = true
                    return parentcnode
                }
                else {
                    aanodes = JSON.parse(aanodes)
                    return aanodes
                }
            })
            return ffa
        }
        function filtnodes(filternodes, checked, value) {
            const ddd = filternodes.map((fnodes) => {
                let fsnodes = JSON.stringify(fnodes)
                if (fsnodes.includes(value)) {
                    let parentnode = JSON.parse(fsnodes)
                    parentnode.status = checked

                    if (value === parentnode.value) {
                        // console.log("parentnode.status", parentnode.status);
                        const dxdd = recursivenode(nodes)
                        console.log("dxdd", dxdd);
                        parentnode.nodes = dxdd.nodes

                    }

                    if (parentnode.nodes && parentnode.nodes.length > 0) {
                        parentnode.nodes = filtnodes(parentnode.nodes, checked, value)
                    }
                    return parentnode
                }
                else {
                    fsnodes = JSON.parse(fsnodes)
                    return fsnodes
                }
            })
            return ddd
        }
        console.log("nodes", nodes);
        //  console.log("findparentnode", filtnodes(filternodes, e.target.checked, e.target.value));

        // findNode(filternodes, e.target.value, e.target.checked)
        changeState(filtnodes(filternodes, e.target.checked, e.target.value))

    }






    return (
        <li className="d-tree-node border-0">
            <div className="d-flex" >
                {hasChild && (
                    <button name={nodes.value} onClick={(e) => handleVisibility(nodes.value)} className="btn text-white p-0">
                        {/* {childVisible ? closeIcon : openIcon} */}
                        {expanded.includes(nodes.value) ? closeIcon : openIcon}
                    </button>
                )}

                <div className="col d-tree-head">
                    <span>
                        <input value={nodes.value} name={nodes.value} onChange={(e) => handleCheck(e)} type="checkbox" checked={nodes.status} className="m-2" />
                        {nodes.text}

                    </span>

                </div>

            </div>

            {expanded.includes(nodes.value) && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        <Tree1 filternodes={filternodes} data={nodes.nodes} openIcon={openIcon} closeIcon={closeIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} />
                    </ul>
                </div>
            )}
            {/* {hasChild && childVisible && (
                <div className="d-tree-content">
                    <ul className="d-flex d-tree-container flex-column">
                        <Tree1 filternodes={filternodes} data={nodes.nodes} openIcon={openIcon} closeIcon={closeIcon} expanded={expanded} handleExpand={handleExpand} />
                    </ul>
                </div>
            )} */}
        </li>
    );
};


export default Tree;