class Fighter
{
	constructor(main_texture, _hp)
	{
		this.hp = _hp
		this.sprite = new PIXI.Sprite(main_texture);
	}
	crouch(image)
	{
		sprite.texture = image;
	}
	punch(image)
	{
		sprite.texture = image;
		//if (!other.crouch())
		//{
		//	other.hp -= 1;
		//}
	}
	death()
	{
		if (hp == 0)
		{
			sprite.texture = null;
		}
	}
}
export {Fighter};
