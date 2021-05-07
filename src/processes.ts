import { Result, ok, err } from "neverthrow"

export interface Process {
    id: string
    status: string
}

export interface NetworkError{
    message: string
}

export async function getProcesses(): Promise<Result<Array<Process>, NetworkError>> {
    let response;
    let processes: Array<Process>;
    try {
        response = await fetch('http://localhost:9090/processes')
    } catch(error) {
        return err({ message: error.message })
    }
    try {
        processes = await response.json()
    } catch {
        return err({ message: "The response contained invalid json" })
    }
    return ok(processes)
}