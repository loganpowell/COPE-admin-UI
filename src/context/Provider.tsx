import React, { useState } from "react"
import { run$ } from "@-0/spool"
import { $store$, registerRouterDOM } from "@-0/browser"
import { URL2obj, diff_keys } from "@-0/utils"
import * as K from "@-0/keys"

import { CTX } from "."
import { Page1 } from "../pages"
import { useCursor } from "../hooks"
//prettier-ignore
export const Provider = ({ children, CFG = {} }) => {
   
    //const DOMRoot     = CFG[K.CFG_ROOT] || document.body 
    // ⬆ ⚠ can't refer to the root node (circular reference)

    // default wrapper for pages before they are specified
    const DefaultView =   Page1
    //const router      = CFG[K.CFG_RUTR]
    // clean URL
    //const knowns      = Object.values(K.) || []
    //const [, others]  = diff_keys(knowns, CFG)
    //const prfx        = router[K.RTR_PRFX] || null
    const escRGX      = /[-/\\^$*+?.()|[\]{}]/g
    const escaped     = str => str.replace(escRGX, "\\$&")
    //const RGX         = prfx ? new RegExp(escaped(prfx || ""), "g") : null


    
    // Prime store with CFG state
    $store$.swap(x => ({...CFG, ...x}))

    return (
        <CTX.Provider value={{
            run$,
            useCursor,
            $store$,
            parse: () => URL2obj(window.location.href),
            DefaultView
          }}>
            { children }
        </CTX.Provider>
    )
}
