#version 300 es 
precision mediump float;

in vec2 v_texCoords;

uniform sampler2D u_texture0; // scene
uniform sampler2D u_texture1; // brightness

out vec4 fragColor;

void main() {

    vec4 t0 = texture(u_texture0, v_texCoords);
    vec4 t1 = texture(u_texture1, v_texCoords);


    //damping the brightness abit
    t0 *= (vec4(1.0) - clamp(t1, vec4(0.0), vec4(1.0)));
    fragColor = t0 + t1;
}