import * as THREE from 'three';
import { Pet } from './Pet';
import { Player } from './Player';
import { Terrain } from './Terrain';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

export class Game {
  player = new Player();
  terrain = new Terrain();

  constructor(private scene: THREE.Scene) {}

  async init() {
    this.scene.add(this.terrain.mesh);
    this.scene.add(this.player.mesh);

    const dog = await new Pet().init();

    dog.name = 'dog';
    dog.adoptBy(this.player);
    dog.mesh.position.x = -2;
    dog.mesh.position.z = -2;

    this.scene.add(dog.mesh);

    this.userInputControls();
  }

  userInputControls() {
    const keysPressed = new Set<string>();

    document.addEventListener('keydown', (event) => {
      keysPressed.add(event.key);

      if (keysPressed.has('w') && keysPressed.has('a')) {
        this.player.moveForwardLeft();
      } else if (keysPressed.has('w') && keysPressed.has('d')) {
        this.player.moveForwardRight();
      } else if (keysPressed.has('s') && keysPressed.has('a')) {
        this.player.moveBackwardLeft();
      } else if (keysPressed.has('s') && keysPressed.has('d')) {
        this.player.moveBackwardRight();
      } else if (keysPressed.has('w')) {
        this.player.moveForward();
      } else if (keysPressed.has('s')) {
        this.player.moveBackward();
      } else if (keysPressed.has('a')) {
        this.player.moveLeft();
      } else if (keysPressed.has('d')) {
        this.player.moveRight();
      }

      if (
        keysPressed.has('w') ||
        keysPressed.has('s') ||
        keysPressed.has('a') ||
        keysPressed.has('d')
      ) {
        // increase velocity
        if (this.player.moveVelocity < 2) {
          this.player.moveVelocity += 0.1;
        }

        // this.pet.followOwner();
      }
    });

    document.addEventListener('keyup', (event) => {
      keysPressed.delete(event.key);

      if (
        !keysPressed.has('w') &&
        !keysPressed.has('s') &&
        !keysPressed.has('a') &&
        !keysPressed.has('d')
      ) {
        // reset velocity
        this.player.moveVelocity = 0.1;
      }
    });
  }
}
