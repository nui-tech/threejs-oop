import * as THREE from 'three';

export class Player {
  mesh: THREE.Mesh;
  moveVelocity = 0.1;

  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshPhongMaterial({ color: 65280 })
    );
  }

  private _onMove() {
    this.mesh.dispatchEvent({ type: 'move', message: 'player moved' });
  }

  moveForward() {
    this._onMove();
    this.mesh.position.z -= this.moveVelocity;
  }

  moveBackward() {
    this._onMove();
    this.mesh.position.z += this.moveVelocity;
  }

  moveLeft() {
    this._onMove();
    this.mesh.position.x -= this.moveVelocity;
  }

  moveRight() {
    this._onMove();
    this.mesh.position.x += this.moveVelocity;
  }

  moveForwardLeft() {
    this._onMove();
    this.mesh.position.z -= this.moveVelocity;
    this.mesh.position.x -= this.moveVelocity;
  }

  moveForwardRight() {
    this._onMove();
    this.mesh.position.z -= this.moveVelocity;
    this.mesh.position.x += this.moveVelocity;
  }

  moveBackwardLeft() {
    this._onMove();
    this.mesh.position.z += this.moveVelocity;
    this.mesh.position.x -= this.moveVelocity;
  }

  moveBackwardRight() {
    this._onMove();
    this.mesh.position.z += this.moveVelocity;
    this.mesh.position.x += this.moveVelocity;
  }
}
