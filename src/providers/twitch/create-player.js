const defaultSettings = {
  video: '',
  autoplay: false
}

export default (elementId, settings) => {
  const conf = {
    ...defaultSettings,
    ...settings
  }

  // $FlowFixMe: suppressing this error until flow supports interfaces with constructor declaration
  return Promise.resolve(new Twitch.Player(elementId, conf))
}
