const CONSTANTS = {
    ballsParams: [        
        [new Vector2(324.5,296.5), COLOUR.BLACK], //b1
        [new Vector2(283.5,281.5), COLOUR.BLACK], //b2
        [new Vector2(292.5,324.5), COLOUR.BLACK], //b3
        [new Vector2(308.5,344.5), COLOUR.BLACK], //b4
        [new Vector2(267.5,329.5), COLOUR.BLACK], //b5
        [new Vector2(258.5,285.5), COLOUR.BLACK], //b6
        [new Vector2(291.5,255.5), COLOUR.BLACK], //b7
        [new Vector2(333.5,271.5), COLOUR.BLACK], //b8
        [new Vector2(341.5,315.5), COLOUR.BLACK], //b9
        [new Vector2(307.5,276.5), COLOUR.YELLOW], //w1
        [new Vector2(276.5,305.5), COLOUR.YELLOW], //w2
        [new Vector2(316.5,319.5), COLOUR.YELLOW], //w3
        [new Vector2(284.5,348.5), COLOUR.YELLOW], //w4
        [new Vector2(252.5,308.5), COLOUR.YELLOW], //w5
        [new Vector2(267.5,262.5), COLOUR.YELLOW], //w6
        [new Vector2(316.5,253.5), COLOUR.YELLOW], //w7
        [new Vector2(348.5,292.5), COLOUR.YELLOW], //w8
        [new Vector2(333.5,338.5), COLOUR.YELLOW], //w9

        [new Vector2(300,300), COLOUR.RED], //queen
        [new Vector2(294.5,512.5), COLOUR.BLUE] //striker
    ],

    // balls
    ballOrigin: new Vector2(12.5,12.5),
    ballDiameter: 25,
    ballRadius: 12.5,

    // hand
    handOrigin: new Vector2(13.5, 70),

    handShotOrigin: new Vector2(13.5, 55), //draws stick closer to the ball
    maxPower: 2500,

    // game
    delta: 1/90,
    friction: 0.98,
    leftBoundaryCircle: 108.5,
    rightBoundaryCircle: 487.5,

    // table
    pocketRadius: 22.5,
    pockets: [
        new Vector2(42.5,42.5),
        new Vector2(557.5,42.5),
        new Vector2(42.5,557.5),
        new Vector2(557.5,557.5)
    ]
}