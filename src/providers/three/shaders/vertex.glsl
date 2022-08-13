vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;
  
#endif

vec3 og = mvPosition.xyz;

mvPosition.z = 1.0 * sin(mvPosition.y + uTime / uTime) * (1.0 - uNormalScroll);
mvPosition.z += 1.0 * cos(mvPosition.x + uTime) * (1.0 - uNormalScroll);
mvPosition.y = 1.0 * sin(mvPosition.z + uTime) * (1.0 - uNormalScroll);
mvPosition.y += 1.0 * cos(mvPosition.z + uTime) * (1.0 - uNormalScroll);

float ax = 1.0 * sin(mvPosition.y + uTime / uTime);
ax += 1.0 * cos(mvPosition.x + uTime);

mvPosition.x = mix(mvPosition.x, og.x, uNormalScroll);
mvPosition.y = mix(mvPosition.y, og.y, uNormalScroll);
mvPosition.z = mix(mvPosition.z, ax, uNormalScroll);

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;