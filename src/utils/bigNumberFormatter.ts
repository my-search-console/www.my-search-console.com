export function bigNumberFormatter(num: number | string, digits: number) {
  const numberToFormat = Number(num)

  if (numberToFormat === 0) {
    return "0"
  }

  const si = [
    { value: 1e18, symbol: "E" },
    { value: 1e15, symbol: "P" },
    { value: 1e12, symbol: "T" },
    { value: 1e9, symbol: "G" },
    { value: 1e6, symbol: "M" },
    { value: 1e3, symbol: "k" },
  ]

  for (let i = 0; i < si.length; i++) {
    if (numberToFormat >= si[i].value) {
      return (
        (numberToFormat / si[i].value).toLocaleString("en-US", {
          maximumFractionDigits: digits,
        }) + si[i].symbol
      )
    }
  }

  return numberToFormat?.toLocaleString("en-US", {
    maximumFractionDigits: digits,
  })
}

export function universalFormatNumber(params: {
  num?: number
  locale?: string
}) {
  return params.num?.toLocaleString(params.locale || "en-US", {
    maximumFractionDigits: 2,
  })
}
