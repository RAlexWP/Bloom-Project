import { Content } from "./system/content";
import { Rect } from "./system/rect";
import { SpriteRenderer } from "./system/sprite-renderer";

export class Background {
    private drawRect: Rect;
    //private drawRect2: Rect;

    constructor(private width: number, private height: number) {
        this.drawRect = new Rect(0, 0, width, height);
        //this.drawRect2 = new Rect(0, 0, width, height);
    }

    public update(dt: number) {
    }

    public draw(spriteRenderer: SpriteRenderer){
        spriteRenderer.drawSprite(Content.backgroundTextrue, this.drawRect);
        //spriteRenderer.drawSprite(Content.backgroundTextrue, this.drawRect2);
    }
}