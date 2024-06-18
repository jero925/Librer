import { Component, OnInit } from '@angular/core';
import { PokemonService } from '../../core/services/pokemon.service';
import { Observable } from 'rxjs';
import { PokemonResults } from '../../core/interfaces/pokemon';
import { AsyncPipe } from '@angular/common';
import { PokemonItemComponent } from '../pokemon-item/pokemon-item.component';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [AsyncPipe, PokemonItemComponent],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.css'
})
export class PokemonListComponent implements OnInit{
  public pokemonResults$!: Observable<PokemonResults>;
  constructor(private service: PokemonService) {}

  ngOnInit(): void {
      this.pokemonResults$ = this.service.getPokemonList()
  }
}
