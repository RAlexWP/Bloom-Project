import { vec2 } from "gl-matrix";
import { Content } from "./system/content";
import { Rect } from "./system/rect";
import { SpriteRenderer } from "./system/sprite-renderer";
import { Texture } from "./system/texture";


export class HazardBox {

    public position = vec2.create();
    public drawRect: Rect;
    private sourceRect: Rect;
    private texture: Texture;

    


    constructor(private width: number, private height: number) {

        const lvlSprite = Content.sprites["platformIndustrial_104"];
        this.texture = lvlSprite.texture;
        this.drawRect = lvlSprite.drawRect.copy();
        this.sourceRect = lvlSprite.sourceRect.copy();

        this.drawRect.x = 555;
        this.drawRect.y = 486;

    }

    public update(dt: number) {
    }

    public draw(spriteRenderer: SpriteRenderer) {
        spriteRenderer.drawSpriteSource(this.texture, this.drawRect, this.sourceRect);
    }
}