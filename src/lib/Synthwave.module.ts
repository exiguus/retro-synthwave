// Understand canvas 2d context 3d animation
//  original code: https://github.com/victorqribeiro/retroSynthwave

//
// Three steps are required to get this animation running:
// 1. init() the matrix system
//    create a 2d canvas context
//    create the matrix and points (x, y, z)
// 2. update() the initialised matrix
//    change each point (x, y, z)
//    call show() and request a animation frame by it self recursively
// 3. show() the changes
//    draw changes to the canvas
//
// update() call show() and then request the animation frame that call update()

// eslint-disable-next-line no-unused-vars

type Synthwave = {
  canvas: HTMLCanvasElement | null
  c: CanvasRenderingContext2D | null
  w: number
  h: number
  u: number
  points: Array<Array<{ x: number; y: number; z: number }>> | null
  offset: number
  gradient: CanvasGradient | undefined
  element: HTMLDivElement | null
  spacing: number
  zOffset: number
}

type InitProps = {
  element: HTMLDivElement
  spacing?: number
  zOffset?: number
}

const synthwave: Synthwave = {
  canvas: null,
  c: null,
  w: 0,
  h: 0,
  u: 0,
  points: null,
  offset: 0,
  gradient: undefined,
  element: null,
  spacing: 0,
  zOffset: 0,
}

// spacing: X Coordinate spacing
function init({ element, spacing = 40, zOffset = 10 }: InitProps) {
  synthwave.element = element
  synthwave.spacing = spacing
  synthwave.zOffset = zOffset

  // create canvas element and adjust the element size
  synthwave.canvas = document.createElement('canvas')
  // eslint-disable-next-line no-restricted-globals
  synthwave.canvas.width = synthwave.w = innerWidth
  // eslint-disable-next-line no-restricted-globals
  synthwave.canvas.height = synthwave.h = innerHeight
  // get the drawing context on the canvas by creating
  //  a CanvasRenderingContext2D
  synthwave.c = synthwave.canvas.getContext('2d')
  // translate the starting points of the coordinate system to the center / middle of the canvas
  synthwave.c?.translate(synthwave.w / 2, synthwave.h / 2)
  // append the canvas to the html document body
  element.appendChild(synthwave.canvas)
  // Create a Matrix with 30 lines and 60 rows
  //  by creating a Array with a length of 30 and fill each item with a value of 0
  //  then map each item and change the value to a Array with a length of 60, each item filled with  a value of 0
  synthwave.points = Array(30)
    .fill(0)
    .map(_ => Array(60).fill(0))
  // Set x, y, z values for each coordinate of the Matrix
  //  by looping each line
  for (let i = 0; i < synthwave.points.length; i++) {
    // and every row
    for (let j = 0; j < synthwave.points[0].length; j++) {
      // difference between the looped raws and the half row count
      const dist = Math.abs(j - synthwave.points[0].length / 2)
      synthwave.points[i][j] = {
        x: j * synthwave.spacing, // x position increased in every loop by a factor of n+1
        y: Math.random() * -(dist * dist) + 30, // y position randomly lowered in a flat tapered curve
        z: -i * synthwave.zOffset, // z position of the column
      }
    }
  }

  // offset for creating squares
  //  TODO: move to show()
  synthwave.offset = (synthwave.points[0].length * synthwave.spacing) / 2

  // Create a linear Gradient which has two colors for the sun
  synthwave.gradient = synthwave.c?.createLinearGradient(0, -150, 0, 100)
  synthwave.gradient?.addColorStop(0, 'gold')
  synthwave.gradient?.addColorStop(1, 'rgb(200, 0, 100)')
  update(0) // call the animation update
}

// Performance
// eslint-disable-next-line no-unused-vars
// let previousTime

