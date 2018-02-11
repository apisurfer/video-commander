import {VideoCommanderEvents} from '../../events'
import createEmitter from '../create-emitter'

export default function bindHandlers(playerInstance, emitFunction) {
  if (emitFunction) {
    const createEmitterForEvent = createEmitter(emitFunction)

    const handlers = {
      loaded: createEmitterForEvent(VideoCommanderEvents.READY),
      play: createEmitterForEvent(VideoCommanderEvents.PLAY),
      pause: createEmitterForEvent(VideoCommanderEvents.PAUSE),
      seeked: createEmitterForEvent(VideoCommanderEvents.SEEK),
      ended: createEmitterForEvent(VideoCommanderEvents.STOP),
      timeupdate: createEmitterForEvent(VideoCommanderEvents.STATE_CHANGE, 'time'),
      progress: createEmitterForEvent(VideoCommanderEvents.STATE_CHANGE, 'progress'),
      error: createEmitterForEvent(VideoCommanderEvents.ERROR)
    }

    Object.keys(handlers)
    .forEach(eventName => {
      playerInstance.on(eventName, handlers[eventName])
    })
  }

  // SEPARATE TO ANOTHER FOLDER
  const methodHandlers = {
    play() {
      return playerInstance.play()
    },
    pause() {
      return playerInstance.pause()
    },
    stop() {
      playerInstance.setCurrentTime(0)
      return playerInstance.pause()
    },
    seek(seconds) {
      return playerInstance.setCurrentTime(seconds)
    },
    mute() {
      return playerInstance.setVolume(0)
    },
    unMute() {
      return playerInstance.setVolume(1)
    },
    setVolume(volume) {
      return playerInstance.setVolume(volume)
    },
    getVolume() {
      return playerInstance.getVolume()
    },
    getCurrentTime() {
      return playerInstance.getCurrentTime()
    },
    getDuration() {
      return playerInstance.getDuration()
    },
    destroy() {
      return playerInstance.unload()
    }
  }

  return methodHandlers
}
