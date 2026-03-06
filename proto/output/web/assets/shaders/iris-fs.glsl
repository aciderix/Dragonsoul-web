#ifdef GL_ES
	#define LOWP lowp
	precision mediump float;
#else
	#define LOWP 
#endif

uniform float u_fadeLength;	// fade length in screen coords
uniform float u_fadeStart;	// start of fade in screen units from the center of the screen
uniform vec2 center;	// center of iris

void main()
{
	float dist = distance(center, vec2(gl_FragCoord.x, gl_FragCoord.y)) - u_fadeStart;
	gl_FragColor = mix(vec4(0,0,0,0), vec4(0,0,0,1), dist / u_fadeLength);
}