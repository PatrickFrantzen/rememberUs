import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { PlatformDetectionService } from '../services/platform-detection.service';

@Component({
  selector: 'app-desktop-layout',
  template: `
    <mat-toolbar color="primary">
      <span>RememberUs</span>
    </mat-toolbar>

    <mat-sidenav-container class="sidenav-container">
      <mat-sidenav mode="side" opened class="sidenav">
        <mat-nav-list>
          <a mat-list-item routerLink="/tabs/tab1" routerLinkActive="active">
            <mat-icon matListItemIcon>home</mat-icon>
            <span matListItemTitle>Tab 1</span>
          </a>
          <a mat-list-item routerLink="/tabs/tab2" routerLinkActive="active">
            <mat-icon matListItemIcon>search</mat-icon>
            <span matListItemTitle>Tab 2</span>
          </a>
          <a mat-list-item routerLink="/tabs/tab3" routerLinkActive="active">
            <mat-icon matListItemIcon>settings</mat-icon>
            <span matListItemTitle>Tab 3</span>
          </a>
        </mat-nav-list>
      </mat-sidenav>

      <mat-sidenav-content class="main-content">
        <ng-content></ng-content>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styles: [
    `
      .sidenav-container {
        height: calc(100vh - 64px);
      }

      .sidenav {
        width: 250px;
      }

      .main-content {
        padding: 20px;
      }

      .active {
        background-color: rgba(0, 0, 0, 0.04);
      }
    `,
  ],
  imports: [
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    RouterLink,
    RouterLinkActive,
  ],
})
export class DesktopLayoutComponent {}
