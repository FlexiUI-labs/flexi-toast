import { Component, Input, Output, EventEmitter, HostBinding, ViewEncapsulation, ChangeDetectionStrategy, input, linkedSignal, output } from '@angular/core';
import { CommonModule } from '@angular/common';

export type FlexiSwalContentThemeClass = "success" | "warning" | "info" | "error" | "default";

@Component({
    selector: 'flexi-swal',
    imports: [CommonModule],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    @if(isVisibleSignal()){
        <div class="flexi-swal-container" [attr.data-bs-theme]="themeClass()">
          <div class="flexi-swal-content"
               [attr.data-bs-theme]="themeClass()">

            <!-- Close button (top right) -->
            <span class="flexi-swal-close-btn"
                  *ngIf="showCloseBtn()"
                  (click)="onCancel()">×</span>

            <!-- Title container -->
            <div class="flexi-swal-title-container">
              <span>{{ title() }}</span>
              <button class="flexi-swal-close-button" (click)="onCancel()">×</button>
            </div>

            <!-- Question container -->
            <div class="flexi-swal-question-container">
              <span>{{ question() }}</span>
            </div>

            <!-- Button container -->
            <div class="flexi-swal-button-container">
              <button class="flexi-swal-button flexi-swal-button-primary"
                      (click)="onConfirm()">
                {{ confirmBtnText() }}
              </button>
              <button class="flexi-swal-button"
                      (click)="onCancel()">
                {{ cancelBtnText() }}
              </button>
            </div>

          </div>
        </div>
    }
  `,
    styles: [`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 9999;
      pointer-events: none;
    }

    :host(.visible) {
      pointer-events: all;
    }

    .flexi-swal-container {
      display: flex;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
      z-index: 9999;
    }

    .flexi-swal-content {
      animation: fadeIn 0.3s ease-in-out;
    }

    .fade-out {
      animation: fadeOut 0.2s ease-in-out forwards;
    }

    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: scale(0.9);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: scale(1);
      }
      to {
        opacity: 0;
        transform: scale(0.9);
      }
    }
  `]
})
export class FlexiSwalComponent {
    readonly title = input<string>('');
    readonly question = input<string>('');
    readonly confirmBtnText = input<string>('Confirm');
    readonly cancelBtnText = input<string>('Cancel');
    readonly showCloseBtn = input<boolean>(false);
    readonly themeClass = input<'light' | 'dark'>('light');
    readonly contentThemeClass = input<FlexiSwalContentThemeClass>('default');
    readonly isVisible = input<boolean>(false);

    readonly isVisibleSignal = linkedSignal(() => this.isVisible());

    readonly confirmed = output<void>();
    readonly cancelled = output<void>();
    readonly closed = output<void>();

    @HostBinding('class.visible') get visible() {
        return this.isVisibleSignal();
    }

    @HostBinding('style.display') get display() {
        return this.isVisibleSignal() ? 'block' : 'none';
    }

    onConfirm() {
        this.confirmed.emit();
        this.close();
    }

    onCancel() {
        this.cancelled.emit();
        this.close();
    }

    private close() {
        this.isVisibleSignal.set(false);
        this.closed.emit();
    }

    show() {
        this.isVisibleSignal.set(true);
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    hide() {
        this.isVisibleSignal.set(false);
        // Restore body scroll
        document.body.style.overflow = '';
    }
}