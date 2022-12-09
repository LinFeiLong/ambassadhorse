const hasMetamask = () => {
  return typeof windo !== "undefined" && typeof window.etherum !== "undefined"
}

export { hasMetamask }
