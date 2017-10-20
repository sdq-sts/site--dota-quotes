'use strict'
/* global XMLHttpRequest */

// Ajax request
function getData (url, cb) {
  var req = new XMLHttpRequest()
  req.open('GET', url, true)
  req.onload = function () {
    if (req.status >= 200 && req.status < 400) {
      var data = JSON.parse(req.responseText)
      cb(data)
    } else {
      console.error('Error: status - ' + req.status)
    }
  }
  req.onerror = () => console.error('Error on connection')
  req.send()
}

// Random number generator
function randomNum (min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}

// Random quote generator
function randomQuote (arr, sentenceDiv, heroNameDiv) {
  var n = randomNum(0, arr.length)
  var info = {
    quote: arr[n].quote,
    author: arr[n].author,
    sound: arr[n].sound
  }
  sentenceDiv.innerHTML = '"' + info.quote + '"'
  heroNameDiv.innerHTML = '—' + info.author

  return info
}

// Open new Window
function newWindow (url) {
  window.open(url, 'Share', 'width=550, height=400, toolbar=0, scrollbars=0, location=0, statusbar=0, menubar=0, resizable=1');
}

// Cache images
function cacheImages (heroNames, container) {
  let imagesContainer = document.createElement('DIV')
  imagesContainer.classList.add('images-cache')

  heroNames.map((el) => {
    let img = document.createElement('IMG')
    img.src = `../img/${el}.jpg`
    imagesContainer.appendChild(img)
  })

  container.appendChild(imagesContainer)
}

export default { getData, randomNum, randomQuote, newWindow, cacheImages }
