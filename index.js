window.onload = e => {
    let cnv = document.getElementById('overlay-cnv')
    let t = 0
    cnv.width = cnv.clientWidth
    cnv.height = cnv.clientHeight

    window.onresize = e => {
        cnv.width = cnv.clientWidth
        cnv.height = cnv.clientHeight
        console.log(cnv.width, cnv.height)
    }

    let mouse = {}
    window.onmousemove = e => {
        mouse.x = e.clientX
        mouse.y = e.clientY
    }

    let ctx = cnv.getContext('2d')


    function grid({ xOffset, yOffset, x, y, w, h }, f, g) {
        for (let i = 0; i < x; i++) {
            for (let j = 0; j < y; j++) {
                f((i / x) * w + xOffset, (j / y) * h + yOffset + Math.sin((i/x*Math.PI + t*0.05)) * 32)
            }
        }
    }

    function draw() {
        ctx.beginPath()
        let f = (x, y) => ctx.strokeRect(x, y, 16, 4)
        grid(
            {
                xOffset: 0,
                yOffset: 0,
                x: 128, y: 16,
                w: cnv.width, h: cnv.height,
            },
            f)
        ctx.lineWidth = 2
        ctx.lineCap = 'round'
        ctx.stroke()
    }
    function animate() {
        t++
        console.log(t)
        ctx.clearRect(0, 0, cnv.width, cnv.height)
        draw(t)
        requestAnimationFrame(animate)
    }

    animate()

}

