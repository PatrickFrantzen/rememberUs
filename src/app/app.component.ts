import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { PlatformDetectionService } from './services/platform-detection.service';
import { DesktopLayoutComponent } from './layouts/desktop-layout.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet, DesktopLayoutComponent],
})
export class AppComponent {
  protected readonly platformService = inject(PlatformDetectionService);
}
