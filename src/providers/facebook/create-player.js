import config from './config'

export default (elementId, settings) => {
  const conf = {
    ...config.defaultSettings,
    ...settings
  }

  const fbPlayerElement = document.querySelector(`#${elementId}`)

  if (!fbPlayerElement) {
    return Promise.reject(new Error(`Can't find element with id: ${elementId}`))
  }

  fbPlayerElement.setAttribute('data-href', settings.href)
  fbPlayerElement.setAttribute('data-width', '500')
  fbPlayerElement.setAttribute('data-allowfullscreen', 'true')
  fbPlayerElement.classList.add('fb-video')

  return new Promise((resolve, reject) => {
    FB.init(config.defaultSettings)
    FB.Event.subscribe('xfbml.ready', msg => {
      if (!msg) {
        return Promise.reject('Facebook provider could not load.')
      }

      // check if loaded + verify it's correct instance by element id
      if (msg.type === 'video' && msg.id === elementId) {
        resolve(msg.instance)
      }
    })
  })
}
