# VideoCommander

This library unifies video player APIs.
Youtube, Vimeo, Facebook, Twitch and other players traditionaly have different APIs.
VideoCommander provides one way of configuration, method calls & event handling, no matter which provider you decide to support.

## Quick Start

Creating a player inside a container. Since VideoCommander is UMD library bear in mind that in browser environment you should be using ".default" to access video providers

```javascript
import {registerProvider, VideoCommander} from 'video-commander'
import YoutubeProvider from 'video-commander/dist/vcProviderYoutube'
import VimeoProvider from 'video-commander/dist/vcProviderVimeo'

registerProvider('yt', YoutubeProvider)
registerProvider('vimeo', YoutubeProvider)

const ytPlayer = new VideoCommander({
  provider: 'yt',
  videoId: 'HAwC0swp96I'
})

const vimeoPlayer = new VideoCommander({
  provider: 'vimeo',
  videoId: '19231868'
})
````

## Available methods

All the methods return Promises because some providers handle calls asynchronosly.
The calls for which provider libraries execute return immediately resolved promise(Promise.resolve()) just for the sake of consistency.
Usually you don't need to worry about the return values from this calls, but in case something is asynchronous and you need to wait for it this library supports it.

```javascript
play():  Promise<void | Error>,
pause():  Promise<void | Error>,
stop():  Promise<void | Error>,
seek(seconds: number):  Promise<number | Error>,
mute():  Promise<number | Error>,
unMute():  Promise<number | Error>,
setVolume(volume: number):  Promise<number | Error>,
getVolume():  Promise<number | Error>,
getState():  Promise<any>,
getCurrentTime():  Promise<number | Error>,
getDuration():  Promise<number | Error>,
destroy():  Promise<void | Error>
```

## Event handling

### Subscribing to events
```javascript
addListener(eventName: string, listener: Function)
removeListener(eventName: string, listener: Function)
removeAllListeners(eventName?: string) // if eventName is left out all event handlers are removed
```

VideoCommander instance dispatches:

**READY**, **PLAY**, **PAUSE**, **STOP**, **SEEK**, **STATE_CHANGE**, **IDLE**, **ERROR**, **BUFFERING**

Event map is available through:

```javascript
import {VideoCommanderEvents} from 'video-commander'
```
