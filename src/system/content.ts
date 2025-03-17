import { Sprite } from "./sprite";
import { Texture } from "./texture";

export class Content {

    private static spriteSheet_player: Texture;
    private static spriteSheet_lvl: Texture;

    //get sprite struct properties:
    public static sprites: { [id:string] : Sprite } = {};
    public static backgroundTextrue: Texture;


    public static async initialise(gl: WebGL2RenderingContext) {

        this.spriteSheet_player = await Texture.loadTexture(gl, "assets/char/spritesheet_players.png");
        this.spriteSheet_lvl = await Texture.loadTexture(gl, "assets/lvl/platformIndustrial_sheet.png");
        this.backgroundTextrue = await Texture.loadTexture(gl, "assets/industrial-background.jpg");//"assets/purple.png"

        await this.loadSpriteSheet();
    }

    private static async loadSpriteSheet() {

        const sheetXmlReq_player = await fetch("assets/spritesheet_players.xml");
        const sheetXmlReq_lvl = await fetch("assets/platformIndustrial_sheet.xml");


    }

}