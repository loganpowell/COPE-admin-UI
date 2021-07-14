import React, { useState } from "react"
import { Editor } from "react-draft-wysiwyg"
import { EditorState } from "draft-js"
import { makeStyles, InputLabel } from "@material-ui/core"
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css"

const useStyles = makeStyles({
    textEditor: {
        backgroundColor: "white",
        color: "black",
        border: "thin solid black",
        borderRadius: "5px",
        minHeight: "400px",
        maxHeight: "400px",
    },
})

function MarkdownInput() {
    const classes = useStyles()
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    const onEditorStateChange = (editorState: any) => {
        setEditorState(editorState)
    }

    return (
        <>
            <InputLabel>Markdown</InputLabel>
            <Editor
                editorState={editorState}
                onEditorStateChange={onEditorStateChange}
                editorClassName={classes.textEditor}
            ></Editor>
        </>
    )
}

export default MarkdownInput
