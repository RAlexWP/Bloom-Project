import { BufferUtil } from "./buffer-util";
import { FramebufferUtil } from "./framebuffer-util";
import { ProgramUtil } from "./program-util";
import { Texture } from "./texture";

import vertexShaderSource from ".././shaders/postProcessVShader.glsl?raw";
import fragmentShaderSource from ".././shaders/postProcessTextureShader.glsl?raw";


export class TextureEffect {
    private glProgram: WebGLProgram;

    private glFramebuffer: WebGLFramebuffer;
    private glTexture: WebGLTexture;

    private vao: WebGLVertexArrayObject;
    private buffer: WebGLBuffer;

    //this is texture that will be mixed with scene textrue
    private mixValue = 0.25;

    private textureUnit0Location: WebGLUniformLocation;
    private textureUnit1Location: WebGLUniformLocation;
    private mixValueLocation: WebGLUniformLocation;

    constructor(private gl: WebGL2RenderingContext,
        private width: number,
        private height: number) {

            const vShader = ProgramUtil.createShader(gl, gl.VERTEX_SHADER,
                vertexShaderSource);

            const fShader = ProgramUtil.createShader(gl, gl.FRAGMENT_SHADER, 
                fragmentShaderSource);

            this.glProgram = ProgramUtil.createProgram(gl, vShader, fShader);

            const result = FramebufferUtil.createFramebuffer(gl, width, height);
            this.glFramebuffer = result.glFramebuffer!;
            this.glTexture = result.glTexture!;

            this.vao = gl.createVertexArray()!;
            gl.bindVertexArray(this.vao);

            this.buffer = BufferUtil.createArrayBuffer(gl, 
                new Float32Array([

                    //position texcoord
                    //top left
                    -1, 1, 0, 1,
                    //top right
                    1, 1, 1, 1,
                    //bottom right
                    -1, -1, 0, 0,

                    //top right
                    1, 1, 1, 1,
                    //bottom right
                    1, -1, 1, 0,
                    //bottom left
                    -1, -1, 0, 0,
                ]));

                const stride = Float32Array.BYTES_PER_ELEMENT * 4;

                this.gl.enableVertexAttribArray(0);

                //grabs access point from post process
                this.gl.vertexAttribPointer(0, 2, gl.FLOAT, false, stride, 0);

                this.gl.enableVertexAttribArray(1);
                this.gl.vertexAttribPointer(1, 2, gl.FLOAT, false, stride,
                    Float32Array.BYTES_PER_ELEMENT * 2);

                this.gl.bindVertexArray(null);
                this.gl.bindBuffer(gl.ARRAY_BUFFER, null);

                /* If you want to pass multiple textures to our shader we would do it this way */
                this.textureUnit0Location = gl.getUniformLocation(this.glProgram, "u_texture0")!;
                this.textureUnit1Location = gl.getUniformLocation(this.glProgram, "u_texture1")!;
                this.mixValueLocation = gl.getUniformLocation(this.glProgram, "u_mixValue")!;
        }
}