import {VideoCommanderEvents} from '../../events'
import createEmitter from '../create-emitter'

export default function bindHandlers(playerInstance, emitFunction) {
  if (emitFunction) {
    const createEmitterForEvent = createEmitter(emitFunction)
    const eventHandlers = {
      onReady: createEmitterForEvent(VideoCommanderEvents.READY),
      onStateChange: createEmitterForEvent(VideoCommanderEvents.STATE_CHANGE, 'state'),
      onPlaybackQualityChange: createEmitterForEvent(VideoCommanderEvents.STATE_CHANGE, 'quality'),
      onPlaybackRateChange: createEmitterForEvent(VideoCommanderEvents.STATE_CHANGE, 'rate'),
      onApiChange: createEmitterForEvent(VideoCommanderEvents.STATE_CHANGE, 'api'),
      onError: createEmitterForEvent(VideoCommanderEvents.ERROR)
    }

    Object.keys(eventHandlers)
    .forEach(eventName => {
      playerInstance.addEventListener(eventName, eventHandlers[eventName])
    })
  }

  // SEPARATE TO ANOTHER FOLDER
  const methodHandlers = {
    play() {
      playerInstance.playVideo()
      return Promise.resolve()
    },
    pause() {
      playerInstance.pauseVideo()
      return Promise.resolve()
    },
    stop() {
      playerInstance.stopVideo()
      return Promise.resolve()
    },
    seek(seconds) {
      playerInstance.seekTo(seconds, true)
      return Promise.resolve(seconds)
    },
    mute() {
      playerInstance.mute()
      return Promise.resolve(0)
    },
    unMute() {
      playerInstance.unMute()
      return Promise.resolve(1)
    },
    setVolume(volume) {
      playerInstance.setVolume(volume)
      return Promise.resolve(volume)
    },
    getVolume() {
      return Promise.resolve(playerInstance.getVolume())
    },
    getCurrentTime() {
      return Promise.resolve(playerInstance.getCurrentTime())
    },
    getDuration() {
      return Promise.resolve(playerInstance.getDuration())
    },
    destroy() {
      playerInstance.destroy()
      return Promise.resolve()
    }
  }

  return methodHandlers
}
