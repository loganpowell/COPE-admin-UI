import React from "react"
import { Editor } from "../../components"

export const EditorPage = ({ data }) => (
    <div>
        <Editor nodeId={data ? data.nodeId : null} />
    </div>
)
