import React from "react"
import RenderMarkdown from "./RenderMarkdown"
import RenderTitle from "./RenderTitle"
import RenderVideo from "./RenderVideo"

const AssetTypesToComponentMap = {
    // A_OG_IMAGE: ImageInput,
    // A_OG_VIDEO: RenderVideo,
    T_OG_TITLE: RenderTitle,
    T_OG_DESCRIPTION: RenderMarkdown,
    // A_IMAGE: ImageInput,
    A_VIDEO: RenderVideo,
    T_LEDE: RenderMarkdown,
    T_BODY: RenderMarkdown,
}

function RenderContentPreview(asset, props) {
    if (asset.type in AssetTypesToComponentMap) {
        return React.createElement(AssetTypesToComponentMap[asset.type], props)
    }
}

export default RenderContentPreview
