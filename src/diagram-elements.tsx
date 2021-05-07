import * as React from "react"
import { Elements } from "react-flow-renderer"

import { Process } from "./processes"

export function createDiagramElements(processes: Array<Process>) {
    let processDict = new Map<String, Process>(
        processes.map((process) => [process.id, process])
    );
    console.log(processDict);

    var elements: Elements = defaultElements;
    elements = elements.map((element) => {
        let process = processDict.get(element.id)!
        return ({
            ...element,
            status: process.status,
            style: processDict.get(element.id) ? getProcessStyle(processDict.get(element.id)!) : element.style,
        })
    })
    return elements
}

function getProcessStyle(process: Process) {
    switch (process.status) {
        case "Good": {
            return { background: '#99FF99', }
        }
        case "Warning": {
            return { background: '#FFFF99', }
        }
        case "Error": {
            return { background: '#FF9999', }
        }
        case "MissedHeartbeat": {
            return { background: '#FFDD99', }
        }
        case "Unknown": {
            return { background: '#CC0000', }
        }
        case "ViewInitializing": {
            return { background: '#FFFFFF', }
        }
    }
}

const defaultElements = [
    {
        id: '1',
        data: {
            label: (
                <>1</>
            )
        },
        position: { x: 0, y: 0}
    },
    {
        id: '2',
        data: {
            label: (
                <>2</>
            )
        },
        position: { x: 300, y: 0}
    },
    {
        id: '3',
        data: {
            label: (
                <>3</>
            )
        },
        position: { x: 600, y: 0}
    },
    {
        id: 'e1-2', source: '1', target: '2'
    },
    {
        id: 'e2-3', source: '2', target: '3'
    }
]
