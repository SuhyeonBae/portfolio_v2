import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-to-home-screen',
  templateUrl: './add-to-home-screen.component.html',
  styleUrl: './add-to-home-screen.component.scss'
})
export class AddToHomeScreenComponent implements OnInit {
  public showA2hsButton = false;
  public deferredPrompt: any;
  
  @HostListener('window:beforeinstallprompt', ['$event']) onBeforeInstallPrompt(event: any) {
    event.preventDefault();
    this.deferredPrompt = event;
  }

  ngOnInit() {
    setTimeout(() => {
      this.showA2hsButton = true;
    }, 150);
  }


  public addToHomeScreen() {
    this.showA2hsButton = false;
    this.deferredPrompt?.prompt();
    this.deferredPrompt?.userChoice.then((choiceResult: any) => {
      console.log('choiceReslt', choiceResult);
    });
    }

  public cancel(e?: any) {
    e?.stopPropagation();
    this.showA2hsButton = false;
    this.deferredPrompt = null;
  }

}
