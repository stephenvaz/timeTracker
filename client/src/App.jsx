import { useState, useEffect } from 'react'
import Tree from 'react-d3-tree';
import axios from 'axios'
// import './App.css'
import "./tree.css"

function App() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    axios.get('http://127.0.0.1:6969/api/hierarchy/getall')
      .then(res => {
        console.log(res.data)
        const hierarchyData = formatHierarchyData(res.data)
        console.log(hierarchyData)
        setData(hierarchyData)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const formatHierarchyData = (apiData) => {
    const hierarchyMap = {};
    let root = null;
  
    apiData.data.forEach((item) => {
      const { HierarchyID, EmployeeID, SupervisorID, Ename, Sname } = item;
      hierarchyMap[EmployeeID] = {
        name: Ename,
        // attributes: {
        //   department: Sname,
        // },
        children: [],
      };
    });
  
    apiData.data.forEach((item) => {
      const { EmployeeID, SupervisorID } = item;
      const node = hierarchyMap[EmployeeID];
      const supervisorNode = hierarchyMap[SupervisorID];
  
      if (SupervisorID === EmployeeID) {
        root = node;
      } else if (supervisorNode) {
        supervisorNode.children.push(node);
      }
    });
  
    return root;
  };
  
  return (
    <div id="treeWrapper" style={{ width: '100vw', height: '100vh'}}>
      {data && <Tree data={data} orientation='vertical' rootNodeClassName="node__root"
        branchNodeClassName="node__branch"
        leafNodeClassName="node__leaf"
        svgClassName='custom'
         />}
    </div>
  )
}

export default App
