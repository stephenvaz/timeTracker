import { useState, useEffect } from 'react';
import Tree from 'react-d3-tree';
import axios from 'axios';
import './tree.css';

function App() {
  const [data, setData] = useState(null);
  const [treeTranslate, setTreeTranslate] = useState({ x: window.innerWidth/2, y: window.innerHeight/3 });

  useEffect(() => {
    axios
      .get('http://127.0.0.1:6969/api/hierarchy/getall')
      .then((res) => {
        console.log(res.data);
        const hierarchyData = formatHierarchyData(res.data);
        console.log(hierarchyData);
        setData(hierarchyData);
      })
      .catch((err) => {
        console.log(err);
      });

    // Add event listener for window resize
    window.addEventListener('resize', handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleResize = () => {
    // Update the tree translation based on the new window dimensions
    const newTranslate = {
      x: window.innerWidth / 2,
      y: window.innerHeight / 3,
    };
    setTreeTranslate(newTranslate);
  };

  const formatHierarchyData = (apiData) => {
    const hierarchyMap = {};
    let root = null;

    apiData.data.forEach((item) => {
      const { HierarchyID, EmployeeID, SupervisorID, Ename, Sname } = item;
      hierarchyMap[EmployeeID] = {
        name: Ename,
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
    <div id="treeWrapper" style={{ width: '100vw', height: '100vh' }}>
      {data && (
        <Tree
          data={data}
          orientation="vertical"
          rootNodeClassName="node__root"
          branchNodeClassName="node__branch"
          leafNodeClassName="node__leaf"
          svgClassName="custom"
          enableLegacyTransitions={true}
          translate={treeTranslate}
        />
      )}
    </div>
  );
}

export default App;
