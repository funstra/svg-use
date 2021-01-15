window.onload = e => {
    let cnv = document.getElementById('overlay-cnv')
    let t = 0
    cnv.width = cnv.clientWidth
    cnv.height = cnv.clientHeight

    window.onresize = e => {
        cnv.width = cnv.clientWidth
        cnv.height = cnv.clientHeight
        draw(t)
    }

    let mouse = {}
    window.onmousemove = e => {
        mouse.x = e.clientX
        mouse.y = e.clientY
    }

    let ctx = cnv.getContext('2d')


    function grid({ xOffset, yOffset, x, y, w, h }, fArr) {

        for (let i = 0; i < x; i++) {
            ctx.moveTo((i / x) * w, 0)
            for (let j = 0; j < y; j++) {
                let f = fArr[Math.floor(Math.random() * fArr.length)]
                ctx.lineWidth = Math.floor(Math.random() * 2)
                if (j < 4) {
                    f((i / x) * h + xOffset(i / x, 4, 8, 0.1), (j / y) * w)
                }
                f((i / x) * h, (j / y) * w + 32)
            }
        }
    }

    function draw() {
        ctx.clearRect(0, 0, cnv.width, cnv.height)
        let f = (x, y) => ctx.strokeRect(x, y, 16, 4)
        let g = (x, y) => ctx.lineTo(x, y)
        let h = (x, y) => ctx.fillRect(x, y, 4, 4)
        let offsetF = (step, freq, amp, delta) => Math.sin((step * Math.PI * freq + t * delta)) * amp
        ctx.beginPath()
        grid(
            {
                xOffset: offsetF,
                yOffset: () => { },
                x: 64, y: 64,
                w: cnv.height, h: cnv.width,
            },
            [f, g, h])
        ctx.lineCap = 'round'
        ctx.stroke()

    }
    function animate() {
        t++
        draw(t)
        // requestAnimationFrame(animate)
    }

    animate()

}

