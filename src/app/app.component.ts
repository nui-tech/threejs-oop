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

  constructor(private engine: EngineService) {}
  ngAfterViewInit(): void {
    this.renderContainer.nativeElement.appendChild(
      this.engine.renderer.domElement
    );
    this.engine.init();
    this.engine.addDebugger();
    this.haveSomeFun();
  }

  haveSomeFun(): void {
    const game = new Game(this.engine.scene);
    game.init();
    this.engine.updateRender();
  }
}
