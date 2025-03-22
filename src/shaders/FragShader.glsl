#version 300 es
precision mediump float;

in vec2 vTexCoords;
in vec3 vColor;

uniform sampler2D uTexture;


// Multiple Render Targets (MRT)
// This is needed to extract bright colours
// this is also a better method compared to
// rendering the scene twice.
layout(location = 0) out vec4 fragColor;
layout(location = 1) out vec4 brightColor;

const float brightnessThreshold = 0.4;

void main() {

    fragColor = texture(uTexture, vTexCoords) * vec4(vColor, 1.0);
    float br = dot(fragColor.rgb, vec3(0.299, 0.587, 0.114));

    if(br > brightnessThreshold) {
        brightColor = fragColor;
    }
    else {
        brightColor = vec4(0.0, 0.0, 0.0, fragColor.a);
    }
}