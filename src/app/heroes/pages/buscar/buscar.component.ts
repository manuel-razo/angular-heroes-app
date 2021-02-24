import { Component, OnInit } from '@angular/core';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Hero } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: [
  ]
})
export class BuscarComponent implements OnInit {
  termino: string = '';
  heroes: Hero[] = [];
  heroeSeleccionado!: Hero | undefined;

  constructor(private heroesService: HeroesService) { }

  ngOnInit(): void {
  }

  buscando(){
    this.heroesService.getSugerencias(this.termino.trim()).subscribe(resp => this.heroes = resp);
  }

  opcionSeleccionada(event: MatAutocompleteSelectedEvent){
    const heroe: Hero = event.option.value;
    this.termino = heroe.superhero;

    this.heroesService.getHeroe(heroe.id!).subscribe(resp => this.heroeSeleccionado = resp);
  }
}
