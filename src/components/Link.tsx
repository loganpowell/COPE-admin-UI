import React, { useContext } from "react"
import * as K from "@-0/keys"
import { CTX } from "../context"
import { _NAVIGATE } from "../router"

export const Link = ({ href, children }) => {
    const { run$ } = useContext(CTX)
    const path = `/${href}`
    //console.log({ href, children })
    return (
        <a
            href={path}
            onClick={e => {
                e.preventDefault()
                run$.next({
                    ..._NAVIGATE,
                    args: {
                        _FURL: href,
                        _NODE: e.currentTarget,
                    },
                })
            }}
        >
            {children}
        </a>
    )
}
