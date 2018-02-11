const defaultSettings = {
  id: 0,
  autoplay: false,
  loop: false
}

export default (elementId, settings) => {
  const conf = {
    ...defaultSettings,
    ...settings
  }

  return Promise.resolve(new Vimeo.Player(elementId, conf))
}
