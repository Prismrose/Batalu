/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * FIGHTER CLASS                                           *
 * This is the class for the two fighters in the game;     *
 * includes HP, and functions for crouch, punch and death. *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

var empty = PIXI.Texture.fromImage("images/empty.png");

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
			this.sprite.texture = empty;
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
var texture_back = PIXI.Texture.fromImage("images/pixel-ring.png")
var background = new PIXI.Sprite(texture_back);
background.anchor.x = 0.5;
background.anchor.y = 0.5;
background.position.x = 399;
background.position.y = 200;
stage.addChild(background);

//Textures
var player_idle = PIXI.Texture.fromImage("images/player_idle.png");
var player_punch = PIXI.Texture.fromImage("images/player_punch.png");
var player_crouch = PIXI.Texture.fromImage("images/player_crouch.png");
var enemy_idle = PIXI.Texture.fromImage("images/enemy_idle.png");
var enemy_punch = PIXI.Texture.fromImage("images/enemy_punch.png");
var enemy_crouch = PIXI.Texture.fromImage("images/player_crouch.png");


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
var enemy = new Fighter(enemy_idle, 6);
enemy.sprite.anchor.x = 0.5;
enemy.sprite.anchor.y = 0.5;
enemy.sprite.position.x = 455;
enemy.sprite.position.y = 250;
stage.addChild(enemy.sprite);

//Mapping to keys
function keydownEventHandler(e)
{
	if (e.keyCode == 83) // S key
	{
		//sprite.texture = player_punch;
		player.punch(player_punch, enemy);
		enemy.check_death();
	}
	else if (e.keyCode == 16) // Shift
	{
		//sprite.texture = player_crouch;
		player.crouch(player_crouch);
	}
}

//If any of the keys go up, reset player sprite
function keyupEventHandler(e)
{
	player.sprite.texture = player_idle;
}

//Add listeners
document.addEventListener('keydown', keydownEventHandler);
document.addEventListener('keyup', keyupEventHandler);

//Animate dat shiz
function animate()
{
        requestAnimationFrame(animate);
	player.sprite.scale.x = 3;
	player.sprite.scale.y = 3;
	if (player.sprite.texture == player_punch)
	{
		player.sprite.position.x = 360;
	}
	else
	{
		player.sprite.position.x = 345;
	}
	if (player.sprite.texture == player_crouch)
	{
		player.sprite.position.y = 265;
	}
	else
	{
		player.sprite.position.y = 246;
	}
	enemy.sprite.scale.x = 3;
	enemy.sprite.scale.y = 3;
        renderer.render(stage);
}
animate();

/* 
 * ENEMY BEHAVIOR
 * The next set of functions controls the behavior for the enemy,
 * Including the phases of the fight.
 */
