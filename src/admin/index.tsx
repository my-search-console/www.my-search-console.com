//@ts-ignore
window.CMS_MANUAL_INIT = true

import CMS from "decap-cms-app"
import { v4 } from "uuid"
import { config } from "./config"
import { UniqueIdWidget } from "./widgets/UniqueIdWidget"

// @ts-ignore
CMS.init({ config })

// @ts-ignore
CMS.registerWidget("uuid", UniqueIdWidget)

CMS.registerEventListener({
  name: "prePublish",
  handler: ({ entry }) => {
    return entry.get("data").set("updated_at", new Date())
  },
})

CMS.registerEventListener({
  name: "preSave",
  handler: ({ entry }) => {
    // path is blank for brand new entries
    const path = entry.get("path")

    let id = entry.get("data").get("id")

    if (!id && !path) id = v4()

    return entry.get("data").set("id", id)
  },
})
