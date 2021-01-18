namespace sprites {
    /**
     * Sets get the sprite's tile X position. Assuming 16x16 tile
     */
    export function getTileX(sprite: Sprite) : number {
        if (!sprite) return 0;
        return sprite.x / 16;
    }

    /**
     * Sets get the sprite's tile Y position. Assuming 16x16 tile
     */
    export function getTileY(sprite: Sprite) : number {
        if (!sprite) return 0;
        return sprite.y / 16;
    }
}

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {

    let speed = 50
    let arrow = img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . e e . . . .
        . . . . . . . . . . 1 1 e . . .
        . . . . . . . . . . 1 1 1 e . .
        1 1 1 . . . . . . . 1 1 1 1 e .
        . . . e . . . . . . 1 1 1 1 1 e
        1 1 1 1 e e e e e e 1 1 1 1 1 e
        . . . e . . . . . . 1 1 1 1 1 e
        1 1 1 . . . . . . . 1 1 1 1 1 e
        . . . . . . . . . . 1 1 1 1 e .
        . . . . . . . . . . 1 1 1 e . .
        . . . . . . . . . . 1 1 e . . .
        . . . . . . . . . . e e . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `

    let arrowClone = arrow.clone()
    arrowClone.flipX()

    let projImg = arrow
    if(oldLady.image == oldLadyImgClone){
       speed = -50
       projImg= arrowClone
    } else {
       speed = 50
    }

    let projectile = sprites.createProjectileFromSprite(projImg, oldLady, speed, 0)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    let oldLadyTileX = sprites.getTileX(oldLady);
    if(oldLady.image == oldLadyImgClone){
        oldLadyTileX--
    } else {
        oldLadyTileX++
    }

    let l = tiles.getTileLocation(oldLadyTileX, sprites.getTileY(oldLady))
    tiles.setTileAt(l, myTiles.tile2)
    tiles.setWallAt(l, true)
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function() {
    oldLady.setImage(oldLadyImgClone)
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function() {
    oldLady.setImage(oldLadyImg)
})

let oldLadyImg = img`
    .....cccccccccccccccc.....
    ...cc11111111c1111111c....
    ...cc1111111111111111c....
    ..c111111111111111111c....
    .cc1111111111d1111111c....
    c1111111ddddddddddd11c....
    c111111dddddddddddddef....
    c111111dddd1dddddd5deff...
    c111111dddd1dddddd5defff..
    c11111dddddd11dd55ddeffff.
    c11111dddddd11dd55ddeffff.
    ccc1111ddddddddbddddeffff.
    ..c1111dddddddddddddeffff.
    ..c1111dddddddddddddeffff.
    ...cc1dddddddd2dddddeffff.
    .....bddddddddddddde.ffff.
    ...2244444444ddd4442.ffff.
    ..22244ee44444444444ee111.
    ..2224bbdee444244444bd111.
    ..2224bbdee444444444bd111.
    ..2224bbdee444444444bd111.
    ..22244ee44444244444ee111.
    ..2224444444444444442ffff.
    ..2224444444444444442ffff.
    ..4444444444444444444ffff.
    ..4444444444444444444ffff.
    ...444bbb44444bbbb44.ffff.
    .....ebbdee..ebbdde..fff..
    .....222b22..222bb2..ff...
    .....2.2222..2.2222..f....
`
let oldLadyImgClone = oldLadyImg.clone()
oldLadyImgClone.flipX()
let oldLady = sprites.create(oldLadyImg, SpriteKind.Player)
controller.moveSprite(oldLady)
scene.cameraFollowSprite(oldLady)