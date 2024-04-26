import { Injectable } from '@angular/core';
import { Digimon } from './../models/digimon.model';

@Injectable({
  providedIn: 'root'
})

export class SharedDigimonService {
  private digimon: Digimon | undefined;
  private editedDigimon: Digimon | undefined;
  private data: Digimon[] | undefined;
  constructor() { }

  setDigimon(digimon: Digimon) {
    this.digimon = digimon;
  }

  getDigimon(): Digimon | undefined {
    return this.digimon;
  }

  setEditedDigimon(editedDigimon: Digimon) {
    this.editedDigimon = editedDigimon;
  }

  getEditedDigimon(): Digimon | undefined {
    return this.editedDigimon;
  }

  clearDigimon(): void{
    this.digimon = undefined;
    this.editedDigimon = undefined;
  }

  setData(data: Digimon[]) {
    this.data = data;
  }

  getData(): Digimon[] | undefined {
    return this.data;
  }

  getDigimonByName(digimon: Digimon){
    return digimon.name;
  }

}
