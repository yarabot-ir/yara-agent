import http from "./httpService";

export function getSymbolData(search: any) {
  return http
    .get(`klines${search}`, {})
    .then(({ data }) => {
      return data
    })
}
export function getSymbolLivePrice(symbol: string) {
  return http
    .get(`ticker/price?symbol=${symbol}`, {})
    .then(({ data }) => {
      return data
    })
}

