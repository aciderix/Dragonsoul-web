#ifdef GL_ES
	#define LOWP lowp
	precision mediump float;
#else
	#define LOWP 
#endif

varying LOWP vec4 v_color;
varying vec2 v_texCoords;
uniform sampler2D u_texture;

#ifdef HSV
// H - an offset in degrees of the color spectrum
// S - 1 for no change in saturation, > 1 to saturate, < 1 to desaturate
// V - 1 for no change, > 1 brightens, < 1 darkens
uniform vec3 u_HSV;

vec3 rgb2hsv(vec3 c)
{
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c)
{
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
#endif

#ifdef DARKEN
uniform float u_darkenAlpha;
#endif

#ifdef ALPHA_ATLAS
varying vec2 v_alphaCoords;
uniform float u_alphaAtlasDisable;
#endif

#ifdef RENDER_TYPE
uniform float u_renderType;
#endif

#ifdef ALPHA_TEST
uniform float u_alphaTest;
#endif

void main()
{
	#ifdef ALPHA_ATLAS
		LOWP vec4 texVal;
		if(u_alphaAtlasDisable >= 1.0) {
			texVal = texture2D(u_texture, v_alphaCoords);
		} else {
			texVal = texture2D(u_texture, v_texCoords);
			texVal.a = texture2D(u_texture, v_alphaCoords).r;
		}
	#else
		LOWP vec4 texVal = texture2D(u_texture, v_texCoords);
	#endif
	
	gl_FragColor = v_color * texVal;
	
	#ifdef ALPHA_TEST
		if(gl_FragColor.a < u_alphaTest)
			discard;
	#endif
	
	#ifdef DARKEN
		gl_FragColor.r *= u_darkenAlpha;
		gl_FragColor.g *= u_darkenAlpha;
		gl_FragColor.b *= u_darkenAlpha;
		// Samsung tab and kindle fire devices have a bug with their graphics chipset that throws off alpha value - DS-1967
		gl_FragColor.a = v_color.a * texVal.a;
	#endif
	
	#ifdef HSV
		// Most of the HSV code is from http://gamedev.stackexchange.com/questions/59797/glsl-shader-change-hue-saturation-brightness
		vec3 fragRGB = gl_FragColor.rgb;
		vec3 fragHSV = rgb2hsv(fragRGB);
		fragHSV.x += u_HSV.x / 360.0;
		fragHSV.yz *= u_HSV.yz;
    	//fragHSV.xyz = mod(fragHSV.xyz, 1.0);	// Modding saturation and value doesn't make sense, just going to do hue 
    	fragHSV.x = mod(fragHSV.x, 1.0);
    	fragRGB = hsv2rgb(fragHSV);
		gl_FragColor.rgb = fragRGB;
	#endif
	
	#ifdef DESATURATE
		gl_FragColor.r = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;
		gl_FragColor.g = gl_FragColor.b = gl_FragColor.r;
	#endif
	
	#ifdef RENDER_TYPE
		if(u_renderType >= 2.0) { // brighten
			gl_FragColor.r += .23;
			gl_FragColor.g += .23;
			gl_FragColor.b += .23;
		}
		else if(u_renderType >= 1.0) {	// desaturate
			gl_FragColor.r = (gl_FragColor.r + gl_FragColor.g + gl_FragColor.b) / 3.0;
			gl_FragColor.g = gl_FragColor.b = gl_FragColor.r;
		}
	#endif
}
