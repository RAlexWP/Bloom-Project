
export class Texture {

    constructor(public texture: WebGLTexture,
        public width: number, public height: number) {

    }

    public static async loadTexture(gl: WebGL2RenderingContext, uri: string): Promise<Texture> {

        //promise: something that gets resolved at a later point
        const promise = new Promise<Texture>((resolve, reject) => {

            const image = new Image();
            image.src = uri;
            image.onload = () => {

                const texture = gl.createTexture()!;
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D,
                    0,
                    gl.RGBA,
                    gl.RGBA,
                    gl.UNSIGNED_BYTE,
                    image);
                gl.generateMipmap(gl.TEXTURE_2D);

                //linear inturperate pixel colour
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

                resolve(new Texture(texture, image.width, image.height));
            }

            //if error happens, do this:
            image.onerror = () => {
                const msg = 'The image didnt load ${uri}';
                console.error(msg);
                alert(msg);
                reject();
            }
        });

        return promise;
    }
}