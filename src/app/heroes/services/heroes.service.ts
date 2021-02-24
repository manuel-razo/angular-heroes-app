import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../interfaces/heroes.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private urlBase: string = environment.baseUrlHeroes;

  constructor(private http: HttpClient) { }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.urlBase}/heroes`);
  }

  getHeroe(id: String): Observable<Hero> {
    return this.http.get<Hero>(`${this.urlBase}/heroes/${id}`);
  }

  getSugerencias(termino: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.urlBase}/heroes?q=${termino}&_limit=6`);
  }

  agregarHeroe(heroe: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.urlBase}/heroes`, heroe);
  }

  editarHeroe(heroe: Hero): Observable<Hero> {
    return this.http.put<Hero>(`${this.urlBase}/heroes/${heroe.id}`, heroe);
  }

  borrarHeroe(id: string): Observable<any> {
    return this.http.delete<any>(`${this.urlBase}/heroes/${id}`);
  }
}
