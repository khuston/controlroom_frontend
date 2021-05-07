import React, { useEffect } from 'react';
import Diagram from './diagram'
import './App.css';

function App() {
  const topBarHeight = 50
  const defaultLogHeight = 200
  const [dimensions, setDimensions] = React.useState({ 
    height: window.innerHeight,
    width: window.innerWidth,
  })
  const [logHeight, setLogHeight] = React.useState(defaultLogHeight)

  useEffect( () => {
    function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      })
    }
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  })
  return (
    <div className="App">
      <TopBar
        width={dimensions.width}
        height={topBarHeight} 
        handleClick={() => setLogHeight((logHeight) => logHeight === 0 ? defaultLogHeight : 0)}
      />
      <DiagramContainer
        width={dimensions.width}
        height={dimensions.height-topBarHeight-logHeight}
      />
      <LogViewer
        width={dimensions.width}
        height={logHeight}
      />
    </div>
  );
}

function TopBar(props: any) {
  return <div style={{width: props.width, height: props.height}}>
    <button onClick={props.handleClick}>Log Viewer</button>
  </div>
}

function DiagramContainer(props: any) {
  return <div style={{width: props.width, height: props.height}}>
    <Diagram />
  </div>
}

function LogViewer(props: any) {
  return (
    <textarea readOnly={true} style={{width: props.width, height: props.height}} />
  );
}

export default App;
