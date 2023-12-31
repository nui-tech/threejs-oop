import { Injectable } from '@angular/core';
import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module.js';
import CameraControls from 'camera-controls';
import * as TWEEN from '@tweenjs/tween.js';

CameraControls.install({ THREE: THREE });

@Injectable({
  providedIn: 'root',
})
export class EngineService {

  readonly scene: THREE.Scene = new THREE.Scene();
  readonly camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );
  readonly renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer({
    antialias: true,
  });
  readonly clock = new THREE.Clock();
  readonly cameraControls: CameraControls;
  readonly stats = new Stats();
  private debugger = false;

  constructor() {
    this.camera.position.z = 8;
    this.camera.position.y = 6;
    this.scene.background = new THREE.Color(0x676767);
    this.scene.add(new THREE.AmbientLight(0x404040));

    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.cameraControls = new CameraControls(
      this.camera,
      this.renderer.domElement
    );
    this.cameraControls.maxPolarAngle = Math.PI / 2;

    
    
  }

  init(): void {
    this._animate();
  }

  private _animate(): void {
    const delta = this.clock.getDelta();
    const hasControlsUpdated = this.cameraControls.update(delta);
    requestAnimationFrame(() => this._animate());
    TWEEN.update();
    this.renderer.render(this.scene, this.camera);
    this.stats.update();
    if (hasControlsUpdated) {
      // render on demand here
    }
  }

  updateRender(): void {
    this.renderer.render(this.scene, this.camera);
  }

  addDebugger(): void {
    this.stats.dom.style.right = '5px';
    this.stats.dom.style.top = '5px';
    this.stats.dom.style.left = 'auto';
    document.body.appendChild(this.stats.dom);
  }
}
