import { BloomEffect } from "./bloom-effect";
import { BlurEffect } from "./blur-effect";
import { TextureEffect } from "./texture-effect";

export class EffectFactory {

    constructor(private gl: WebGL2RenderingContext,
        private width: number,
        private height: number) {
        }

        public createTextureEffect(): TextureEffect {
            return new TextureEffect(this.gl, this.width, this.height);
        }


        public createBlurEffect(): BlurEffect {
            return new BlurEffect(this.gl, this.width, this.height);
        }

        public createBloomEffect(): BloomEffect {
            return new BloomEffect(this.gl, this.width, this.height);
        }
}