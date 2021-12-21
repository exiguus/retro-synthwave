let canvas, c, w, h, u, points, offset, spacing, gradient

function init() {
  // create canvas element and adjust the element size
  canvas = document.createElement('canvas')
  canvas.width = w = innerWidth
  canvas.height = h = innerHeight
  // get the drawing context on the canvas by creating
  //  a CanvasRenderingContext2D
  c = canvas.getContext('2d')
  // translate the starting points of the coordinate system to the center / middle of the canvas
  c.translate(w / 2, h / 2)
  // append the canvas to the html document body
  document.getElementById('synthwave').appendChild(canvas)
  // X Coordinate spacing
  spacing = 40
  // Create a Matrix with 30 lines and 60 rows
  //  by creating a Array with a length of 30 and fill each item with a value of 0
  //  then map each item and change the value to a Array with a length of 60, each item filled with  a value of 0
  points = Array(30)
    .fill(0)
    .map(_ => Array(60).fill(0))
  // Set x, y, z values for each coordinate of the Matrix
  //  by looping each line
  for (let i = 0; i < points.length; i++) {
    // and every row
    for (let j = 0; j < points[0].length; j++) {
      // difference between the looped raws and the half row count
      const dist = Math.abs(j - points[0].length / 2)
      points[i][j] = {
        x: j * spacing, // x position increased in every loop by a factor of n+1
        y: Math.random() * -(dist * dist) + 30, // y position randomly lowered in a flat tapered curve
        z: -i * 10, // z position of the column
      }
    }
  }

  // offset for creating squares
  //  TODO: move to show()
  offset = (points[0].length * spacing) / 2

  // Create a linear Gradient which has two colors for the sun
  gradient = c.createLinearGradient(0, -150, 0, 100)
  gradient.addColorStop(0, 'gold')
  gradient.addColorStop(1, 'rgb(200, 0, 100)')
  update(0) // call the animation update
}

// Performance
let previousTime

// update current z position and request a animation frame
function update(time) {
  // the requestAnimationFrame callback has a single argument, a DOMHighResTimeStamp
  // Check < -300
  // DEBUG
  let z300CountSmaller = 0
  let z300CountBigger = 0
  // update current z position
  //  by looping each line
  for (let i = 0; i < points.length; i++) {
    let gone = false
    // and every row
    for (let j = 0; j < points[0].length; j++) {
      points[i][j].z -= 0.5
      // TODO: Find out why -300?
      if (points[i][j].z < -300) {
        gone = true
        // DEBUG
        z300CountSmaller += 1
      } else {
        // DEBUG
        z300CountBigger += 1
      }
    }
    if (gone) {
      // remove the last row of the line and copy all other
      let arr = points.pop()
      // loop the copy of rows and modify z and y position
      for (let k = 0; k < arr.length; k++) {
        // difference between the looped raws and the half row count
        const dist = Math.abs(k - arr.length / 2)
        arr[k].z = 0 // TODO: why 0?
        arr[k].y = Math.random() * -(dist * dist) + 30 // y position randomly lowered in a flat tapered curve
      }
      // add the copied line at the beginning of the matrix
      points.unshift(arr)
    }
  }
  // create the sun and the squares
  show()

  // DEBUG
  // console.log(`Smaller: ${z300CountSmaller} / Bigger: ${z300CountBigger}`)

  // perform the animation
  u = requestAnimationFrame(update)

  // Performance
  // cancelAnimationFrame(u)
  // if (previousTime !== time) {
  //   u = requestAnimationFrame(update)
  // }
}

function show() {
  // Clear pixels in the context area and set them transparent black
  c.clearRect(-w / 2, -h / 2, w, h)
  // Start draw new in the cleared area
  c.beginPath()
  // add a circular arc with a radius of 200 and a startAngel of PI * 2 (begin a new sub-path)
  c.arc(0, 0, 200, 0, Math.PI * 2)
  // add a line from the current point to the current sub-path
  c.closePath()
  // add shadow and blur and fill the current context
  c.shadowColor = 'orange'
  c.shadowBlur = 100
  c.fillStyle = gradient
  c.fill()
  // remove the shadow blur from the context for the upcoming squares
  c.shadowBlur = 0
  // create squares and fill / stroke them to the current context
  //  by looping each line
  for (let i = 0; i < points.length - 1; i++) {
    // and each row
    for (let j = 0; j < points[0].length - 1; j++) {
      const size = 300 / (300 + points[i][j].z)
      const nextSize = 300 / (300 + points[i + 1][j].z)
      // Start draw new (square) in the cleared area
      c.beginPath()
      // Begin a new sub-path with smaller x and bigger y position
      c.moveTo((points[i][j].x - offset) * size, points[i][j].y * size)
      // Line to the next row and connect them
      c.lineTo((points[i][j + 1].x - offset) * size, points[i][j + 1].y * size)
      // Line to the next line and row and connect them
      c.lineTo(
        (points[i + 1][j + 1].x - offset) * nextSize,
        points[i + 1][j + 1].y * nextSize
      )
      // Line to the next line and connect them
      c.lineTo(
        (points[i + 1][j].x - offset) * nextSize,
        points[i + 1][j].y * nextSize
      )
      // line to the current sub-path to finish the square
      c.closePath()
      // fill and stroke the square
      const color = 300 + points[i][j].z
      c.fillStyle = `rgba(0, 0, 0, ${-points[i][j].z / 100})`
      c.strokeStyle = `rgba(${250 - color}, 0, ${50 + color}, ${
        1 - color / 300
      })`
      c.fill()
      c.stroke()
    }
  }
}

export default init
