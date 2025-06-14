# Flexi Toast

Lightweight, customizable Angular toast notification component with title, message, icon types, auto-dismiss, manual close, animations, theme and positioning support.

---

## Live Demo

[![Edit in CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://stackblitz.com/edit/stackblitz-starters-v4bqrm8b?file=src%2Fmain.ts)

---

## Features

- 🟢 Success, 🔴 Error, 🔵 Info, 🟠 Warning toasts
- ⏲️ Configurable timeout & auto-dismiss
- 🔢 Multiple stack positions: `top-right`, `bottom-left`, etc.
- 🎨 Customizable styles & animations
- ♿️ ARIA roles & keyboard support
- 🔧 Full customization via inputs & CSS variables

---

## Installation

```bash
npm install flexi-toast
```

---

## Usage

### 1. Import

```ts
import { FlexiToastService } from 'flexi-toast';

@Component({
  ...
})
export class AppComponent {
  readonly #toast = inject(FlexiToastService);
```
---

### 2. Show a Toast

```ts
import { ToastService } from 'flexi-toast';

@Component({ /* ... */ })
export class AppComponent {
  readonly #toast = inject(FlexiToastService);

  notify() {
    this.toast.show('Success','This is a message','success'); //icon => success | info | warning | error
  }
}
```

---

### 3. Show a Swal

```ts
import { ToastService } from 'flexi-toast';

@Component({ /* ... */ })
export class AppComponent {
  readonly #toast = inject(FlexiToastService);

  swal(){
    this.#toast.showSwal("Question?","This is a question?","Yes",() => {
      this.#toast.showToast("Info","This is a info message", "info");
    },"No")
  }
}
```

---

## API

| Option                  | Type                                      | Default         | Description                                |
|-------------------------|-------------------------------------------|-----------------|--------------------------------------------|
| 'icon'                  | FlexiToastIconType                        | 'success'       | Icon to display on the toast               |
| 'autoClose'             | boolean                                   | true            | Automatically close the toast after timeout|
| 'timeOut'               | number                                    | 3000            | Time in milliseconds before auto-close     |
| 'showProgressBar'       | boolean                                   | true            | Show a progress bar indicator              |
| 'showToastCloseBtn'     | boolean                                   | true            | Show a close (×) button on the toast       |
| 'showSwalCloseBtn'      | boolean                                   | false           | Show a close button in SweetAlert dialogs  |
| 'preventDuplicate'      | boolean                                   | false           | Prevent showing duplicate toasts           |
| 'position'              | FlexiToastPositionType                    | 'bottom-right'  | Position of the toast container            |
| 'themeClass'            | FlexiToastThemeClassType | string        | 'light'         | CSS class or theme for toast styling       |
| 'cancelBtnText'         | string                                    | 'Vazgeç'        | Text for the SweetAlert cancel button      |
| 'confirmBtnText'        | string                                    | 'Sil'           | Text for the SweetAlert confirm button     |
| 'swalContentThemeClass' | FlexiSwalContentThemeClass                | 'default'       | CSS class for SweetAlert content styling   |


---

## Styling & CSS Variables

Define your own colors and styling:

```css
:root {
  --toast-bg-success: '#dff0d8';
  --toast-bg-error:   '#f2dede';
  --toast-bg-info:    '#d9edf7';
  --toast-bg-warning: '#fcf8e3';
  --toast-color:      '#333';
  --toast-padding:    '12px 16px';
  --toast-border-radius: '4px';
}
```

## License

MIT © Taner Saydam / Flexi UI

> Crafted with ❤ for flexible toast notifications in Angular.