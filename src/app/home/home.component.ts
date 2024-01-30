import { AfterViewInit, Component, OnDestroy, WritableSignal, effect, signal } from '@angular/core';
import { Subscription, interval } from 'rxjs';
import { Nl2brPipe } from '../nl2br.pipe';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [Nl2brPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements AfterViewInit, OnDestroy {

  public isLoading = false;
  public mainText: string = '';
  public charIndex: WritableSignal<number> = signal(0);
  public textArrayIndex: WritableSignal<number> = signal(0);
  public isTyping = false;
  public typingDelay: number = 200;
  public subscription: Subscription = new Subscription();

  ngAfterViewInit() {
    this.subscription = interval(this.typingDelay).subscribe(() => {
      this.type();
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public type() {
    const textArray: Array<string> = ['Think Big', '\r\nStart Small', '\r\nand Have Fun..!!'];
    if (this.charIndex() < textArray[this.textArrayIndex()].length) {
      this.isTyping = true;
      this.mainText += textArray[this.textArrayIndex()].charAt(this.charIndex());
      this.charIndex.update((val) => val + 1);
    } else {
      this.isTyping = false;
      this.charIndex.set(0);
      this.textArrayIndex.update((val) => val + 1);
      this.subscription.unsubscribe();
      if (this.textArrayIndex() < textArray.length) {
        setTimeout(() => {
          this.subscription = interval(this.typingDelay).subscribe(() => this.type());
        }, this.typingDelay * 2.5)
      }
    }
  }
}
