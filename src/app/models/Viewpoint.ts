import * as THREE from "three";
import { Utils } from "../utils";

export class Viewpoint{

  mesh: THREE.Mesh;

  constructor(){
    this.mesh = new THREE.Mesh(
      new THREE.CylinderGeometry(4, 4, 0.1, 100),
      new THREE.MeshBasicMaterial({ color: Utils.randomHexColor() })
    );
    this.mesh.position.y = -0.5;
  }

}