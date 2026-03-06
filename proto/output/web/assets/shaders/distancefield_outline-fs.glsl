#ifdef GL_ES
#define LOWP lowp
precision mediump float;
#else
#define LOWP
#endif

uniform sampler2D u_texture;
uniform float u_lower;
uniform float u_upper;

// Outer transition
uniform float u_outlineMinVal0;
uniform float u_outlineMinVal1;

// Inner transition
uniform float u_outlineMaxVal0;
uniform float u_outlineMaxVal1;

const vec4 OUTLINE_COLOR = vec4(0,0,0,1);

varying LOWP vec4 v_color;
varying vec2 v_texCoord;

void main() {
  float distance = texture2D(u_texture, v_texCoord).a;
	float alpha = smoothstep(u_lower, u_upper, distance);
	vec4 baseColor = vec4(v_color.rgb, alpha);
	
	if(distance >= u_outlineMinVal0 && distance <= u_outlineMaxVal1) {
		float oFactor = 1.0;
		if(distance <= u_outlineMinVal1) {
			oFactor = smoothstep(u_outlineMinVal0, u_outlineMinVal1, distance);
		} else {
			oFactor = smoothstep(u_outlineMaxVal1, u_outlineMaxVal0, distance);
		}

		baseColor = mix(baseColor, OUTLINE_COLOR, oFactor);
	}

	gl_FragColor = baseColor;
	gl_FragColor.a *= v_color.a;
}