import { Rect } from "./rect";
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

        const sheetXmlReq_player = await fetch("assets/char/spritesheet_players.xml");
        const sheetXmlText_player = await sheetXmlReq_player.text();

        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(sheetXmlText_player, "text/xml");

        xmlDoc.querySelectorAll("SubTexture").forEach((SubTexture) => {
            
            const name = SubTexture.getAttribute("name")!.replace(".png", "");
            const x = parseInt(SubTexture.getAttribute("x")!);
            const y = parseInt(SubTexture.getAttribute("y")!);
            const width = parseInt(SubTexture.getAttribute("width")!);
            const height = parseInt(SubTexture.getAttribute("height")!);

            const drawRect = new Rect(0, 0, width, height);
            const sourceRect = new Rect(x, y, width - 1, height - 1);//-1 fixing arterfacts

            this.sprites[name] = new Sprite(this.spriteSheet_player, drawRect, sourceRect);
        });



        const sheetXmlReq_lvl = await fetch("assets/lvl/platformIndustrial_sheet.xml");
        const sheetXmlText_lvl = await sheetXmlReq_lvl.text();

        const parser_lvl = new DOMParser();
        const xmlDoc_lvl = parser_lvl.parseFromString(sheetXmlText_lvl, "text/xml");

        xmlDoc_lvl.querySelectorAll("SubTexture").forEach((SubTexture) => {
            
            const name = SubTexture.getAttribute("name")!.replace(".png", "");
            const x = parseInt(SubTexture.getAttribute("x")!);
            const y = parseInt(SubTexture.getAttribute("y")!);
            const width = parseInt(SubTexture.getAttribute("width")!);
            const height = parseInt(SubTexture.getAttribute("height")!);

            const drawRect = new Rect(0, 0, width, height);
            const sourceRect = new Rect(x, y, width - 1, height - 1);//-1 fixing arterfacts

            this.sprites[name] = new Sprite(this.spriteSheet_lvl, drawRect, sourceRect);
        });
    }

}