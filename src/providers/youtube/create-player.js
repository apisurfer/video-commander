const noop = () => {}

const defaultSettings = {
  videoId: '',
  playerVars: {
    start: 0,
    rel: 0,        // This tells Youtube not to show related videos at the end. If Vibby player is tuned on default is 0
    disablekb: 1,  // Disable keyboard controls
    showinfo: 0,   // When Vibby is turned on default is 0
    controls: 0,
    iv_load_policy: 3,                      // Remove video annotations (https://developers.google.com/youtube/player_parameters)
    modestbranding: 1,                      // Show as little Youtube branding as possible,
    autohide: 0,                            // Never hide YouTube controls (not even in full screen).
    playsinline: 1,
    fs: 0                                   // Disable youtube player to go into their fullscreen
  },
  events: {
    onReady: noop,
    onStateChange: noop,
    onError: noop
  }
}

export default function (elementId, settings) {
  const conf = {
    ...defaultSettings,
    ...settings
  }

  return Promise.resolve(new YT.Player(elementId, conf))
}
