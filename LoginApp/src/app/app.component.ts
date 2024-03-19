import { Component } from '@angular/core';
import { fader } from './route-animations';
import { MatDialog } from '@angular/material/dialog';
import { PopUpComponent } from './components/pop-up/pop-up.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [fader],
})
export class AppComponent {
  title = 'LoginApp';

  constructor(private dialogRef: MatDialog) {
    this.dialogRef.open(PopUpComponent);
  }
}
