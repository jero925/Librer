import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pokemon, PokemonItem, PokemonResults } from '../interfaces/pokemon';
import { environment } from '../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  constructor(private http: HttpClient) { }

  getPokemonList(): Observable<PokemonResults> {
    return this.http.get<PokemonResults>(`${environment.pokedexURLBase}/pokemon?limit=10&offset=0`)
  }

  getPokemonInfo(pokemon: number | string): Observable<PokemonItem> {
    return this.http.get<PokemonItem>(`${environment.pokedexURLBase}/pokemon/${pokemon}`)
  }
}
