import functions from './functions'

let { getData, randomQuote, newWindow, cacheImages } = functions
let heroNames = ['Alchemist', 'Arc Warden', 'Batrider', 'Bloodseeker', 'Dark Seer', 'Dazzle', 'Disruptor',
  'Dragon Knight', 'Enigma', 'Faceless Void', 'Juggernaut', 'Lina', 'Lone Druid', 'Lycan', 'Nyx Assassin',
  'Omniknight', 'Queen of Pain', 'Shadow Fiend', 'Sven', 'Tinker', 'Treant Protector', 'Troll Warlord', 'Zeus']

heroNames.map((el) => { require(`../img/${el}.jpg`) })

export default () => {
  let api = 'https://cdn.rawgit.com/sdq-sts/cd78d7dd08600fcdfaadfe7451f1c48a/raw/e5c73470f40a9aa2ce3429e0fc1f2dcea7932379/dota-quotes.json' // Production

  let twitterBtn = document.querySelector('.twitter-share')
  let heroNameDiv = document.querySelector('.hero-name')
  let soundTrack = document.querySelector('.soundtrack')
  let sentenceDiv = document.querySelector('.sentence')
  let container = document.querySelector('.container')
  let randomBtn = document.querySelector('.get-quote')
  let soundBtn = document.querySelector('.get-sound')
  let audio = document.querySelector('.audio')

  audio.volume = 0.2
  soundTrack.volume = 0.02

  getData(api, (data) => {
    let quotes = data
    let info = randomQuote(quotes, sentenceDiv, heroNameDiv)
    let twitterUrl = 'https://twitter.com/intent/tweet?hashtags=DotaQuotes&related=freecodecamp&text=' + '"' + info.quote + '"' + ' ' + '(' + info.author + ')'

    document.body.style.backgroundImage = "url('../img/" + info.author + ".jpg')"
    audio.src = info.sound
    soundTrack.play()
    setTimeout(() => { audio.play() }, 2600)

    randomBtn.addEventListener('click', (e) => {
      info = randomQuote(quotes, sentenceDiv, heroNameDiv)
      twitterUrl = 'https://twitter.com/intent/tweet?hashtags=DotaQuotes&related=freecodecamp&text=' + '"' + info.quote + '"' + ' ' + '(' + info.author + ')'
      document.body.style.backgroundImage = "url('img/" + info.author + ".jpg')"
      audio.src = info.sound

      setTimeout(() => { audio.play() }, 800)
    })

    twitterBtn.addEventListener('click', (e) => { newWindow(twitterUrl) })
    soundBtn.addEventListener('click', (e) => { audio.play() })
  })

  cacheImages(heroNames, container)
}
