import {VideoCommanderEvents} from '../../events'
import createEmitter from '../create-emitter'

export default function bindHandlers(playerInstance, emitFunction) {
  if (emitFunction) {
    const createEmitterForEvent = createEmitter(emitFunction)
    const handlers = {
      [Twitch.Player.READY]: createEmitterForEvent(VideoCommanderEvents.READY),
      [Twitch.Player.ENDED]: createEmitterForEvent(VideoCommanderEvents.STOP),
      [Twitch.Player.PAUSE]: createEmitterForEvent(VideoCommanderEvents.PAUSE),
      [Twitch.Player.PLAY]: createEmitterForEvent(VideoCommanderEvents.PLAY),
      [Twitch.Player.OFFLINE]: createEmitterForEvent(VideoCommanderEvents.STATE_CHANGE, 'offline'),
      [Twitch.Player.ONLINE]: createEmitterForEvent(VideoCommanderEvents.STATE_CHANGE, 'online')
    }

    Object.keys(handlers)
    .forEach(eventName => {
      playerInstance.addEventListener(eventName, handlers[eventName])
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
      playerInstance.setMuted(true)
      return Promise.resolve(0)
    },
    unMute() {
      playerInstance.setMuted(false)
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
      return Promise.resolve()
    }
  }

  return methodHandlers
}
