document.addEventListener("DOMContentLoaded", () => {
  
  "use strict"


  // functions
  // ——————————————————————————————————————————————————————————————————————————

  // from https://github.com/koenbok/Framer/blob/master/framer/Utils.coffee
  const modulate = (value, rangeA, rangeB, limit = true) => {  

    const fromL = rangeA[0]
    const fromH = rangeA[1]
    const toL   = rangeB[0]
    const toH   = rangeB[1]

    const result = toL + (((value - fromL) / (fromH - fromL)) * (toH - toL))

    if (limit == true) {
      if (toL < toH) {
        if (result < toL) return toL 
        if (result > toH) return toH 
      } else {
        if (result > toL) return toL 
        if (result < toH) return toH 
      }
    }

    return result
  }


  const animate = (value, element, property, rangeA, rangeB) => {  

    element.modulate = modulate(value, rangeA, rangeB)

    switch (property) {
      case 'translateY':
        element.style.transform = `translateY(${element.modulate}px)`
        break
      case 'scale':
        element.style.transform = `scale(${element.modulate})`
        break
      case 'height':
        element.style.height = element.modulate + 'px'
        break
      case 'opacity':
        element.style.opacity = element.modulate
        break
      case 'bgY':
        element.style.backgroundPosition = 'left bottom ' + element.modulate + 'px'
        break
    }
  }


  // scroll events
  // ——————————————————————————————————————————————————————————————————————————

  const framersvg = {}
  const unuShop = {}
  const pipefy = {}
  const gamerlist = {}
  const ttype = {}

  unuShop.section   = document.querySelector('#unushop .left')
  unuShop.parent    = document.querySelector('#unushop')

  pipefy.section    = document.querySelector('#pipefy')
  pipefy.column1    = document.querySelector('#pipefy .column1')
  pipefy.column2    = document.querySelector('#pipefy .column2')
  pipefy.column3    = document.querySelector('#pipefy .column3')

  gamerlist.section = document.querySelector('#gamerlist')
  gamerlist.table   = document.querySelector('#gamerlist .table-content')

  ttype.section     = document.querySelector('#ttype .right')
  ttype.img1        = document.querySelector('#ttype img:first-child')
  ttype.img2        = document.querySelector('#ttype img:nth-child(2)')
  ttype.img3        = document.querySelector('#ttype img:nth-child(3)')

  const videos      = document.getElementsByTagName('video')
  
  videos[0].addEventListener("canplay", () => {
    videos[0].classList.remove('loading')
    videos[0].play()
  })
  

  window.addEventListener('scroll', () => {

    // unu shop
    // ————————————————————————————————————————————————————————————————————————

    unuShop.box = unuShop.section.getBoundingClientRect()

    if (unuShop.box.top < window.innerHeight - unuShop.box.bottom) {
      unuShop.parent.classList.remove('remove-cart')
      unuShop.parent.classList.add('cart')
    } else {
      unuShop.parent.classList.add('remove-cart')
      unuShop.parent.classList.remove('cart')
    }


    // pipefy
    // ————————————————————————————————————————————————————————————————————————

    pipefy.box = pipefy.section.getBoundingClientRect()
    pipefy.edges = window.innerHeight + pipefy.box.height
    pipefy.current =
      window.innerHeight - pipefy.box.bottom - pipefy.box.top
  
    animate(pipefy.current,
      pipefy.column1, 'bgY', [-pipefy.edges,pipefy.edges], [-400,-200])

    animate(pipefy.current,
      pipefy.column2, 'bgY', [-pipefy.edges,pipefy.edges], [-400,-50])

    animate(pipefy.current,
      pipefy.column3, 'bgY', [-pipefy.edges,pipefy.edges], [-400,100])


    // gamerlist
    // ————————————————————————————————————————————————————————————————————————
  
    gamerlist.box = gamerlist.section.getBoundingClientRect()
    gamerlist.edge = window.innerHeight + gamerlist.box.height
    gamerlist.current =
      window.innerHeight - gamerlist.box.bottom - gamerlist.box.top

    animate(gamerlist.current, gamerlist.table,
      'translateY', [-gamerlist.edge,gamerlist.edge], [0,-150])


    // ttype
    // ————————————————————————————————————————————————————————————————————————

    ttype.box = ttype.section.getBoundingClientRect()

    if (ttype.box.top < window.innerHeight*1.3 - ttype.box.bottom) {
      ttype.img1.classList.remove('top')
      ttype.img1.classList.add('supertop')
      ttype.img2.classList.add('top')
      ttype.img3.classList.remove('bottom')
    } else {
      ttype.img1.classList.remove('supertop')
      ttype.img1.classList.add('top')
      ttype.img2.classList.remove('top')
      ttype.img3.classList.add('bottom')
    }


    // videos autoplay
    // ————————————————————————————————————————————————————————————————————————

    for (var i=0; i<videos.length; i++) {
      if (videos[i].paused) {
        videos[i].play()
      }
    }

  })

})