import kaboom from "kaboom";


// initialize context
kaboom({
  background: [120, 134, 107],
});

// load assets
loadSprite("franco", "sprites/franco.png")
loadSprite("pattume", "sprites/pattume.png")
loadSprite("terra", "sprites/base.png")
loadSprite("piattaforma", "sprites/piatta.png")
loadSprite("maria", "sprites/maria.png")
loadSprite("palazzo", "sprites/palazzo.png")
loadSprite("palazzetto", "sprites/palazzetto.png");

setGravity(1500);
const JUMP_FORCE = 1250
const MOVE = 450
const FALL_DEATH = 2400
const LEVELS = [
  [
    "                                                     ",
    "                                                     ",
    "                                                     ",
    "                   M                                 ",
    "                                                     ",
    "                 PPPPP                               ",
    "                                                     ",
    "                             M                       ",
    "                                                     ",
    "                             P                       ",
    "                                                     ",
    "                                                M    ",
    "                                                     ",
    "                                      P        PPP   ",
    "                                                     ",
    "                                                     ",
    "                                                     ",
    "C             C             C           C   P        ",
    "                                                     ",
    "                                                     ",
    "                                                     ",
    "                                                P    ",
    "                                                     ",
    "                                    M                ",
    "       D            D            D                   ",
    "                         PPP        P        PPP     ",
    "                                                     ",
    "                                                     ",
    "               PPPPPP                                ",
    "                                                     ",
    "       M                                             ",
    "                                                     ",
    "=====================================================",
  ],
  [
    "                                                     ",
    "                                                     ",
    "                                                     ",
    "                   M                                 ",
    "                                                     ",
    "                 PPPPP                               ",
    "                                                     ",
    "                             M                       ",
    "                                                     ",
    "                             P                       ",
    "                                                     ",
    "                                                M    ",
    "                                                     ",
    "                                      P        PPP   ",
    "                                                     ",
    "                                                     ",
    "                                                     ",
    "                            C           C   P        ",
    "                                                     ",
    "                                                     ",
    "                                                     ",
    "                                                P    ",
    "                                                     ",
    "                                    M                ",
    "       D            D            D                   ",
    "                         PPP        P        PPP     ",
    "                                                     ",
    "                                                     ",
    "               PPPPPP                                ",
    "                                                     ",
    "       M                                             ",
    "                                                     ",
    "=====================================================",
  ],
];
const levelConf = {
  tileWidth: 64,
  tileHeight: 64,
 tiles: {
  "=": () => [
    sprite("terra"),
    area(),
    body({ isStatic: true }),
    //solid(),
  //  origin("center"),
    scale(.5),
    "cemento",
  ],
  "P": () => [
    sprite("piattaforma"),
    area(),
    //solid(),
    body(),
  body({ isStatic: true }),
  //  origin("center"),
    scale(.2,.2),
    "acciaio",
  ],
  "M": () => [
    sprite("maria"),
    area(),
  body({ isStatic: true }),
   // origin("center"),
    scale(.3),
    "maria",
  ],
  "C": () => [
    sprite("palazzo"),
    area(),
    scale(1.5),
    //if you want to modify the opacity or scale do use units from .1 to 1
    opacity(.5),
  ],
  "D": () => [
    sprite("palazzetto"),
    area(),
    scale(1.5),
    opacity(.4),
  ],
 }
};


scene("primolivello", ({ levelId} = { levelId: 0}) => {


  // score
const sballo = add([
		text("0", 44),
		pos(24, 24),
  fixed(),
		{ value: 0 },
	]);
  const level = addLevel(LEVELS[levelId ?? 0], levelConf);
  const giocatore = add([
    sprite("franco"),
    pos(0, 0),
    scale(1 / 4),
    area(),
    body(),
    health(3),
  ],
 );

  
   		// center camera to giocatore
  giocatore.onUpdate(() => {
		camPos(giocatore.pos)
		// check fall death
		if (giocatore.pos.y >= FALL_DEATH) {
			go("lose")
		}
	})

  


  //MOVEMENT
onKeyDown("right", () => {
    giocatore.flipX = false;
 giocatore.move(MOVE, 0);
});
  onKeyDown("left", () => {
      giocatore.flipX = true
    giocatore.move(-MOVE, 0);
  })

  function jump() {
		if (giocatore.isGrounded()) {
			giocatore.jump(JUMP_FORCE);
		}
	}

onKeyPress("space", jump)
  giocatore.onCollide("pattume", () => {
		go("lose")
	})


	giocatore.onCollide("maria", (m) => {
    destroy(m)

    sballo.value += 1
		sballo.text = sballo.value

    //condicion para cambiar nivel
    if (levelId + 1 < LEVELS.length && sballo.value == 5) {
      
			go("primolivello", {
				levelId: levelId + 1,
			})
      return console.log(sballo);
		} else {
      //go win
    }
    });


})

scene("lose", () => {
	add([
		text("You Lose"),
	])
	onKeyPress(() => go("primolivello"))
})

scene("win", () => {
	add([
		text("You Win"),
	])
	onKeyPress(() => go("primolivello"))
})


go("primolivello");





