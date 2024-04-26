import { Component } from '@angular/core';
import { DialogBodyComponent } from './dialog-body/dialog-body.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'practica';
  constructor(private matDialog:MatDialog){}

}
