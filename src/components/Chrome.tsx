import React, { useState, useContext, useEffect } from "react"
import { getIn } from "@thi.ng/paths"
import * as K from "@-0/keys"
import { CTX } from "../context"
import { navigate } from "../commands"
import { Link } from "../components"

//import { log } from "../utils"

//const { SubMenu } = Menu

export const Chrome = ({ children }) => {
    const { useCursor } = useContext(CTX)
    const [ path, pathCursor ] = useCursor([ K.$$_PATH ], "Route Path")

    //log({ path })

    useEffect(
        () => {
            pathCursor?.release()
            return
        },
        [ path, pathCursor ]
    )

    return (
        <div>
            <div
                style={{
                    minHeight: "100vh"
                    //overflow: "hidden",
                }}
            >
                <div style={{ minHeight: "100vh" }}>
                    <ul>
                        <Link to="page1">page1</Link>
                        <Link to="page2">page2</Link>
                        <Link to="page3">page3</Link>
                    </ul>
                    <div
                        style={{
                            padding: "0 24px",
                            minHeight: 280,
                            overflow: "hidden"
                        }}
                    >
                        {children}
                    </div>
                </div>
            </div>
            <div style={{ textAlign: "center" }}>
                ©2020 US CENSUS BUREAU: Digital Marketing Team (Chief: Anthony Calabrese)
            </div>
        </div>
    )
}
