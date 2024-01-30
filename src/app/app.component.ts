import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Suhyeon Bae';

  setMode(e: any) {
    console.log(`setMode`, e);
  }
}
