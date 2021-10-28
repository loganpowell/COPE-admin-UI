import React from "react"
import Editor from "../../components/Editor"

export const EditorPage = ({ data }) => (
    <div>
        <Editor nodeId={data ? data.nodeId : null} />
    </div>
)
