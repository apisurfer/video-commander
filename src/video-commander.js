import {EventEmitter} from 'eventemitter3'
import loader from './services/provider-loader'
import {getProvider} from './services/provider-registry'
import getUUID from './util/uuid'

export class VideoCommander extends EventEmitter {
  constructor(domNode, configuration) {
    if (!domNode) {
      throw new Error('DOM element not specified or not existing.')
    }

    super()

    const domNodeIdentifier = domNode.getAttribute('id') || `player-${getUUID()}`
    domNode.setAttribute('id', domNodeIdentifier)

    this.element = domNode

    loader(configuration.provider)
    .then(() => {
      const videoProvider = getProvider(configuration.provider)
      const translatedConfiguration = videoProvider.translateConfiguration(configuration)

      videoProvider.createPlayer(domNodeIdentifier, translatedConfiguration)
        .then(playerInstance => {
          this.provider = videoProvider.bindHandlers(playerInstance, this.emit.bind(this))
        })
    })
    .catch(() => {
      console.error('Provider not loaded successfuly')
    })
  }

  providerExecute(methodName, ...args) {
    const providerMethodExists = !!this.provider && this.provider[methodName]

    if (providerMethodExists) {
      return Promise.resolve(this.provider[methodName](...args))
    }

    return Promise.reject(new Error('Method not implemented on the provider!'));
  }

  play() { return this.providerExecute('play') }
  pause() { return this.providerExecute('pause') }
  stop() { return this.providerExecute('stop') }
  seek(seconds) { return this.providerExecute('seek', seconds) }
  mute() { return this.providerExecute('mute') }
  unMute() { return this.providerExecute('unMute') }
  setVolume(volume) { return this.providerExecute('setVolume', volume) }
  getVolume() { return this.providerExecute('getVolume') }
  getCurrentTime() { return this.providerExecute('getCurrentTime') }
  getDuration() { return this.providerExecute('getDuration') }
  destroy() { return this.providerExecute('destroy') }
}
