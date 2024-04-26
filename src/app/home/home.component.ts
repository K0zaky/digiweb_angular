import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ApiService } from '../service/api.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogBodyComponent } from '../dialog-body/dialog-body.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import { Digimon } from './../models/digimon.model';
import { FormGroup, FormControl } from '@angular/forms'
import { SharedDigimonService } from './../service/shared-digimon.service';
import { AuthService } from '../service/auth.service';
import { Router } from '@angular/router'



//import { execFileSync } from 'child_process';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('listContainer') listContainer!: ElementRef;
  data: Digimon[] = [];
  filteredDigimons: Digimon[] = [];
  searchTerm: string = '';
  digimonForm = new FormGroup({
    name: new FormControl('Name'),
    level: new FormControl('Level'),
    image: new FormControl('Image')
  });

  constructor(private apiService: ApiService, private dialog: MatDialog, private sharedDigimonService: SharedDigimonService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.llenarData();
    /*
    window.addEventListener('popstate', () => {
      this.logout();
    });*/

    setInterval(() => {
      var digimon = this.sharedDigimonService.getDigimon();
      var editedDigimon = this.sharedDigimonService.getEditedDigimon();
      if (digimon !== undefined) {
        this.data.push(digimon);
        this.sharedDigimonService.clearDigimon();
      }

      if (editedDigimon !== undefined) {
        const index = this.data.findIndex(d => d.name === editedDigimon?.name);
        if (index !== -1) {
          this.data[index] = editedDigimon;
          this.sharedDigimonService.clearDigimon();
        }
      }
    }, 1000);
  }

  llenarData() {
    this.apiService.getData().subscribe(data => {
      this.data = data;
      this.filteredDigimons = this.data;
      this.sharedDigimonService.setData(this.data);
    });
  }

  searchDigimon() {
    setTimeout(() => {
      if (this.searchTerm.length >= 3) {
        this.filteredDigimons = this.data.filter(digimon =>
          digimon.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      } else {
        this.filteredDigimons = this.data;
      }

    }, 1000);
  }

  crearDigimon(name: string, level: string, image: string): Digimon {
    return {
      name: name,
      level: level,
      img: image
    };
  }

  editDigimon(digimon: Digimon): void {
    const index = this.data.indexOf(digimon);
    if (index !== -1) {
      const dialogRef = this.dialog.open(DialogEditComponent, {
        width: '350px',
      });

      dialogRef.afterClosed().subscribe((editedDigimon: Digimon) => {
        if (editedDigimon) {
          this.data[index] = editedDigimon;
          console.log('Digimon editado:', editedDigimon);
        }
      });
    }
  }

  deleteDigimon(digimon: Digimon): void {
    const index = this.data.indexOf(digimon);
    if (index !== -1) {
      this.data.splice(index, 1);
      console.log('Digimon eliminado:', digimon.name);
    } else {
      console.error('No se encontró el Digimon en la lista:', digimon.name);
    }
  }

  anadirDigimon(): void {
    this.dialog.open(DialogBodyComponent, {
      width: '350px',
    });
  }

  scrollToTop() {
    this.listContainer.nativeElement.scrollTop = 0;
  }

  logout(): void{
    this.authService.logout()
    this.router.navigate(['/']);
  }



  // Intérprete (NO PARTE DEL PROGRAMA)

  evalTypeScriptExpression(expression: string): any {
    try {
        // Evalúa la expresión TypeScript en tiempo de ejecución
        expression="if('digimon'=='cubone'){true}else{false}"
        const result = eval(expression);
        console.log("Resultado:", result);
        return result;
    } catch (error) {
        console.error("Error al ejecutar la expresión TypeScript:", error);
        return;
    }
  }

  /*
  const condition = '"digimon" == "cubone"';
  const result = this.evalTypeScriptExpression(this.condition);
  console.log("Resultado:", result);
  */



}










