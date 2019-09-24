/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * FIGHTER CLASS                                           *
 * This is the class for the two fighters in the game;     *
 * includes HP, and functions for crouch, punch and death. *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

//Creates empty texture for Fighter class
var empty = PIXI.Texture.from("images/empty.png"); 

class Fighter
{
	constructor(main_texture, _hp)
	{
		this.hp = _hp
		this.sprite = new PIXI.Sprite(main_texture);
		this.output = 0;
	}
	crouch(image)
	{
		this.sprite.texture = image;
		this.output = 1;
	}
	punch(image, other)
	{
		this.sprite.texture = image;
		if (other.get_state() != 1 && other.get_hp() != 0)
		{
			other.set_hp(other.get_hp() - 1);
		}
		else if (other.get_hp() == 0)
		{
			other.set_hp(0);
		}
		this.output = 2;
	}
	return_idle(image)
	{
		this.sprite.texture = image;
		this.output = 0;
	}
	get_state()
	{
		return this.output;
	}
	get_hp()
	{
		return this.hp;
	}
	set_hp(_hp)
	{
		this.hp = _hp;
	}
	check_death()
	{
		if (this.hp <= 0)
		{
			console.log('ded');
		}
	}
}


/* * * * * * * * * * * * * * * * * * * * * * * * * *
 * MAIN CODE                                       *
 * Here I initialize the main function, including  *
 * setting up the gameport placing the objects     *
 * on the screen and creating sprite behavior.     *
 * * * * * * * * * * * * * * * * * * * * * * * * * */

//Initialization
var gameport = document.getElementById("gameport");

var renderer = PIXI.autoDetectRenderer({width: 796, height: 400, backgroundColor: 0x0000ff});
gameport.appendChild(renderer.view);

var stage = new PIXI.Container();

//Background
var texture_back = PIXI.Texture.from("images/pixel-ring.png")
var background = new PIXI.Sprite(texture_back);
background.anchor.x = 0.5;
background.anchor.y = 0.5;
background.position.x = 399;
background.position.y = 200;
stage.addChild(background);



//Textures, player & enemy
var player_idle = PIXI.Texture.from("images/player_idle.png");
var player_punch = PIXI.Texture.from("images/player_punch.png");
var player_crouch = PIXI.Texture.from("images/player_crouch.png");
var enemy_idle = PIXI.Texture.from("images/enemy_idle.png");
var enemy_punch = PIXI.Texture.from("images/enemy_punch.png");
var enemy_crouch = PIXI.Texture.from("images/enemy_crouch.png");

//Textures, everything else
var big_hit = PIXI.Texture.from("images/anticipate_big_hit.png");
var small_hit = PIXI.Texture.from("images/anticipate_small_hit.png");
var ouch = PIXI.Texture.from("images/ouch.png");

//Main sprite setup
//var sprite_p = new PIXI.Sprite(player_idle);
var player = new Fighter(player_idle, 3);
player.sprite.anchor.x = 0.5;
player.sprite.anchor.y = 0.5;
player.sprite.position.x = 345;
player.sprite.position.y = 246;
stage.addChild(player.sprite);

//Enemy sprite setup
//var sprite_e = new PIXI.Sprite(enemy_idle);
var enemy = new Fighter(enemy_idle, 14);
enemy.sprite.anchor.x = 0.5;
enemy.sprite.anchor.y = 0.5;
enemy.sprite.position.x = 455;
enemy.sprite.position.y = 250;
stage.addChild(enemy.sprite);

//anticipate sprite setup
var anticipate = new PIXI.Sprite(empty);
anticipate.anchor.x = 0.5;
anticipate.anchor.y = 0.5;
anticipate.position.x = 430;
anticipate.position.y = 210;
stage.addChild(anticipate);

//player hit marker setup
var hit_marker = new PIXI.Sprite(empty);
hit_marker.anchor.x = 0.5;
hit_marker.anchor.y = 0.5;
hit_marker.position.x = 425;
hit_marker.position.y = 215;
stage.addChild(hit_marker);

//Text
let player_health = new PIXI.Text(player.get_hp(),{fontFamily : 'Arial', fontSize: 28, fill : 0xfc053a, align : 'center'});
player_health.x = 345;
player_health.y = 125;
stage.addChild(player_health);
let enemy_health = new PIXI.Text(enemy.get_hp(),{fontFamily : 'Arial', fontSize: 28, fill : 0xfc053a, align : 'center'});
enemy_health.x = 435;
enemy_health.y = 125;
stage.addChild(enemy_health);

//Animate dat shiz
function animate()
{
        requestAnimationFrame(animate);
	player.sprite.scale.x = 3;
	player.sprite.scale.y = 3;

	//Movement of player and enemy
	if (player.sprite.texture == player_punch)
	{
		player.sprite.position.x = 360;
	}
	//Player death
	else if (player.get_hp() == 0)
	{
		player.sprite.position.x -= 10;
		player.sprite.rotation -= 0.1;
		player_health.text = player.get_hp();
	}
	else
	{
		player.sprite.position.x = 345;
	}
	if (player.sprite.texture == player_crouch)
	{
		player.sprite.position.y = 265;
	}
	//Player death 2
	else if (player.get_hp() == 0)
	{
		player.sprite.position.y -= 10;
	}
	else
	{
		player.sprite.position.y = 246;
	}
	if (enemy.get_state() == 2)
	{
		enemy.sprite.position.x = 420;
	}
	else if (enemy.get_hp() == 0)
	{
		enemy.sprite.position.x += 10;
		enemy.sprite.position.y -= 10;
		enemy.sprite.rotation += 0.1;
		enemy_health.text = 'Winner!';
	}
	else
	{
		enemy.sprite.position.x = 455;
	}
	enemy.sprite.scale.x = 3;
	enemy.sprite.scale.y = 3;
	anticipate.scale.x = 3;
	anticipate.scale.y = 3;
	hit_marker.scale.x = 3;
	hit_marker.scale.y = 3;
        renderer.render(stage);
	PIXI.timerManager.update();
}
animate();

