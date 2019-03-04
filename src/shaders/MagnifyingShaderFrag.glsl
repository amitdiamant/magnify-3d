#define AA_RANGE 2.0
precision mediump float;

uniform sampler2D zoomedTexture;
uniform sampler2D originalTexture;
uniform vec2 pos;
uniform vec2 resolution;
uniform vec2 mag_resolution;
uniform float zoom;
uniform float exp;
uniform float radius;
uniform float outlineThickness;
uniform vec3 outlineColor;

void main() {
    vec2 uv = gl_FragCoord.xy / mag_resolution.xy;
    vec2 pos_uv = pos.xy / mag_resolution.xy;
    
    float dist = distance(gl_FragCoord.xy, pos.xy);

    float z;
    vec2 p;

    if (dist < radius) {
        // https://www.wolframalpha.com/input/?i=plot+1.0+-+(pow(x+%2F+r,+e)+*+(1.0+-+(1.0+%2F+(z))))
        z = 1.0 - (pow(dist / radius, exp) * (1.0 - (1.0 / (zoom))));
        p = ((uv - pos_uv) / z) + pos_uv;
        gl_FragColor = vec4(vec3(texture2D(zoomedTexture, p)), 1.0);
    } else if (dist <= radius + outlineThickness) {
        float w = outlineThickness / 2.0;
        float alpha = smoothstep(0.0, AA_RANGE, dist - radius) - smoothstep(outlineThickness - AA_RANGE, outlineThickness, dist - radius);
        
        if (dist <= radius + outlineThickness / 2.0) {
            // Inside outline.
            gl_FragColor = mix(texture2D(zoomedTexture, uv), vec4(outlineColor, 1.0), alpha);
        } else {
            // Outside outline.
            gl_FragColor = mix(texture2D(originalTexture, gl_FragCoord.xy / resolution.xy), vec4(outlineColor, 1.0), alpha);
        }
    } else {
        gl_FragColor = texture2D(originalTexture, gl_FragCoord.xy / resolution.xy);
    }
}    