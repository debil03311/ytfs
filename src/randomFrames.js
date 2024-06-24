// Require the given module
const fs = require('fs');

const path = "./RandomFrames/"
const frames = 100  // amount of frames for video
const digits = frames.toString().length    // amount of digits for 'frames'
const resX = 192    // frame width
const resY = 144    // frame height
const pixels = 4    // width and height for one block of pixels representing one bit, must be a power of 2 (recommend 4)

for (f = 1; f <= frames; f++) {
    
    frame = "P1\n" + resX + " " + resY + "\n"   // PBM header
    data = Array(resX).fill(null)
    for (i = 0; i < data.length; i++) {
        data[i] = Array(resY).fill(0)
    }

    // fill data with 1s and 0s
    for (i = 0; i < resX; i += pixels) {
        for (j = 0; j < resY; j += pixels) {

            // one block
            if (Math.random() >= 0.5) {
                for (x = i; x < (i + pixels); x++) {
                    for (y = j; y < (j + pixels); y++) {
                        data[x][y] = 1
                    }
                }
            }
        }
    }

    // copy data to frame string
    for (j = 0; j < resY; j++) {
        for (i = 0; i < resX; i++) {
            frame += data[i][j] + " "
        }
        frame += "\n"
    }


    filename = "frame"
    fnum = f.toString()
    while (fnum.length != digits) {
        fnum = "0" + fnum
    }
    filename += fnum
    filename += ".pbm"
    
    fs.writeFileSync(path + filename, frame);
}

// after this, cd into the directory and run this to make a video (change 03d to w/e the amount of digits is)
// ffmpeg -framerate 10 -pattern_type glob -i '*.pbm' -c:v libx264 -pix_fmt yuv420p <video>.mp4

// after downloading a video, run this command to extract frames (change 03d to w/e the amount of digits is)
// ffmpeg -i <video>.mp4 frame%03d.pbm