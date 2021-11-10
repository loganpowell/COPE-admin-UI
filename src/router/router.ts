//import { getIn } from "@thi.ng/paths"
import { EquivMap } from "@thi.ng/associative"

import { URL2obj } from "@-0/utils"
import * as K from "@-0/keys"
import { registerCMD } from "@-0/spool"
import { cmd_inject_head, registerRouterDOM } from "@-0/browser"
import { Auth } from "@aws-amplify/auth"
import { GRAPHQL_AUTH_MODE } from "@aws-amplify/api"
import { Page1, Page2, Page3, CollectionsPage, EditorPage } from "../pages"

import { node, API } from "cope-client-utils"

// TODO: return types expected for routerCfg

const getHomePageData = async () => {
    const list = await node.list({
        type: API.NodeType.A_GEM,
        status: API.NodeStatus.DRAFT,
    })
    //  console.log({ list })
    //  console.log(match)
    return {
        [K.DOM_HEAD]: {
            [K.HD_TITL]: "COPE frontend",
            [K.HD_DESC]: "COPE frontend tinkering",
            //img_url,
        },
        [K.DOM_BODY]: { list },
    }
}

export const routerCfg: K.Router = async url => {
    const session = await Auth.currentAuthenticatedUser()
    //console.log("session:", { session })
    const match = URL2obj(url)
    const { _QERY } = match
    const { type, nodeId } = _QERY

    //limit = parseInt(limit)
    //const path = match[K.URL_PATH]

    const sign_in = {
        URL_DATA: () => ({
            DOM_HEAD: {},
            DOM_BODY: {},
        }),
        URL_PAGE: "home",
    }
    const RES = !session
        ? sign_in
        : new EquivMap(
              [
                  [
                      // home page (path = [])
                      { ...match, [K.URL_PATH]: [] },
                      {
                          [K.URL_DATA]: () => {
                              console.log("home")

                              return getHomePageData()
                          },
                          [K.URL_PAGE]: () => CollectionsPage,
                      },
                  ],
                  [
                      { ...match, [K.URL_PATH]: ["admin", "collections"] },
                      {
                          [K.URL_DATA]: async () => {
                              console.log("admin/collections")
                              const list = await node.list({
                                  type: API.NodeType.A_GEM,
                                  status: API.NodeStatus.DRAFT,
                              })
                              return {
                                  [K.DOM_HEAD]: {
                                      title: "View Collections",
                                      og_description: "Authoring side of COPE",
                                  },
                                  [K.DOM_BODY]: { type, list },
                              }
                          },
                          [K.URL_PAGE]: () => CollectionsPage,
                      },
                  ],
                  [
                      { ...match, [K.URL_PATH]: ["admin", "collections", "edit"] },
                      {
                          [K.URL_DATA]: async () => {
                              console.log("admin/collections/edit")

                              const list = await node.list({
                                  type: API.NodeType.A_GEM,
                                  status: API.NodeStatus.DRAFT,
                              })
                              return {
                                  [K.DOM_HEAD]: {
                                      title: "Edit",
                                      og_description: "Authoring side of COPE",
                                  },
                                  [K.DOM_BODY]: { nodeId, list },
                              }
                          },
                          [K.URL_PAGE]: () => EditorPage,
                      },
                  ],
                  [
                      { ...match, [K.URL_PATH]: ["page1"] },
                      {
                          [K.URL_DATA]: async () => {
                              const list = await node.list({
                                  owner: "PostConfirmTriggerLambda",
                              })
                              return {
                                  [K.DOM_HEAD]: {
                                      title: "Page 1",
                                      og_description: "Description for Open Graph/sharing",
                                  },
                                  [K.DOM_BODY]: { list },
                              }
                          },
                          [K.URL_PAGE]: () => Page1,
                      },
                  ],
              ]
              // TODO: create actual 404 Page
          ).get(match) || {
              [K.URL_DATA]: getHomePageData,
              [K.URL_PAGE]: () => CollectionsPage, // default to home page
          }

    const data = await RES[K.URL_DATA]()
    const page = RES[K.URL_PAGE]
    console.log("routed:", { page, data, match })

    return { [K.URL_DATA]: data, [K.URL_PAGE]: page }
}

//const Page2 = ({ data }) => {
//    return h(
//        "pre",
//        { className: "boobs" },
//        h("h1", null, `PAGE 2:`),
//        JSON.stringify(data, null, 2)
//    )
//}

export const router = {
    [K.CFG_RUTR]: routerCfg,
    [K.RTR_PRFX]: "COPE-admin-UI/",
}

//@ts-ignore
export const _NAVIGATE = registerRouterDOM(router)
