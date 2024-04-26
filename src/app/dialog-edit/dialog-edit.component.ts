import { Component, Injectable, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Digimon } from './../models/digimon.model';
import { ApiService } from '../service/api.service';
import { FormGroup, FormControl } from '@angular/forms';
import { SharedDigimonService } from './../service/shared-digimon.service';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrl: './dialog-edit.component.css'
})

@Injectable({
  providedIn: 'root'
})

export class DialogEditComponent {

  digimonForm = new FormGroup({
    name: new FormControl('Name'),
    level: new FormControl('Level'),
    image: new FormControl('Image')
  })

  constructor(
    public dialogRef: MatDialogRef<DialogEditComponent>,
    private apiService: ApiService,
    @Inject(MAT_DIALOG_DATA) public data: Digimon[]=[],
    private sharedDigimonService: SharedDigimonService
  ) {}

  crearDigimon(nombre: string, level: string, image: string): Digimon {
    return {
      name: nombre,
      level: level,
      img: image
    };
  }

  cancel(): void {
    this.dialogRef.close();
  }

  enviarDigimon(digimon: Digimon) {
    this.sharedDigimonService.setEditedDigimon(digimon);
  }

  anadirDigimon(): void{
    if (this.digimonForm.value.name !== null && this.digimonForm.value.name !== undefined &&
      this.digimonForm.value.level !== null && this.digimonForm.value.level !== undefined &&
      this.digimonForm.value.image !== null && this.digimonForm.value.image !== undefined) {

      const nuevoDigimon: Digimon = this.crearDigimon(this.digimonForm.value.name, this.digimonForm.value.level, this.digimonForm.value.image);
      console.log(nuevoDigimon);
      this.enviarDigimon(nuevoDigimon)
      this.dialogRef.close(nuevoDigimon);
    } else {
      console.error("Error al crear Digimon")
    }

  }

}
