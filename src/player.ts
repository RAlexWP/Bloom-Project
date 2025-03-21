import { vec2 } from "gl-matrix";
import { Content } from "./system/content";
import { Rect } from "./system/rect";
import { SpriteRenderer } from "./system/sprite-renderer";
import { Texture } from "./system/texture";
import { InputManager } from "./system/input-manager";

const SPEED = 0.25;

export class Player {

    public movementDirection = vec2.create();
    public drawRect: Rect;
    private sourceRect: Rect;
    private texture: Texture;

    


    constructor(private inputManager: InputManager, 
        private width: number, private height: number) {

        const playerSprite = Content.sprites["alienGreen_stand"];
        this.texture = playerSprite.texture;
        this.drawRect = playerSprite.drawRect.copy();
        this.sourceRect = playerSprite.sourceRect.copy();


        //spawn position
        this.drawRect.y = 299.8440806865692; 
    }

    public update(dt: number) {

        //console.log("drawRect.x =" + this.drawRect.x);
        //console.log("drawRect.y =" + this.drawRect.y);

        this.movementDirection[0] = 0;
        this.movementDirection[1] = 0;

        if (this.inputManager.isKeyDown("ArrowUp")) {
            this.movementDirection[1] = -1;
        }

        if (this.inputManager.isKeyDown("ArrowDown")) {
            this.movementDirection[1] = 1;
        }

        if (this.inputManager.isKeyDown("ArrowLeft")) {
            this.movementDirection[0] = -1;
        }

        if (this.inputManager.isKeyDown("ArrowRight")) {
            this.movementDirection[0] = 1;
        }

        //normalise vector so it doesn't square root and make it longer
        vec2.normalize(this.movementDirection, this.movementDirection);

        //cant do: this.movementDirection *= SPEED;
        //instead we do this below:
        vec2.scale(this.movementDirection, this.movementDirection, SPEED * dt);

        this.drawRect.x += this.movementDirection[0];
        this.drawRect.y += this.movementDirection[1];

        //keep player in game bounds
        //Left and Right
        if(this.drawRect.x < 0) {

            this.drawRect.x = 0;
        }
        else if(this.drawRect.x > this.width - this.drawRect.width) {

            this.drawRect.x = this.width - this.drawRect.width;
        }

        //Up and Down
        if(this.drawRect.y < 0) {

            this.drawRect.y = 0;
        }
        else if(this.drawRect.y > this.height - this.drawRect.height) {

            this.drawRect.y = this.height - this.drawRect.height;
        }
    }

    public draw(spriteRenderer: SpriteRenderer) {
        spriteRenderer.drawSpriteSource(this.texture, this.drawRect, this.sourceRect);
    }
}