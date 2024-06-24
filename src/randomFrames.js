// Require the given module
const fs = require('fs');

const path = "./RandomFrames/"
const frames = 100  // amount of frames for video
const digits = frames.toString().length    // amount of digits for 'frames'
const resX = 192    // frame width
const resY = 144    // frame height

for (f = 1; f <= frames; f++) {
    
    frame = "P1\n" + resX + " " + resY + "\n"   // PBM header
    for (i = 0; i < resX; i++) {
        for (j = 0; j < resY; j++) {
            if (Math.random() >= 0.5) {
                frame += "1 "
            }
            else {
                frame += "0 "
            }
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

// after this, cd into the directory and run this to make a video:
// ffmpeg -framerate 10 -pattern_type glob -i '*.pbm' -c:v libx264 -pix_fmt yuv420p output.mp4