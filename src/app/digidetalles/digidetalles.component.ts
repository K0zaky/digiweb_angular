import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Digimon } from '../models/digimon.model';
import { ApiService } from '../service/api.service';

@Component({
  selector: 'app-digidetalles',
  templateUrl: './digidetalles.component.html',
  styleUrls: ['./digidetalles.component.css']
})
export class DigidetallesComponent implements OnInit {
  digimon: Digimon | undefined;

  constructor(private route: ActivatedRoute, private apiService: ApiService) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const name = params.get('name');
      if (name) {
        this.apiService.getData().subscribe((data: Digimon[]) => {
          this.digimon = data.find(digimon => digimon.name == name);
          if (!this.digimon) {
            console.error(`No se encontró ningún digimon con el nombre '${name}'.`);
          }
        });
      } else {
        console.error('No se proporcionó ningún nombre de digimon.');
      }
    });
  }
}
