import { Injectable, inject } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalController, ModalOptions } from '@ionic/angular/standalone';
import { PlatformDetectionService } from './platform-detection.service';
import { ComponentType } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root',
})
export class ResponsiveDialogService {
  private readonly platformService = inject(PlatformDetectionService);
  private readonly matDialog = inject(MatDialog);
  private readonly modalController = inject(ModalController);

  /**
   * Öffnet einen Dialog/Modal abhängig von der Platform
   * Auf Desktop: Angular Material Dialog
   * Auf Mobile/Tablet: Ionic Modal
   */
  async open<T, D = any, R = any>(
    component: ComponentType<T>,
    config?: ResponsiveDialogConfig<D>
  ): Promise<ResponsiveDialogRef<R>> {
    if (this.platformService.useMaterialUI()) {
      return this.openMaterialDialog(component, config);
    } else {
      return this.openIonicModal(component, config);
    }
  }

  private openMaterialDialog<T, D, R>(
    component: ComponentType<T>,
    config?: ResponsiveDialogConfig<D>
  ): ResponsiveDialogRef<R> {
    const dialogConfig: MatDialogConfig<D> = {
      data: config?.data,
      width: config?.width || '600px',
      maxWidth: config?.maxWidth || '90vw',
      disableClose: config?.disableClose || false,
      ...config?.materialConfig,
    };

    const dialogRef = this.matDialog.open(component, dialogConfig);

    return {
      afterClosed: () => dialogRef.afterClosed().toPromise(),
      close: (result?: R) => dialogRef.close(result),
    };
  }

  private async openIonicModal<T, D, R>(
    component: ComponentType<T>,
    config?: ResponsiveDialogConfig<D>
  ): Promise<ResponsiveDialogRef<R>> {
    const modalOptions: ModalOptions = {
      component: component as any,
      componentProps: config?.data ? { data: config.data } : undefined,
      backdropDismiss: !config?.disableClose,
      ...config?.ionicConfig,
    };

    const modal = await this.modalController.create(modalOptions);
    await modal.present();

    return {
      afterClosed: () =>
        modal.onDidDismiss().then((result) => result.data as R),
      close: (result?: R) => modal.dismiss(result),
    };
  }
}

// Types
export interface ResponsiveDialogConfig<D = any> {
  data?: D;
  width?: string;
  maxWidth?: string;
  disableClose?: boolean;
  materialConfig?: Partial<MatDialogConfig>;
  ionicConfig?: Partial<ModalOptions>;
}

export interface ResponsiveDialogRef<R = any> {
  afterClosed: () => Promise<R | undefined>;
  close: (result?: R) => void;
}
