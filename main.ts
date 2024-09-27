namespace SpriteKind {
    export const invisible = SpriteKind.create()
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    laserSprite = sprites.createProjectileFromSprite(assets.image`laserSprite`, playerSprite, 0, -50)
    music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
})
sprites.onOverlap(SpriteKind.Enemy, SpriteKind.Projectile, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    sprites.destroy(sprite, effects.disintegrate, 500)
    info.changeScoreBy(1)
})
info.onLifeZero(function () {
    sprites.destroy(playerSprite, effects.disintegrate, 500)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    game.gameOver(true)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    playerSprite.sayText("" + info.life() + " Lives Left", 1000, false)
    music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
})
let asteroidSprite: Sprite = null
let laserSprite: Sprite = null
let playerSprite: Sprite = null
effects.starField.startScreenEffect()
playerSprite = sprites.create(assets.image`playerSprite`, SpriteKind.Player)
playerSprite.setPosition(80, 90)
playerSprite.setStayInScreen(true)
info.setLife(3)
info.setScore(0)
controller.moveSprite(playerSprite, 100, 100)
game.onUpdateInterval(1000, function () {
    asteroidSprite = sprites.createProjectileFromSide(assets.image`asteroidSprite`, 0, 50)
    asteroidSprite.x = randint(0, scene.screenWidth())
    asteroidSprite.setKind(SpriteKind.Enemy)
})
