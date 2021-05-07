import React, { useState, useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  OnLoadParams,
  Controls,
} from "react-flow-renderer";
import { createDiagramElements } from "./diagram-elements";
import { getProcesses, Process, NetworkError } from "./processes"

const onLoad = (reactFlowInstance: OnLoadParams) => {
  setTimeout(() => reactFlowInstance.fitView(), 10)
};

function Diagram(props: any) {

  const refreshTime = 5

  const [elements, setElements] = useState(() => createDiagramElements([
    {
      id: "1",
      status: "ViewInitializing",
    },
    {
      id: "2",
      status: "ViewInitializing",
    },
    {
      id: "3",
      status: "ViewInitializing",
    },
  ]))
  const blankStatusMessage = useMemo(() => ({
    text: "",
    color: "black",
  }), [])
  const failedConnectionStatusMessage = useMemo(() => ({
    text: "⚠ Failed to connect to control API",
    color: "red",
  }), [])
  const exceptionStatusMessage = useMemo(() => ({
    text: "⚠ Uncaught exception in viewer",
    color: "red",
  }), [])
  const [statusMessage, setStatusMessage] = useState(blankStatusMessage)

  useEffect(() => {
    let timeout = setInterval(() => {
      let result = await getProcesses();
      result.match(
        (processes: Array<Process>) => {
          setStatusMessage(blankStatusMessage);
          setElements(createDiagramElements(processes));
        },
        (e: NetworkError) => setStatusMessage(failedConnectionStatusMessage)
      )
      }, refreshTime * 1000)
    return () => clearInterval(timeout)
  }, [blankStatusMessage, failedConnectionStatusMessage, exceptionStatusMessage])

  return (
    <ReactFlow
      elements={elements}
      onLoad={onLoad}
      nodesDraggable={false}
      nodesConnectable={false}
    >
      <Background />
      <Controls showInteractive={false}/>
      <div>
          <label style={{color: statusMessage.color}}>
            {statusMessage.text}
          </label>
        </div>
    </ReactFlow>

  )
}

export default Diagram
