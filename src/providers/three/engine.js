//
// It should go without saying that this file is intended to be used on frontend
// clients only. This IS NOT a backed module and will crash if run on a node app.
//

import * as three from 'three'
import { AxesHelper } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import vertexShader from './shaders/vertex.glsl'

// Post processing
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js'

export default class Engine {
  setup() {
    if (window.threeObj === undefined) {
      window.threeObj = []
    }

    if (window.threeObj.length == 1) {
      return window.threeObj[0]
    }

    window.threeObj.push(this)

    this.scene = new three.Scene()
    this.debug = false

    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight,
    }

    this.canvas = document.querySelector('canvas')
    this.cameraOpts = {
      fov: 75,
      aspect: this.sizes.width / this.sizes.height,
      near: 0.001,
      far: 5000,
    }

    if (this.debug) {
      this.scene.add(new AxesHelper(100))
    }

    this.clock = {
      now: 0,
      delta: 0,
      last: 0,
      elapsed: 0,

      update() {
        this.now = performance.now() / 1000
        this.delta = this.now - this.last
        this.last = this.now

        this.elapsed += this.delta
      },
    }

    this.setupCamera()
    this.setupControls()
    this.setupRenderer()

    this.setupPixelColor()
    this.setupObjects()
    this.setupNormalScroll()
  }

  setupCamera() {
    this.camera = new three.PerspectiveCamera(
      this.cameraOpts.fov,
      this.cameraOpts.aspect,
      this.cameraOpts.near,
      this.cameraOpts.far
    )
    this.camera.position.set(0, 1, -10)
    this.scene.add(this.camera)
  }

  setupRenderer() {
    this.renderer = new three.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
    })

    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    this.composer = new EffectComposer(this.renderer)

    this.renderPass = new RenderPass(this.scene, this.camera)
    this.composer.addPass(this.renderPass)

    this.bloomPass = new UnrealBloomPass(undefined, 2.4, 1, 0.2)
    this.composer.addPass(this.bloomPass)

    window.addEventListener('resize', () => this.onResize)
  }

  setupNormalScroll() {
    this.normalScroll = 0

    window.addEventListener('scroll', (e) => {
      let body = document.body
      let html = document.documentElement

      let maxHeight =
        Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        ) - window.innerHeight

      this.normalScroll = this.clamp(window.scrollY / maxHeight, 0, 1)
    })
  }

  // TODO: move these types of functions into util class
  // I'm 90% sure three has this util func somewhere
  clamp(value, min, max) {
    if (value > max) {
      return max
    }

    if (value < min) {
      return min
    }

    return value
  }

  setupControls() {
    this.controls = new OrbitControls(this.camera, this.canvas)
    this.controls.enableDamping = true
    this.controls.enablePan = false
    this.controls.dampingFactor = 0.05
    this.controls.maxDistance = 1000
    this.controls.minDistance = 0
    this.controls.autoRotate = true
    this.controls.autoRotateSpeed = 0.5
    this.controls.touches = {
      ONE: three.TOUCH.ROTATE,
      TWO: three.TOUCH.DOLLY_PAN,
    }
  }

  setupObjects() {
    // Setup instanced mesh
    this.material = new three.PointsMaterial({
      color: this.pixelColors.phaseOne,
      size: 0.1,
    })

    this.objectUniforms = {
      uTime: { value: 0 },
      uNormalScroll: { value: 0 },
    }

    this.material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = this.objectUniforms.uTime
      shader.uniforms.uNormalScroll = this.objectUniforms.uNormalScroll

      shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uTime;
        uniform float uNormalScroll;
        `
      )

      shader.vertexShader = shader.vertexShader.replace(
        '#include <project_vertex>',
        vertexShader
      )
    }

    const geometry = new three.PlaneGeometry(30, 30, 50, 50)
    const mesh = new three.Points(geometry, this.material)

    mesh.rotateX(Math.PI / 2.0)

    this.scene.add(mesh)
  }

  setupPixelColor() {
    this.pixelColors = {
      phaseOne: new three.Color('#004E98'),
      phaseTwo: new three.Color('#84DD63'),
      phaseThree: new three.Color('#FB3640'),
      current: new three.Color(),
    }

    this.pixelColors.current = this.pixelColors.phaseOne.clone()
  }

  updatePixelColor() {
    // TODO: these values can be passed as a uniform to the shaders
    const p1 = this.normalScroll >= 0.0 && this.normalScroll < 0.5
    const p2 = this.normalScroll >= 0.5 && this.normalScroll <= 1.0

    const p1Scroll = this.normalScroll / 0.5
    const p2Scroll = (this.normalScroll - 0.5) / 0.5

    if (p1) {
      this.pixelColors.current.lerpColors(
        this.pixelColors.phaseOne,
        this.pixelColors.phaseTwo,
        p1Scroll
      )
    } else if (p2) {
      this.pixelColors.current.lerpColors(
        this.pixelColors.phaseTwo,
        this.pixelColors.phaseThree,
        p2Scroll
      )
    }

    this.material.color = this.pixelColors.current
  }

  onResize() {
    // Update sizes
    this.sizes.width = this.canvas.width
    this.sizes.height = this.canvas.height

    // Update camera
    this.camera.aspect = this.sizes.width / this.sizes.height
    this.camera.updateProjectionMatrix()

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  }

  run() {
    this.controls.update()
    this.clock.update()

    this.updatePixelColor()

    this.objectUniforms.uTime.value = this.clock.elapsed
    this.objectUniforms.uNormalScroll.value = this.normalScroll

    this.composer.render(this.clock.delta)
  }
}
