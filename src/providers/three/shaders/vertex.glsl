vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;
  
#endif

// Initial setup
vec3 firstPhase = mvPosition.xyz;
vec3 secondPhase = mvPosition.xyz;
vec3 thirdPhase = mvPosition.xyz;

bool p1 = uNormalScroll >= 0.0 && uNormalScroll < 0.5;
bool p2 = uNormalScroll >= 0.5 && uNormalScroll <= 1.0;

float p1Scroll = uNormalScroll / 0.5;
float p2Scroll = (uNormalScroll - 0.5) / 0.5;

float revScroll = 1.0 - uNormalScroll;

// First phase
firstPhase.z = 1.0 * sin(firstPhase.y + uTime / uTime) * revScroll;
firstPhase.z += 1.0 * cos(firstPhase.x + uTime) * revScroll;

firstPhase.y = 1.0 * sin(firstPhase.z + uTime) * revScroll;
firstPhase.y += 1.0 * cos(firstPhase.z + uTime) * revScroll;

// Second phase
secondPhase.z = 0.5 * sin(secondPhase.y + uTime / uTime);
secondPhase.z += 0.5 * cos(secondPhase.x + uTime);

// Third phase
thirdPhase.x += 1.0 * sin(thirdPhase.y + uTime);
thirdPhase.y += 1.0 * cos(uTime);

// Mixing
if (p1) {
	mvPosition = vec4(mix(firstPhase, secondPhase, p1Scroll), 1.0);
} else if (p2) {
	mvPosition = vec4(mix(secondPhase, thirdPhase, p2Scroll), 1.0);
}

mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;