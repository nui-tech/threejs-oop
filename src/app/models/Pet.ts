import * as THREE from 'three';
import * as TWEEN from '@tweenjs/tween.js';
import { Player } from './Player';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Pet {
  private owner?: Player;
  name = 'pet';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  mesh!: THREE.Object3D;

  /**
   * Must be called every time initializing a new pet
   *
   * @return {*}  {Promise<Pet>}
   */
  async init(): Promise<Pet> {
    if (this.mesh) return this;
    const loader = new GLTFLoader();

    return new Promise((resolve) => {
      loader.load(
        'assets/3D/dog.glb',
        (gltf) => {
          this.mesh = gltf.scene;
          this.mesh.position.y = -0.4;
          resolve(this);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + '% loaded');
        },
        (error) => {
          console.log('An error happened', error);
        }
      );
    });
  }

  adoptBy(player: Player) {
    this.owner = player;

    this.followOwner();
  }

  followOwner() {
    if (!this.owner) return;

    this.owner.mesh.addEventListener('move', () => {
      const petPosition = this.mesh.position.clone();
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const ownerPosition = this.owner!.mesh.position.clone();
      const distance = petPosition.distanceTo(ownerPosition);

      // rotate pet to owner
      const angle = Math.atan2(
        ownerPosition.x - petPosition.x,
        ownerPosition.z - petPosition.z
      );
      this.mesh.rotation.y = angle;

      if (distance > 5) {
        const duration = 3 * 1000;

        const tween = new TWEEN.Tween({
          x: petPosition.x,
          y: petPosition.y,
          z: petPosition.z,
        })
          .to(
            {
              x: ownerPosition.x,
              y: ownerPosition.y,
              z: ownerPosition.z,
            },
            duration
          )
          .onUpdate((_object) => {
            // move pet to owner
            this.mesh.position.set(_object.x, this.mesh.position.y, _object.z);
          })
          .onStart(() => {
            console.log('start');
          })
          .onComplete(() => {
            console.log('done');
          });

        tween.start();
      }
    });
  }

  private randomHexColor() {
    // random hex color 0x000000 - 0xffffff
    return Math.floor(Math.random() * 16777215);
  }
}
