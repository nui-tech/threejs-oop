import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { EngineService } from './services/engine.service';
import { Game } from './models/Game';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit {
  title = 'threejs-oop';
  @ViewChild('renderContainer') renderContainer!: ElementRef<HTMLDivElement>;
  game!: Game;

  constructor(private engine: EngineService) {}

  ngAfterViewInit(): void {
    this.renderContainer.nativeElement.appendChild(
      this.engine.renderer.domElement
    );
    this.engine.init();
    this.engine.addDebugger();
    this.haveSomeFun();
  }

  private haveSomeFun(): void {
    this.game = new Game(this.engine.scene);
    this.game.init();
    this.engine.updateRender();
  }

  gotoVP(vp: number): void {
    // this.game.gotoVP(vp);
  }
}
