let songs = [
  {
    name: "Chúng ta của sau này",
    description: "T.R.I",
    src: "./assets/song/ChungTaSauNay-TRI-6929586.mp3",
    img: "./assets/imgs/chúng ta sau này.jpg",
  },
  {
    name: "Dịu Dàng Em Đến",
    description: "Erik",
    src: "./assets/song/song3.mp3",
    img: "./assets/imgs/3.jpg",
  },
  {
    name: "Cưới Thôi",
    description: "Masew Bray",
    src: "./assets/song/song4.mp3",
    img: "./assets/imgs/4.jpg",
  },
  {
    name: "3107 3",
    description: "Masew Bray",
    src: "./assets/song/31073-WNDuonggNautitie-7059323.mp3",
    img: "./assets/imgs/3170.jpg",
  },
  {
    name: "Trên tình bạn dưới tình yêu",
    description: "MIN",
    src: "./assets/song/TrenTinhBanDuoiTinhYeu-MIN-6802163.mp3",
    img: "./assets/imgs/1.jpg",
  },
  {
    name: "Yêu là cưới",
    description: "PhatHo X2X",
    src: "./assets/song/YeuLaCuoi-PhatHoX2X-7084519.mp3",
    img: "./assets/imgs/yêu là cưới.jpg",
  },
];

const songName = document.querySelector(".song-name")
const imgSong = document.querySelector(".img-t")
const nextSong = document.querySelector(".control-next")
const prevSong = document.querySelector(".control-previous")
const reload = document.querySelector(".control-reload > i")
const random = document.querySelector(".control-random > i")
const audio = document.querySelector("audio")
const playList = document.querySelector(".list-song")

let currentIndex = 0
let isActive = false
let isRepeat = false

function renderSong() {
    let htmls =  songs.map((song,i) => {
        return `<div class="song-item ">
                    <div class="content ${i === currentIndex ? "activeSong" : ""} " data-index=${i}>
                        <div class="song">
                          <div class="img">
                            <img class="img-song" src="${song.img}" alt="">
                          </div>
                          <div class="infor">
                            <h3 class="name">${song.name}</h3>
                            <p class="description">${song.description}</p>
                          </div>
                        </div>
                        <div class="option">
                            <i class="fas fa-ellipsis-h"></i>
                        </div>
                    </div>
                </div>`
    })
    playList.innerHTML = htmls.join("")
}

let imgRotate =  imgSong.animate([
  {
    transform: "rotate(360deg)"
  }
], {
  duration: 10000,
  iterations: Infinity
}
)
imgRotate.pause()

function imgRotates() {
  audio.onpause = () => {
    imgRotate.pause()
  }
  audio.onplay = () => {
    imgRotate.play()
  }
}

function loadSong() {
    songName.innerText = songs[currentIndex].name
    imgSong.src = songs[currentIndex].img
    let htmlSong = `<source src="${songs[currentIndex].src}" type="audio/mp3">`
    audio.innerHTML = htmlSong
}
function next() {
    nextSong.onclick = () => {
      currentIndex++
      if (currentIndex >= songs.length) {
        currentIndex = 0
      }
      if (isActive) {
        randomSong()
      } else {
        loadSong()
      }
      renderSong()
      audio.load()     
    }
}

function prev () {
  prevSong.onclick = () => {
    currentIndex--
    if (currentIndex < 0) {
      currentIndex = songs.length - 1
    }
    if (isActive) {
      randomSong()
    } else {
      loadSong()
    }
    renderSong()
    audio.load()
  }
}

reload.onclick = () => {
  isRepeat = !isRepeat 
  reload.classList.toggle('active', isRepeat)
}

random.onclick = () => {
  isActive = !isActive 
  random.classList.toggle('active', isActive)
}

function randomSong() {
  let numb
    do {numb = Math.floor(Math.random() *songs.length)}
    while(numb === currentIndex)
    currentIndex = numb
    loadSong()
  }

function autoPlaySong () {
    audio.onended = () => {
      if (isRepeat) {
        audio.load()
      } else {
        nextSong.click()
      }
    }
}

function clickPlaySong() {
  playList.onclick = (e) => {
    let clickNode = e.target.closest('.content:not(.activeSong)')
    if (clickNode || e.target.closest('.option')) {
      if (clickNode) {
        currentIndex = Number(clickNode.getAttribute('data-index'))
        loadSong()
        renderSong()
        audio.load()
      }
      if (e.target.closest('.option')) {

      }
    }
  }
}



function start() {
    renderSong()
    imgRotates()
    autoPlaySong ()
    loadSong()
    next()
    prev()
    clickPlaySong()
}

start()