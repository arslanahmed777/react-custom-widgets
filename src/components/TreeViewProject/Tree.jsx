
import React from "react";
import "./Tree.css";

// ******************************** CUSTOM HELPER FUNCTIONS *********************
let findNode = (nodes, value, status) => {
    let foundObj = null;
    nodes.forEach((__) => {
        if (__.value === value) {
            foundObj = __;
        } else {
            let searchRecursive = (node) => {
                if (node.nodes) {
                    node.nodes.forEach((_) => {
                        if (_.value === value) {
                            foundObj = __;
                        } else {
                            searchRecursive(_);
                        }
                    });
                }
            };
            searchRecursive(__);
        }
    });
    let findValue = (nextNodes, value, status) => {
        let foundNodes = [];

        let recursiveFind = (nextNodes, value) => {
            if (nextNodes.value === value) {
                foundNodes.push(nextNodes);
            } else {
                if (nextNodes.nodes) {
                    nextNodes.nodes.forEach((_) => {
                        if (_.value === value) {
                            foundNodes.push(_);
                        } else {
                            if (_.nodes) {
                                recursiveFind(_, value);
                            }
                        }
                    });
                }
            }
        };
        let setStatus = (nextNodes, { value }, status) => {
            let recursiveTrue = (nextNodes, value) => {
                let parentNode = nextNodes;
                let setRecursiveChild = (node, b) => {
                    node.status = b;
                    if (node.nodes) {
                        node.nodes.forEach((_) => {
                            setRecursiveChild(_, b);
                        });
                    }
                };
                let setRecursiveTrue = (node) => {
                    if (node.value === value) {
                        let setRecursiveParent = (node, value) => {
                            if (node.nodes) {
                                if (node.nodes.some((v) => v.value === value)) {
                                    node.status = true;
                                    setRecursiveParent(parentNode, node.value);
                                } else {
                                    if (node.nodes) {
                                        node.nodes.forEach((_) => {
                                            setRecursiveParent(_, value);
                                        });
                                    }
                                }
                            }
                        };
                        setRecursiveChild(node, true);
                        setRecursiveParent(parentNode, value);
                    } else {
                        if (node.nodes) {
                            node.nodes.forEach((_) => {
                                setRecursiveTrue(_);
                            });
                        }
                    }
                };
                let setRecursiveFalse = (node) => {
                    if (node.value === value) {
                        node.status = false;
                        setRecursiveChild(node, false);
                    } else {
                        if (node.nodes) {
                            node.nodes.forEach((_) => {
                                setRecursiveFalse(_);
                            });
                        }
                    }
                };

                if (parentNode.value === value) {
                    parentNode.status = status;
                    setRecursiveTrue(parentNode);
                }
                if (status === true) {
                    setRecursiveTrue(parentNode);
                } else {
                    setRecursiveFalse(parentNode);
                }
                return parentNode;
            };

            recursiveTrue(nextNodes, value, status);
        };

        recursiveFind(nextNodes, value);
        setStatus(nextNodes, foundNodes[0], status);
        if (status && nextNodes.value === value) {
            nextNodes.status = status;
        } else if (nextNodes.value === value && !status) {
            nextNodes.status = status;
        } else {
            nextNodes.status = true;
        }
        return nextNodes;
    };
    if (foundObj) {
        findValue(foundObj, value, status);
        return nodes;
    }
};



const Tree = ({ filternodes = [], column, openIcon, closeIcon, expanded, handleExpand, changeState, fontSize, backgroundColor, color, horizontalSpacing, verticalSpacing, borderLeft, allowCheck }) => {
    column = 12 / column
    return (
        <div className="row" style={{ fontSize: fontSize, backgroundColor: backgroundColor, color: color }}>
            {filternodes.map((items, i) => {
                return (
                    <div key={i} className={`scroll col-lg-${column}`} style={{ overflowX: "auto" }}>
                        <TreeNode filternodes={filternodes} nodes={items} openIcon={openIcon} closeIcon={closeIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} fontSize={fontSize} horizontalSpacing={horizontalSpacing} verticalSpacing={verticalSpacing} borderLeft={borderLeft} allowCheck={allowCheck} />
                    </div>
                )
            })}
        </div>
    );
};

const Tree1 = (props) => {
    return (
        <>
            {props.data.map((items, i) => (
                <TreeNode filternodes={props.filternodes} key={i} nodes={items} openIcon={props.openIcon} closeIcon={props.closeIcon} expanded={props.expanded} handleExpand={props.handleExpand} changeState={props.changeState} fontSize={props.fontSize} horizontalSpacing={props.horizontalSpacing} verticalSpacing={props.verticalSpacing} borderLeft={props.borderLeft} allowCheck={props.allowCheck} />
            ))}

        </>
    );
};

const TreeNode = ({ filternodes, nodes, openIcon, closeIcon, expanded, handleExpand, changeState, fontSize, horizontalSpacing, verticalSpacing, borderLeft, allowCheck }) => {
    const hasChild = nodes.nodes ? true : false;
    const handleVisibility = (e) => {
        let newArray = expanded
        if (expanded.includes(e)) {
            newArray = expanded.filter((value) => { return value !== e })
        } else {
            newArray.push(e)
        }
        handleExpand(newArray)
    }

    const handleCheck = (e) => {
        changeState(findNode(filternodes, e.target.value, e.target.checked))
    }
    return (
        <>
            <div className="d-flex" style={{ alignItems: "center", marginBottom: verticalSpacing }} >
                {hasChild && (
                    <button name={nodes.value} onClick={(e) => handleVisibility(nodes.value)} style={{ fontSize: "inherit", height: "fit-content" }} className="treenav-btn p-0">
                        {/* {childVisible ? closeIcon : openIcon} */}
                        {expanded.includes(nodes.value) ? closeIcon : openIcon}
                    </button>
                )}
                <div>
                    <span style={{ display: "flex", alignItems: "end" }}>
                        <span className="mx-1">
                            {allowCheck && (

                                <input value={nodes.value} name={nodes.value} onChange={(e) => handleCheck(e)} type="checkbox" checked={nodes.status} className="mx-1" style={{ width: `calc(${fontSize} - 8px)`, height: `calc(${fontSize} - 8px)` }} />

                            )}
                        </span>
                        <span>{nodes.text}</span>
                    </span>
                </div>
            </div>
            {expanded.includes(nodes.value) && (
                <div style={{ marginLeft: borderLeft === "none" ? horizontalSpacing : `calc(${horizontalSpacing} - 12px )`, borderLeft: borderLeft, paddingLeft: borderLeft === "none" ? "0px" : "12px" }}>
                    <Tree1 filternodes={filternodes} data={nodes.nodes} openIcon={openIcon} closeIcon={closeIcon} expanded={expanded} handleExpand={handleExpand} changeState={changeState} fontSize={fontSize} horizontalSpacing={horizontalSpacing} verticalSpacing={verticalSpacing} borderLeft={borderLeft} allowCheck={allowCheck} />
                </div>
            )}
        </>
    );
};


export default Tree;