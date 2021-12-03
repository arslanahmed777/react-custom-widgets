let findNode = (nodes, value, status) => {
    let foundObj = null;
    nodes.forEach((_) => {
        if (JSON.stringify(_).match(new RegExp(value, "i"))) {
            foundObj = _;
        }
    });
    let findValue = (nextNodes, value, status) => {
        let foundNodes = [];

        let recursiveFind = (nextNodes, value) => {
            if (nextNodes.value == value) {
                foundNodes.push(nextNodes);
            } else {
                if (nextNodes.nodes) {
                    nextNodes.nodes.forEach((_) => {
                        if (_.value == value) {
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
                    if (node.value == value) {
                        let setRecursiveParent = (node, value) => {
                            if (node.nodes) {
                                if (node.nodes.some((v) => v.value == value)) {
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
                    if (node.value == value) {
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

                if (parentNode.value == value) {
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
        if (status && nextNodes.value == value) {
            nextNodes.status = status;
        } else if (nextNodes.value == value && !status) {
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
findNode(nodes, valueInput.value, valueInput.checked)