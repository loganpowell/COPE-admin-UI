import React from "react"
import { Collections } from "../../components"

export const CollectionsPage = ({ data: { list, type } }) => {
    console.log("CollectionsPage:", { list, type })
    return (
        <div>
            <Collections type={type} />
        </div>
    )
}
