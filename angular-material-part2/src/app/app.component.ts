import { Component, ViewChild } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
//BreakpointObserver - we can detect screen size 
//changes with the Angular CDK layout package and its BreakpointObserver service. 

  constructor(private observer: BreakpointObserver) {}
//Remember to keep the subscription in the ngAfterViewInit lifecycle method, 
//so that we’re assured we have the sidenav initialized before calling it!
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width: 800px)'])
      .pipe(delay(1))
      .subscribe((res) => {
        if (res.matches) {
          //appear on top if not need vclose
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          //always appear on side
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }
}
