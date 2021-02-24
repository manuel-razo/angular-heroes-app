import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Hero, Publisher } from '../../interfaces/heroes.interface';
import { switchMap } from "rxjs/operators";
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img{
      width: 100%;
      border-radius: 5px;
    }`
  ]
})
export class AgregarComponent implements OnInit {
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    }
  ];

  heroe: Hero = {
    superhero: '',
    publisher: Publisher.DCComics,
    alter_ego: '',
    first_appearance: '',
    characters: '',
    alt_img: ''
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private heroesService: HeroesService,
    private router: Router,
    private snackBar: MatSnackBar,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    if (!this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params.pipe(
      switchMap(params => this.heroesService.getHeroe(params.id))
    ).subscribe(resp => this.heroe = resp);
  }

  guardar() {
    if (this.heroe.superhero.trim().length === 0) {
      return;
    }

    if (this.heroe.id) {
      this.heroesService.editarHeroe(this.heroe).subscribe(resp => this.mostrarSnackbar('Registro actualizado'));
      this.router.navigate(['/heroes/listado']);
    }
    else {
      this.heroesService.agregarHeroe(this.heroe).subscribe(resp => {
        this.router.navigate(['/heroes', resp.id]);
        this.mostrarSnackbar('Registro creado');
      });
    }

  }

  borrar() {
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '250px',
      data: this.heroe
    });

    dialog.afterClosed().subscribe(result => {
      if (result) {
        this.heroesService.borrarHeroe(this.heroe.id!).subscribe(resp => {
          this.router.navigate(['/heroes/listado']);
        });
      }
    });


  }

  mostrarSnackbar(mensaje: string) {
    this.snackBar.open(mensaje, 'OK', {
      duration: 2500
    })
  }
}
;