//assets https://opengameart.org/content/basic-arkanoid-pack
//sounds https://www.sounds-resource.com/nes/arkanoid/sound/3698/
//https://www.flaticon.com/free-icon/arkanoid_2285752
const fieldHeight = 400
const fieldWidth = 700
const objectiveRows = 1
const objectivePerRow = 1

class Game {

    constructor() {
        this.winScore = 1
        this.keepPlaying = true
        this.score = 0
        this.damage = 1
    }

    requestAnimationFrame = window.requestAnimationFrame
    //El método window.requestAnimationFrame informa al navegador que quieres realizar una animación y solicita que el navegador programe el repintado de la ventana para el próximo ciclo de animación. El método acepta como argumento una función a la que llamar antes de efectuar el repintado.
    //window.webkitRequestAnimationFrame(callback[, element]);

    render = (context, platform, objectives, ball) => {

        ball.y += (Ball.speed * Math.sin(ball.angle))
        ball.x += (Ball.speed * Math.cos(ball.angle))

        context.clearRect(0, 0, fieldWidth, fieldHeight)
        this.drawObjectives(objectives, context)
        platform.draw(context)
        ball.draw(context)
        this.core(platform, objectives, ball, context)

        if (this.keepPlaying) {
            requestAnimationFrame(() => this.render(context, platform, objectives, ball))
        }

    }

    core = (platform, objectives, ball, context) => {

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
                this.finish(context, false)
                this.keepPlaying = false;
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

                    console.log("---------------")
                    if (objective.layers <= 0) {
                        if (objective.upgrade >= 0) {
                            switch (objective.upgrade) {
                                case 0:
                                    Platform.width -= 30
                                    break;
                                case 1:
                                    Platform.width += 30
                                    break;
                                case 2:
                                    Ball.speed = Ball.speed + 2;
                                    break;
                                default:
                                    break;
                            }
                        }
                        objective.isAlive = false

                    }
                    ball.notifyObservers()
                    objective.layers = objective.layers - this.damage;

                    if (objective.layers >= 0) {
                        objective.img.src = Objective.layersImages[objective.layers]
                    }

                    ball.angle *= -1

                    if (this.score == this.winScore) {
                        var audio = new Audio('./audio/Arkanoid SFX (9).wav');
                        audio.play();
                        this.finish(context, true)
                        this.keepPlaying = false;
                    }

                    return

                }
            }
        }
    }

    finish = (ctx, win) => {
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

    drawObjectives = (objectives, context) => {
        for (let i = 0; i < objectiveRows; i++) {
            for (let j = 0; j < objectivePerRow; j++) {
                objectives[i][j].draw(context)
            }
        }
    }

    createObjectives = () => {
        const objectives = [objectiveRows]
        for (let i = 0; i < objectiveRows; i++) {
            objectives[i] = [objectivePerRow]
            let upgrade = Math.floor(Math.random() * 10);
            for (let x = 0; x < objectivePerRow; x++) {
                let a = (2 * x) + x * Objective.width
                let b = (2 * i) + i * Objective.height
                if (x == upgrade) {
                    objectives[i][x] = new Objective(a, b, 0, Math.floor(Math.random() * 3))
                } else {
                    objectives[i][x] = new Objective(a, b, i, -1)
                }

            }
        }
        return objectives
    }
}

// Notify method that Subject calls on notifyObservers
Game.prototype.notify = function (x, y) {
    console.log("Observer.notify: ball colision with objective detected at position x:" + x + " and y:" + y);
    this.score = this.score + this.damage;
    var audio = new Audio('./audio/Arkanoid SFX (2).wav');
    audio.play();
    document.getElementById('scoreHome').innerHTML = this.score;
}


window.onload = () => {
    const game = new Game()
    const canvas = document.getElementById('game')
    const context = canvas.getContext('2d')
    const platform = new Platform()
    const ball = new Ball()
    ball.registerObserver(game)
    const objectives = game.createObjectives()


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
    game.render(context, platform, objectives, ball)
}
