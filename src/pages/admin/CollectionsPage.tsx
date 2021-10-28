import React from "react"
import Collections from "../../components/Collections"

export const CollectionsPage = ({ data }) => {
    return (
        <div>
            <Collections type={data ? data.type : null} />
        </div>
    )
}
