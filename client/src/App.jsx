import { useState, useEffect } from 'react';
import { Tree, Button, Modal, Input, Select } from 'antd';
// import 'antd/dist/antd.css';
import axios from 'axios';
import './App.css';

const { TreeNode } = Tree;
const { Option } = Select;

const initialData = [
    // {
    //     id: 'admin',
    //     title: 'Admin',
    //     children: [],
    // },
];

function App() {
    const [data, setData] = useState([]);
    const [selectedNode, setSelectedNode] = useState(null);
    const [deleteModalVisible, setDeleteModalVisible] = useState(false);
    const [addModalVisible, setAddModalVisible] = useState(false);
    const [newNodeTitle, setNewNodeTitle] = useState('');
    const [selectedTargetNode, setSelectedTargetNode] = useState(null);

    // {
    //     "HierarchyID": 1,
    //     "EmployeeID": 3,
    //     "SupervisorID": 1,
    //     "Ename": "Stephen",
    //     "Sname": "Darsh"
    // }

    useEffect(() => {
        const getData = async () => {
        await axios
          .get('http://127.0.0.1:6969/api/hierarchy/getall')
          .then((res) => {
            console.log(res.data.data);
            const empData = res.data.data;

//        empData=      [
//     {
//         "HierarchyID": 1,
//         "EmployeeID": 3,
//         "SupervisorID": 1,
//         "Ename": "Stephen",
//         "Sname": "Darsh"
//     },
//     {
//         "HierarchyID": 2,
//         "EmployeeID": 2,
//         "SupervisorID": 1,
//         "Ename": "Siddhesh",
//         "Sname": "Darsh"
//     },
//     {
//         "HierarchyID": 3,
//         "EmployeeID": 5,>
//         "SupervisorID": 2,
//         "Ename": "t1",
//         "Sname": "Siddhesh"
//     },
//     {
//         "HierarchyID": 4,
//         "EmployeeID": 6,
//         "SupervisorID": 2,
//         "Ename": "t2",
//         "Sname": "Siddhesh"
//     },
//     {
//         "Hiera [
//     {
//         "HierarchyID": 1,
//         "EmployeeID": 3,
//         "SupervisorID": 1,
//         "Ename": "Stephen",
//         "Sname": "Darsh"
//     },
//     {
//         "HierarchyID": 2,
//         "EmployeeID": 2,
//         "SupervisorID": 1,
//         "Ename": "Siddhesh",
//         "Sname": "Darsh"
//     },
//     {
//         "HierarchyID": 3,
//         "EmployeeID": 5,
//         "SupervisorID": 2,
//         "Ename": "t1",
//         "Sname": "Siddhesh"
//     },
//     {
//         "HierarchyID": 4,
//         "EmployeeID": 6,
//         "SupervisorID": 2,
//         "Ename": "t2",
//         "Sname": "Siddhesh"
//     },
//     {
//         "HierarchyID": 5,
//         "EmployeeID": 7,
//         "SupervisorID": 3,
//         "Ename": "t3",
//         "Sname": "Stephen"
//     },
//     {
//         "HierarchyID": 6,
//         "EmployeeID": 1,
//         "SupervisorID": 1,
//         "Ename": "Darsh",
//         "Sname": "Darsh"
//     }
// ]rchyID": 5,
//         "EmployeeID": 7,
//         "SupervisorID": 3,
//         "Ename": "t3",
//         "Sname": "Stephen"
//     },
//     {
//         "HierarchyID": 6,
//         "EmployeeID": 1,
//         "SupervisorID": 1,
//         "Ename": "Darsh",
//         "Sname": "Darsh"
//     }
// ]
            // the employee, who has employee id === supervisor id, is the root node
            

            empData.forEach((emp) => {
                if (emp.EmployeeID === emp.SupervisorID) {
                    initialData.push({
                        id: emp.EmployeeID,
                        title: emp.Ename,
                        children: [],
                    });
                }
            });
            // NOW i need to add the children to the root node
            empData.forEach((emp) => {
                if (emp.EmployeeID !== emp.SupervisorID) {
                    const supervisorNode = findNodeById(initialData, emp.SupervisorID);
                    if (supervisorNode) {
                        supervisorNode.children.push({
                            id: emp.EmployeeID,
                            title: emp.Ename,
                            children: [],
                        });
                    }
                }
            });
            setData(initialData);
          })
          .catch((err) => {
            console.log(err);
          });
        }
        getData();
    
      }, []);

      useEffect(() => {
        console.log(data)
        }, [data]);

    const handleDeleteModal = () => {
        setDeleteModalVisible(!deleteModalVisible);
    };

    const handleDeleteNode = () => {
        if (selectedNode) {
            setDeleteModalVisible(false);
            setSelectedTargetNode(null);
            promptForTargetNode();
        }
    };

    const promptForTargetNode = () => {
        Modal.confirm({
            title: 'Select Target Node',
            content: (
                <Select
                    style={{ width: '100%' }}
                    placeholder="Select a target node"
                    onChange={(value) => setSelectedTargetNode(value)}
                >
                    {renderTreeSelectOptions(data)}
                </Select>
            ),
            okText: 'Delete',
            cancelText: 'Cancel',
            onOk: () => handleDeleteWithTarget(),
        });
    };

    const handleDeleteWithTarget = () => {
        const newData = removeNode(data, selectedNode.id);
        setData(newData);
        setSelectedNode(null);
        setDeleteModalVisible(false);

        if (selectedTargetNode) {
            const targetNode = findNodeById(newData, selectedTargetNode);
            if (targetNode) {
                targetNode.children.push(...selectedNode.children);
                setData([...newData]);
            }
        }
    };

    const handleAddModal = () => {
        setAddModalVisible(!addModalVisible);
    };

    const handleAddNode = () => {
        if (newNodeTitle) {
            const newNode = {
                id: Date.now().toString(),
                title: newNodeTitle,
                children: [],
            };

            if (selectedNode) {
                selectedNode.children.push(newNode);
            } else {
                data.push(newNode);
            }

            setData([...data]);
            setNewNodeTitle('');
            setAddModalVisible(false);
        }
    };

    const handleDropNode = ({ node, dragNode, dropPosition }) => {
        const dragKey = dragNode.props.eventKey;
        const dropKey = node.props.eventKey;
        const dragNodes = data;

        const dropPos = Number(dropPosition);

        const loop = (data, key, callback) => {
            for (let i = 0; i < data.length; i++) {
                if (data[i].id === key) {
                    return callback(data[i], i, data);
                }
                if (data[i].children) {
                    loop(data[i].children, key, callback);
                }
            }
        };

        const dataCopy = [...data];

        let dragObj;
        loop(dataCopy, dragKey, (item, index, arr) => {
            arr.splice(index, 1);
            dragObj = item;
        });

        if (!node.props.children) {
            node.props.children = [];
        }

        loop(dataCopy, dropKey, (item) => {
            item.children = item.children || [];
            if (dropPos === -1) {
                item.children.unshift(dragObj);
            } else if (dropPos === 0) {
                item.children.push(dragObj);
            } else {
                const childrenCopy = [...item.children];
                item.children = [];
                childrenCopy.splice(dropPos, 0, dragObj);
                item.children = childrenCopy;
            }
        });

        setData(dataCopy);
    };

    const removeNode = (treeData, nodeId) => {
        return treeData.map((node) => {
            if (node.id === nodeId) {
                return null; // Remove the selected node
            } else if (node.children) {
                return {
                    ...node,
                    children: removeNode(node.children, nodeId),
                };
            } else {
                return node;
            }
        }).filter((node) => node !== null);
    };

    const handleSelectNode = (keys) => {
        const nodeId = keys[0];
        const selectedNode = findNodeById(data, nodeId);
        setSelectedNode(selectedNode);
    };

    const findNodeById = (treeData, nodeId) => {
        for (let node of treeData) {
            if (node.id === nodeId) {
                return node;
            } else if (node.children) {
                const foundNode = findNodeById(node.children, nodeId);
                if (foundNode) {
                    return foundNode;
                }
            }
        }
        return null;
    };

    const renderTreeNodes = (treeData) => {
        return treeData.map((node) => (
            <TreeNode title={node.title} key={node.id}>
                {node.children && renderTreeNodes(node.children)}
            </TreeNode>
        ));
    };

    const renderTreeSelectOptions = (treeData) => {
        const options = [];
        const traverse = (nodes, prefix = '') => {
            nodes.forEach((node) => {
                const { id, title, children } = node;
                options.push(
                    <Option key={id} value={id} disabled={id === selectedNode.id}>
                        {`${prefix}${title}`}
                    </Option>
                );
                if (children) {
                    traverse(children, `${prefix}—`);
                }
            });
        };
        traverse(treeData);
        return options;
    };

    return (
        <div className="App">
            <h1>Employee Hierarchy</h1>
            <div className="tree-container">
                <Tree
                    showLine
                    defaultExpandAll
                    draggable
                    onDrop={handleDropNode}
                    onSelect={handleSelectNode}
                >
                    {renderTreeNodes(data)}
                </Tree>
            </div>
            {selectedNode && (
                <div className="actions">
                    <button className='btn btn-danger' onClick={handleDeleteModal} style={{ marginRight: '10px' }}>
                        Delete Node
                    </button>
                </div>
            )}
            <Modal
                title="Confirm Delete"
                open={deleteModalVisible}
                onOk={handleDeleteNode}
                onCancel={handleDeleteModal}
            >
                <p>Are you sure you want to delete this node?</p>
            </Modal>
            <div className="actions">
                <button className='btn btn-primary' onClick={handleAddModal}>
                    Add Node
                </button>
            </div>
            <Modal
                title="Add Node"
                open={addModalVisible}
                onOk={handleAddNode}
                onCancel={handleAddModal}
            >
                <Input
                    value={newNodeTitle}
                    onChange={(e) => setNewNodeTitle(e.target.value)}
                    placeholder="Enter Node Title"
                />
            </Modal>
        </div>
    );
}

export default App;