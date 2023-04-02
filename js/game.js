//assets https://opengameart.org/content/basic-arkanoid-pack
//sounds https://www.sounds-resource.com/nes/arkanoid/sound/3698/
//https://www.flaticon.com/free-icon/arkanoid_2285752
const fieldHeight = 400
const fieldWidth = 700
var keepPlaying = true
var score = 0
const objectiveRows = 3
const objectivePerRow = 10
const winScore = objectiveRows * objectivePerRow

const requestAnimationFrame = window.requestAnimationFrame
//El método window.requestAnimationFrame informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación. El método acepta como argumento una función a la que llamar antes de efectuar el repintado.
//window.webkitRequestAnimationFrame(callback[, element]);



const render = (context, platform, objectives, ball) => {

    ball.y += (Ball.speed * Math.sin(ball.angle))
    ball.x += (Ball.speed * Math.cos(ball.angle))

    context.clearRect(0, 0, fieldWidth, fieldHeight)
    drawObjectives(objectives, context)
    platform.draw(context)
    ball.draw(context)
    core(platform, objectives, ball, context)

    if (keepPlaying) {
        requestAnimationFrame(() => render(context, platform, objectives, ball))
    }

}


window.onload = () => {
    const canvas = document.getElementById('game')
    const context = canvas.getContext('2d')
    const platform = new Platform()
    const ball = new Ball()
    const objectives = createObjectives()

    document.getElementById("moveLeftButton").addEventListener('click', function () {
        platform.movePlatformByButton('left')
    });

    document.getElementById("moveRightButton").addEventListener('click', function () {
        platform.movePlatformByButton('right')
    });


    addEventListener(
        'keydown',
        platform.movePlatformByEvent.bind(platform)
    )
    render(context, platform, objectives, ball)
}


const core = (platform, objectives, ball, context) => {




    if (ball.y >= fieldHeight - Platform.height - Ball.radius) {
        //si esta tocando la barra
        if ((ball.x + (Ball.radius * 2) >= platform.x) && (ball.x - (Ball.radius * 2) <= platform.x + Platform.width)) {
            ball.angle *= -1
            const shift = (platform.x + (Platform.width / 2) - ball.x) / (Platform.width / 2)
            const shiftCoef = (shift / 2) + 0.5
            ball.angle = -(shiftCoef * (Math.PI / 2) + Math.PI / 4)
            var audio = new Audio('./audio/Arkanoid SFX (1).wav');
            audio.play();
            return
            //si no esta tocando la barra
        } else if (ball.y >= fieldHeight - Ball.radius) {
            var audio = new Audio('./audio/Arkanoid SFX (3).wav');
            audio.play();
            finish(context, false)
            keepPlaying = false;
            return
        }
    }

    //si toca una de las paredes laterales
    if ((ball.x <= Ball.radius) || (ball.x >= fieldWidth - Ball.radius)) {
        ball.angle = Math.PI - ball.angle
        return
    }

    //si toca el techo
    if (ball.y <= 0 + Ball.radius) {
        ball.angle *= -1
    }

    //detectar colisiones de cada objetivo
    for (let objectivesRow of objectives) {
        for (let objective of objectivesRow) {
            if (!objective.isAlive) continue
            if (ball.x - Ball.radius <= objective.x + Objective.width && ball.x + Ball.radius >= objective.x
                && ball.y - Ball.radius <= objective.y + Objective.height && ball.y + Ball.radius >= objective.y
            ) {
                if (objective.layers <= 0) {
                    objective.isAlive = false

                } else {
                    objective.layers--;
                    objective.img.src = Objective.layersImages[objective.layers]

                }
                score++;


                if (score == winScore) {
                    var audio = new Audio('./audio/Arkanoid SFX (9).wav');
                    audio.play();
                    finish(context, true)
                    keepPlaying = false;

                    return
                }

                var audio = new Audio('./audio/Arkanoid SFX (2).wav');
                audio.play();
                document.getElementById('scoreHome').innerHTML = score
                ball.angle *= -1
                return

            }
        }
    }
}


const finish = (ctx, win) => {
    ctx.font = '100px Arial'
    ctx.textAlign = 'center'

    if (win) {
        ctx.fillStyle = 'yellow'
        ctx.fillText('You Win', fieldWidth / 2, fieldHeight / 2)
    } else {
        ctx.fillStyle = 'red'
        ctx.fillText('Game Over', fieldWidth / 2, fieldHeight / 2)
    }


}