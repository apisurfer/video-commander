jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000
document.body.innerHTML = window.__html__['test/player-fixtures.html']

describe('VideoCommander', () => {
  it('should be able to register providers', () => {
    const FacebookProvider = window.vcProviderFacebook.default
    const VimeoProvider = window.vcProviderVimeo.default
    const YoutubeProvider = window.vcProviderYoutube.default
    const TwitchProvider = window.vcProviderTwitch.default

    window.videoCommander.registerProvider('facebook', FacebookProvider)
    window.videoCommander.registerProvider('vimeo', VimeoProvider)
    window.videoCommander.registerProvider('youtube', YoutubeProvider)
    window.videoCommander.registerProvider('twitch', TwitchProvider)
  })

  it('should fail on initialization for unknown provider', () => {
    function unknownProviderInitialization() {
      const mockedContainer = document.createElement('div')
      const player = new window.videoCommander.VideoCommander(mockedContainer, {provider: 'non-existing', videoId: '1232'})
    }

    expect(unknownProviderInitialization).toThrow(new Error('Unknown provider'))
  })

  it('should be able to initialize Facebook player', () => {
    const fbContainer = document.querySelector('#player-facebook')
    const facebookPlayer = new window.videoCommander.VideoCommander(fbContainer, {
      provider: 'facebook',
      videoURL: 'https://www.facebook.com/veriapriyatno/videos/10155182221489903/'
    })
  })

  it('should be able to initialize Vimeo player', () => {
    const vimeoContainer = document.querySelector('#player-vimeo')
    const vimeoPlayer = new window.videoCommander.VideoCommander(vimeoContainer, {
      provider: 'vimeo',
      videoId: '19231868'
    })
  })

  it('should be able to initialize Youtube player', () => {
    const youtubeContainer = document.querySelector('#player-youtube')
    const youtubePlayer = new window.videoCommander.VideoCommander(youtubeContainer, {
      provider: 'youtube',
      videoId: 'HAwC0swp96I'
    })
  })

  it('should be able to initialize Youtube player', () => {
    const twitchContainer = document.querySelector('#player-twitch')
    const twitchPlayer = new window.videoCommander.VideoCommander(twitchContainer, {
      provider: 'twitch',
      videoId: '227961386'
    })
  })
})
