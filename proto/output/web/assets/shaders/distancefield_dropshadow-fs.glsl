#ifdef GL_ES
#define LOWP lowp
precision mediump float;
#else
#define LOWP
#endif

uniform sampler2D u_texture;
uniform float u_lower;
uniform float u_upper;
uniform float u_outlineShadowLower;
uniform float u_y_shadow_offset;

varying LOWP vec4 v_color;
varying vec2 v_texCoord;

const vec4 SHADOW_COLOR = vec4(0,0,0,1);

void main() {
	float distance = texture2D(u_texture, v_texCoord).a;
	float alpha = smoothstep(u_lower, u_upper, distance);
	vec4 baseColor = vec4(v_color.rgb, alpha);
	
	// Sample outline
	float outlineAlpha = smoothstep(u_outlineShadowLower, u_lower, distance);
	vec4 outlineC = SHADOW_COLOR * outlineAlpha;
	
	// Drop shadow
    vec2 SHADOW_OFFSET = vec2(0,-u_y_shadow_offset);
	float shadowDist = texture2D(u_texture, v_texCoord.xy + SHADOW_OFFSET.xy).a;
	vec4 shadowC = SHADOW_COLOR * smoothstep(u_outlineShadowLower, u_lower, shadowDist);
	
	vec4 outlineShadow = mix(shadowC, outlineC, outlineAlpha);
	
	gl_FragColor = mix(outlineShadow, baseColor, alpha);
	gl_FragColor.a *= v_color.a;
}