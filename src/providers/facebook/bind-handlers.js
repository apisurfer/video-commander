import {VideoCommanderEvents} from '../../events'
import createEmitter from '../create-emitter'

export default function bindHandlers(playerInstance, emitFunction) {
  if (emitFunction) {
    const createEmitterForEvent = createEmitter(emitFunction)
    const handlers = {
      startedPlaying: createEmitterForEvent(VideoCommanderEvents.PLAY),
      paused: createEmitterForEvent(VideoCommanderEvents.PAUSE),
      finishedPlaying: createEmitterForEvent(VideoCommanderEvents.STOP),
      startedBuffering: createEmitterForEvent(VideoCommanderEvents.BUFFERING, 'start'),
      finishedBuffering: createEmitterForEvent(VideoCommanderEvents.BUFFERING, 'finish'),
      error: createEmitterForEvent(VideoCommanderEvents.ERROR)
    }

    Object.keys(handlers)
    .forEach(eventName => {
      playerInstance.subscribe(eventName, handlers[eventName])
    })
  }

  // SEPARATE TO ANOTHER FOLDER
  const methodHandlers = {
    play() {
      return Promise.resolve(playerInstance.play())
    },
    pause() {
      return Promise.resolve(playerInstance.pause())
    },
    stop() {
      playerInstance.seek(0)
      return Promise.resolve(playerInstance.pause())
    },
    seek(seconds) {
      playerInstance.seek(seconds)
      return Promise.resolve(seconds)
    },
    mute() {
      playerInstance.mute()
      return Promise.resolve(0)
    },
    unMute() {
      playerInstance.unmute()
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
      return Promise.resolve(playerInstance.getCurrentPosition())
    },
    getDuration() {
      return Promise.resolve(playerInstance.getDuration())
    },
    destroy() {
      return Promise.resolve()
    }
  }

  return methodHandlers
}
