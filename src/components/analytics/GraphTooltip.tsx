import { IntlShape } from "react-intl"
import { bigNumberFormatter } from "../../utils/bigNumberFormatter"

const getOrCreateTooltip = (chart) => {
  let tooltip = chart.canvas.parentNode.querySelector("div") as HTMLDivElement

  if (!tooltip) {
    tooltip = document.createElement("div")
    tooltip.className = "tooltip"

    const table = document.createElement("table")
    table.style.margin = "0px"

    tooltip.appendChild(table)
    chart.canvas.parentNode.appendChild(tooltip)
  }
  return tooltip
}

const getEvolutionType = (params: {
  type: string
  before: number
  after: number
}) => {
  if (params.type === "position") {
    if (params.before < params.after) return "up"
    if (params.before > params.after) return "down"
    return "equal"
  }
  if (params.before > params.after) return "up"
  if (params.before < params.after) return "down"
  return "equal"
}

const getArrowDependingOnEvolution = (params: {
  type: string
  before: number
  after: number
}) => {
  const evolution = getEvolutionType({
    type: params.type,
    before: params.before,
    after: params.after,
  })
  if (evolution === "up") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-6 text-red-500"><path d="M6.28 5.22a.75.75 0 00-1.06 1.06l7.22 7.22H6.75a.75.75 0 000 1.5h7.5a.747.747 0 00.75-.75v-7.5a.75.75 0 00-1.5 0v5.69L6.28 5.22z"></path></svg>`
  }
  if (evolution === "down") {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-6 text-green-500"><path fill-rule="evenodd" d="M5.22 14.78a.75.75 0 001.06 0l7.22-7.22v5.69a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75h-7.5a.75.75 0 000 1.5h5.69l-7.22 7.22a.75.75 0 000 1.06z" clipRule="evenodd"></path></svg>`
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" class="h-6 w-6 text-slate-500"><path fill-rule="evenodd" d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z" clipRule="evenodd"></path></svg>`
}

const replaceOldChildrenIfExist = (
  tableHead: HTMLTableSectionElement,
  tableBody: HTMLTableSectionElement,
  tooltipEl: HTMLDivElement
) => {
  const tableRoot = tooltipEl.querySelector("table")

  if (tableRoot) {
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove()
    }

    tableRoot.appendChild(tableHead)
    tableRoot.appendChild(tableBody)
  }
}

const addTooltipTitle = (params: {
  title: string
  tableHead: HTMLTableSectionElement
  document: Document
}) => {
  const { title, tableHead, document } = params
  const tr = document.createElement("tr")
  tr.style.borderWidth = "0"

  const th = document.createElement("th")
  th.style.borderWidth = "0"
  th.style.fontWeight = "300"
  th.style.padding = "0.3em 0 0 0"
  const text = document.createTextNode(title)

  th.appendChild(text)
  tr.appendChild(th)
  tableHead.appendChild(tr)
}

const addTooltipBody = (params: {
  bodyLines: any
  tableBody: HTMLTableSectionElement
  intl: IntlShape
}) => {
  const { bodyLines, tableBody, intl } = params
  const newVal = Number(bodyLines[0][0].split(" ")[0]) + Number.EPSILON
  const oldVal = Number(bodyLines[1][0].split(" ")[0]) + Number.EPSILON

  const isDecimal = (num: number) => Number(num) % 1 != 0

  const body = {
    startValue: `<p class="text-slate-400">${
      isDecimal(oldVal)
        ? Number(oldVal).toFixed(2)
        : bigNumberFormatter(Number(oldVal), 2)
    }</p>`,
    arrow: getArrowDependingOnEvolution({
      type: bodyLines[0][0].split(" ")[1],
      before: oldVal,
      after: newVal,
    }),
    newValue: `<p>${
      isDecimal(newVal)
        ? Number(newVal).toFixed(2)
        : bigNumberFormatter(Number(newVal), 2)
    }</p>`,
    formattedMessage: intl.formatMessage({
      id: `analytics/histogram/filter/${bodyLines[0][0].split(" ")[1]}`,
    }),
  }

  const total = [
    body.startValue,
    body.arrow,
    body.newValue,
    body.formattedMessage,
  ].join("")

  tableBody.insertAdjacentHTML("beforeend", total)
}

export const GraphTooltip =
  (intl: IntlShape) => (context: { chart: any; tooltip: any }) => {
    const { chart, tooltip } = context
    const tooltipEl = getOrCreateTooltip(chart)

    // change border radius of tooltip
    tooltipEl.style.borderRadius = "0.375rem"

    if (tooltip.body) {
      const bodyLines = tooltip.body.map((b: { lines: any }) => b.lines)
      const tableHead = document.createElement("thead")
      const tableBody = document.createElement("tbody")

      tableBody.style.width = "100%"
      tableBody.style.display = "flex"
      tableBody.style.gap = "4px"
      tableBody.style.justifyContent = "center"
      tableBody.style.fontWeight = "bold"
      tableBody.style.padding = "0.3em 0.7em"

      addTooltipTitle({ title: tooltip.title[0], tableHead, document })

      addTooltipBody({
        bodyLines,
        tableBody,
        intl,
      })

      replaceOldChildrenIfExist(tableHead, tableBody, tooltipEl)
    }

    tooltipEl.style.padding =
      tooltip.options.padding + "px " + tooltip.options.padding + "px"
  }
