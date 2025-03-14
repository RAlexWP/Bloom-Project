/* manage */

import { vec2 } from "gl-matrix";

export class Engine {

    //prereq stuff for webGL and Canvas management
    private canvas!: HTMLCanvasElement;
    private gl!: WebGL2RenderingContext; //using webGL 2 rendering context

    //timer var
    private lastTime = 0;

    //engine's essential functions
    public clientBounds = vec2.create(); //Boarder stuff
    public onUpdate = (dt: number) => {};
    public onDraw = () => {};

    constructor() {

    }

    /*allow the init to be a async function so I can use await and
    make sure specific calls are met before continuing the function.
    e.g. accessing inti data of the content etc...*/
    public async initialise() {

        this.canvas = document.getElementById('canvas') as HTMLCanvasElement;
        this.gl = this.canvas.getContext('webgl2', {alpha: false, })!;
        this.gl.pixelStorei(this.gl.UNPACK_FLIP_Y_WEBGL, true);

        this.clientBounds[0] = this.canvas.width;
        this.clientBounds[1] = this.canvas.height;

        //enter content and sprite stuff here....
  
    }

    public draw(): void {

        //delta timer
        const now = performance.now();
        const dt = now - this.lastTime;

        //access delta timer within the onUpdate function
        this.onUpdate(dt);

        this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        this.gl.clearColor(0.8, 0.8, 0.8, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT);

        this.onDraw();

        //start game loop
        window.requestAnimationFrame(() => this.draw());
    }
}