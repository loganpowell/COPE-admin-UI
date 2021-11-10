import { $store$ } from "@-0/browser"
import { useState } from "react"
import { Cursor } from "@thi.ng/atom"
//import { log } from "../utils/data"

export const createCursor =
    (atom = $store$, log = false) =>
    (path, uid = `cursor-${Date.now()}`, init = null): [any, Cursor<any>] => {
        const [state, setState] = useState(init)
        // 1. recreated every re-render of parent component
        const cursor = new Cursor(atom, path)
        cursor.addWatch(uid, (id, bfr, aft) => {
            if (log) console.log(`${uid} cursor triggered:`, { id, bfr, aft })
            setState(aft)
            // 2. needs to be released after every triggered change
            cursor.release()
        })
        return [state, cursor]
    }

export const useCursor = createCursor()
