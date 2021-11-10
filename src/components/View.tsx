import React, { useContext, useLayoutEffect, useEffect } from "react"
import { getIn } from "@thi.ng/paths"
import * as K from "@-0/keys"
import { CTX } from "../context"
import {} from "../hooks"

export const View = () => {
    const { $store$, useCursor } = useContext(CTX)
    const [loading, loadingCursor] = useCursor([K._, K.$$_LOAD], "View loading", true)

    const store = $store$.deref()
    console.log({ store, loading })

    const Page = (!loading && getIn(store, [K._, K.$$_VIEW])()) || null
    const path = (!loading && getIn(store, [K._, K.$$_PATH])) || []
    const loader = (
        <div className="spinner_container">
            <div className="spinner">
                <h1> fetching data... </h1>
            </div>
        </div>
    )

    const is_home = store[K.$$_PATH]?.length === 0

    /* eslint-disable */
    return (
        <>
            {!loading && (
                <Page
                    data={
                        // @ts-ignore
                        is_home ? getIn(store, ["data"]) : getIn(store, path)
                    }
                />
            )}
        </>
    )
}
