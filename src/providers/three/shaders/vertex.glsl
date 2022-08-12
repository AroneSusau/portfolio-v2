vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;
  
#endif

mvPosition.z = 1.0 * sin(mvPosition.y + uTime / uTime);
mvPosition.z += 1.0 * cos(mvPosition.x + uTime);

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;