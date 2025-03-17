import { TextureEffect } from "./texture-effect";

export class EffectFactory {

    constructor(private gl: WebGL2RenderingContext,
        private width: number,
        private height: number) {
        }

        public createTextureEffect(): TextureEffect {
            return new TextureEffect(this.gl, this.width, this.height);
        }
}