// update current z position and request a animation frame
function update(_time: number) {
  // the requestAnimationFrame callback has a single argument, a DOMHighResTimeStamp
  // Check < -300
  // DEBUG
  // let z300CountSmaller = 0
  // let z300CountBigger = 0
  // update current z position
  //  by looping each line
  if (synthwave.points)
    for (let i = 0; i < synthwave.points.length; i++) {
      let gone = false
      // and every row
      for (let j = 0; j < synthwave.points[0].length; j++) {
        synthwave.points[i][j].z -= 0.5
        // TODO: Find out why -300?
        if (synthwave.points[i][j].z < -300) {
          gone = true
          // DEBUG
          // eslint-disable-next-line no-unused-vars
        }
        //   z300CountSmaller += 1
        // } else {
        //   // DEBUG
        //   // eslint-disable-next-line no-unused-vars
        //   z300CountBigger += 1
        // }
      }
      if (gone) {
        // remove the last row of the line and copy all other
        const arr = synthwave.points.pop()
        // loop the copy of rows and modify z and y position
        if (arr) {
          for (let k = 0; k < arr.length; k++) {
            // difference between the looped raws and the half row count
            const dist = Math.abs(k - arr.length / 2)
            arr[k].z = 0 // TODO: why 0?
            arr[k].y = Math.random() * -(dist * dist) + 30 // y position randomly lowered in a flat tapered curve
          }
          // add the copied line at the beginning of the matrix
          synthwave.points.unshift(arr)
        }
      }
    }
  // create the sun and the squares
  show()

  // DEBUG
  // console.log(`Smaller: ${z300CountSmaller} / Bigger: ${z300CountBigger}`)

  // perform the animation
  synthwave.u = requestAnimationFrame(update)

  // Performance
  // cancelAnimationFrame(u)
  // if (previousTime !== time) {
  //   u = requestAnimationFrame(update)
  // }
}

function show() {
  // Clear pixels in the context area and set them transparent black
  if (!synthwave.c) return
  synthwave.c.clearRect(
    -synthwave.w / 2,
    -synthwave.h / 2,
    synthwave.w,
    synthwave.h
  )
  // Start draw new in the cleared area
  synthwave.c.beginPath()
  // add a circular arc with a radius of 200 and a startAngel of PI * 2 (begin a new sub-path)
  synthwave.c.arc(0, 0, 200, 0, Math.PI * 2)
  // add a line from the current point to the current sub-path
  synthwave.c.closePath()
  // add shadow and blur and fill the current context
  synthwave.c.shadowColor = 'orange'
  synthwave.c.shadowBlur = 100
  synthwave.c.fillStyle = synthwave.gradient || 'gold'
  synthwave.c.fill()
  // remove the shadow blur from the context for the upcoming squares
  synthwave.c.shadowBlur = 0
  // create squares and fill / stroke them to the current context
  //  by looping each line
  if (synthwave.points)
    for (let i = 0; i < synthwave.points.length - 1; i++) {
      // and each row
      for (let j = 0; j < synthwave.points[0].length - 1; j++) {
        const size = 300 / (300 + synthwave.points[i][j].z)
        const nextSize = 300 / (300 + synthwave.points[i + 1][j].z)
        // Start draw new (square) in the cleared area
        synthwave.c.beginPath()
        // Begin a new sub-path with smaller x and bigger y position
        synthwave.c.moveTo(
          (synthwave.points[i][j].x - synthwave.offset) * size,
          synthwave.points[i][j].y * size
        )
        // Line to the next row and connect them
        synthwave.c.lineTo(
          (synthwave.points[i][j + 1].x - synthwave.offset) * size,
          synthwave.points[i][j + 1].y * size
        )
        // Line to the next line and row and connect them
        synthwave.c.lineTo(
          (synthwave.points[i + 1][j + 1].x - synthwave.offset) * nextSize,
          synthwave.points[i + 1][j + 1].y * nextSize
        )
        // Line to the next line and connect them
        synthwave.c.lineTo(
          (synthwave.points[i + 1][j].x - synthwave.offset) * nextSize,
          synthwave.points[i + 1][j].y * nextSize
        )
        // line to the current sub-path to finish the square
        synthwave.c.closePath()
        // fill and stroke the square
        const color = 300 + synthwave.points[i][j].z
        synthwave.c.fillStyle = `rgba(0, 0, 0, ${
          -synthwave.points[i][j].z / 100
        })`
        synthwave.c.strokeStyle = `rgba(${250 - color}, 0, ${50 + color}, ${
          1 - color / 300
        })`
        synthwave.c.fill()
        synthwave.c.stroke()
      }
    }
}

export default init
