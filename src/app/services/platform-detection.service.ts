import { Injectable, signal, computed, inject } from '@angular/core';
import { Platform } from '@ionic/angular/standalone';
import { toSignal } from '@angular/core/rxjs-interop';
import { fromEvent } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlatformDetectionService {
  private readonly platform = inject(Platform);

  // Breakpoints (anpassbar)
  private readonly MOBILE_BREAKPOINT = 768;
  private readonly TABLET_BREAKPOINT = 1024;

  // Window resize als Signal
  private readonly windowWidth = toSignal(
    fromEvent(window, 'resize').pipe(
      startWith(null),
      map(() => window.innerWidth)
    ),
    { initialValue: window.innerWidth }
  );

  // Platform Detection
  readonly isMobile = computed(() => {
    const width = this.windowWidth();
    return (
      this.platform.is('mobile') ||
      this.platform.is('mobileweb') ||
      width < this.MOBILE_BREAKPOINT
    );
  });

  readonly isTablet = computed(() => {
    const width = this.windowWidth();
    return (
      this.platform.is('tablet') ||
      (width >= this.MOBILE_BREAKPOINT && width < this.TABLET_BREAKPOINT)
    );
  });

  readonly isDesktop = computed(() => {
    const width = this.windowWidth();
    return this.platform.is('desktop') || width >= this.TABLET_BREAKPOINT;
  });

  // Combined signals für UI decisions
  readonly useIonicUI = computed(() => this.isMobile() || this.isTablet());
  readonly useMaterialUI = computed(() => this.isDesktop());

  // Platform Info für Debugging
  readonly platformInfo = computed(() => ({
    width: this.windowWidth(),
    isMobile: this.isMobile(),
    isTablet: this.isTablet(),
    isDesktop: this.isDesktop(),
    useIonicUI: this.useIonicUI(),
    useMaterialUI: this.useMaterialUI(),
    platforms: this.platform.platforms(),
  }));
}
