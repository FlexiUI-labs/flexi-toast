import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FlexiToastOptionsModel, FlexiToastService } from 'flexi-toast';

@Component({
  selector: 'app-root',
  imports: [],
  template:`
  <div style="margin: 30px; display:flex; flex-direction: column; gap: 5px; width:200px">
    <button style="background-color:#47D764; color: white; padding:10px" (click)="success()">Success</button>
    <button style="background-color:#2F86EB; color: white; padding:10px" (click)="info()">Info</button>
    <button style="background-color:#FFC021; color: black; padding:10px" (click)="warning()">Warning</button>
    <button style="background-color:#ff355b; color: white; padding:10px" (click)="error()">Error</button>
    <button style="padding:10px" (click)="swal()">Swal</button>
  </div>
  `
})
export class App {
  readonly options = signal<FlexiToastOptionsModel>(new FlexiToastOptionsModel());

  readonly #toast = inject(FlexiToastService);

  constructor(){
    this.options.update(prev => ({
      ...prev,
      autoClose: true,
      position: 'bottom-right',
      themeClass: 'light'
    }))
  }

  success(){
    this.#toast.showToast("Success","This is a success message", "success", this.options());
  }

  info(){
    this.#toast.showToast("Info","This is a info message", "info", this.options());
  }

  warning(){
    this.#toast.showToast("Warning","This is a warning message", "warning", this.options());
  }

  error(){
    this.#toast.showToast("Error","This is a error message", "error", this.options());
  }

  swal(){
    this.#toast.showSwal("Question?","This is a question?","Yes",() => {
      this.#toast.showToast("Info","This is a info message", "info");
    },"No")
  }
}
