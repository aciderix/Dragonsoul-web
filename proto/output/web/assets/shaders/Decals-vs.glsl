attribute vec4 a_position;
attribute vec4 a_color;
attribute vec2 a_texCoord0;

uniform mat4 u_projTrans;

#ifdef PARALLAX
uniform float u_zoom;	// (0,1) makes this layer appear closer, > 1 makes the layer appear further away
#endif

varying vec4 v_color;
varying vec2 v_texCoords;

#ifdef ALPHA_ATLAS
varying vec2 v_alphaCoords;
#endif

void main()
{
	v_color = a_color;
	
	gl_Position =  u_projTrans * a_position;
	
	#ifdef PARALLAX
		gl_Position.x *= u_zoom;
		gl_Position.y *= u_zoom;
	#endif
	
	#ifdef ALPHA_ATLAS
		v_alphaCoords = a_texCoord0;
		v_texCoords = v_alphaCoords + vec2(0.0, 0.5);
	#else
		v_texCoords = a_texCoord0;
	#endif
}