//Set up timers for later
timer = PIXI.timerManager.createTimer(1500);
timer01 = PIXI.timerManager.createTimer(100);
wait_timer1 = PIXI.timerManager.createTimer(1000);
game_timer01 = PIXI.timerManager.createTimer(4000);
punch_timer = PIXI.timerManager.createTimer(200);
crouch_timer = PIXI.timerManager.createTimer(400);
crouch_cd = PIXI.timerManager.createTimer(800);

//Music timer
music_shift = PIXI.timerManager.createTimer(500);
music_shift.on('start', function(elapsed) {
		console.log('music timer!')
	});
music_shift.on('end', function(elapsed) {
		console.log('next song!');
		theme_2.play();
	});
//Game music
const theme_1 = PIXI.sound.Sound.from('audio/Preta_batalu_1.wav');
const theme_2 = PIXI.sound.Sound.from('audio/Preta_batalu_2.wav');
theme_1.loop = true;
theme_2.loop = true;
theme_1.play();


//Boolean for key repetition
var keyStayedPressed = true;

//Mapping to keys
function keydownEventHandler(e)
{
	if (!keyStayedPressed) return;
	keyStayedPressed = false;

	//Punch timer
	punch_timer.on('start', function(elapsed) {
		console.log('punch cd')
	});
	punch_timer.on('end', function(elapsed) {
		console.log('end punch cd', elapsed);
		player.return_idle(player_idle);
		if (hit_marker.texture == ouch)
		{
			hit_marker.texture = empty;
		}
		punch_timer.reset();
	});

	//Crouch down timer
	crouch_timer.on('start', function(elapsed) {
		console.log('crouch timer')
	});
	crouch_timer.on('end', function(elapsed) {
		console.log('end crouch timer', elapsed);
		player.return_idle(player_idle);
		crouch_cd.start();
	});

	//Crouch cd timer
	crouch_cd.on('start', function(elapsed) {
		console.log('crouch cd')
	});
	crouch_cd.on('end', function(elapsed) {
		console.log('end crouch cd', elapsed);
		crouch_timer.reset();
	});

	const e_temp = enemy.get_hp();

	if (e.keyCode == 83 && !punch_timer.isStarted) // S key
	{
		player.punch(player_punch, enemy);
		//If player punches before punch window
		if (game_timer01.isStarted && !game_timer01.isEnded)
		{
			game_timer01.stop();
			wait_timer1.reset();
			wait_timer1.start();
			enemy.crouch(enemy_crouch);
			enemy.set_hp(e_temp);
			punch_timer.start();
		}
		else if (enemy.get_hp() != 0)
		{
			console.log(enemy.get_hp());
			punch_timer.start();
			hit_marker.texture = ouch;
			enemy_health.text = enemy.get_hp();
			if (enemy.get_hp() <= 7)
			{
				theme_1.stop();
				music_shift.start();
			}
		}
		else
		{
			punch_timer.start();
		}
		enemy.check_death();
	}
	else if (e.keyCode == 16 && !crouch_timer.isStarted) // Shift
	{
		player.crouch(player_crouch);
		crouch_cd.reset();
		crouch_timer.start();
	}
}

//If any of the keys go up, reset player sprite
function keyupEventHandler(e)
{
	keyStayedPressed = true;
}

//Add listeners
document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);


/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * ENEMY BEHAVIOR                                                  *
 * The next set of functions controls the behavior for the enemy,  *
 * Including the phases of the fight and enemy actions.            *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

function enemys_punch(enemy, player)
{
	timer = PIXI.timerManager.createTimer(1000);
	timer01 = PIXI.timerManager.createTimer(100);

	timer.on('start', function(elapsed){console.log('start')});
	timer.on('end', function(elapsed) {
		console.log('end punch', elapsed, player.get_hp());
		enemy.return_idle(enemy_idle);
		if (game_timer01.isEnded && enemy.get_hp() > 0)
		{
			phase_1(player,enemy);
		}
		else if (game_timer01.isEnded && enemy.get_hp() <= 0)
		{
			check_death();
		}
		else
		{
			console.log('uh oh.');
		}
	});

	timer01.repeat = 5;
	timer01.on('start', function(elapsed){console.log('start')});
	timer01.on('end', function(elapsed) {
		timer.start();
		enemy.punch(enemy_punch, player);
		player.check_death();
		player_health.text = player.get_hp();
	});
	timer01.on('repeat', function(elapsed, repeat) {
		if (repeat == 1 || repeat == 3)
		{
			console.log('repeat', repeat);
			anticipate.texture = big_hit;
		}
		else
		{
			anticipate.texture = empty;
		}
	});
	timer01.start();
}

function phase_1(player, enemy)
{
	game_timer01 = PIXI.timerManager.createTimer(3000);
	wait_timer1 = PIXI.timerManager.createTimer(1000);

	wait_timer1.on('start', function(elapsed){console.log('hol up')});
	wait_timer1.on('end', function(elapsed) {
		console.log('end wait', elapsed);
		enemy.return_idle(enemy_idle);
		game_timer01.start();
	});

	game_timer01.on('start', function(elapsed) {
		console.log('start timer')
	});
	game_timer01.on('end', function(elapsed) {
		console.log('end game timer', elapsed);
		enemys_punch(enemy, player);
	});

	game_timer01.start();
}
phase_1(player, enemy);
