import * as THREE from 'three';

export class Terrain {
  mesh: THREE.Mesh;

  constructor() {
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(10, 0.1, 10),
      new THREE.MeshPhongMaterial({ color: 16448250 })
    );
    this.mesh.position.y = -0.5;
  }
}
