import { Component, Input, OnInit, input } from '@angular/core';
import { Pokemon, PokemonItem } from '../../core/interfaces/pokemon';
import { Observable } from 'rxjs';
import { PokemonService } from '../../core/services/pokemon.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-pokemon-item',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './pokemon-item.component.html',
  styleUrl: './pokemon-item.component.css'
})
export class PokemonItemComponent implements OnInit {
  public pokemonDetail$!: Observable<PokemonItem>;
  constructor(private service: PokemonService) { }

  @Input() pokemonInfo: Pokemon;

  pokemonData?: PokemonItem;

  ngOnInit(): void {
    this.service.getPokemonInfo(this.pokemonInfo.name).subscribe(
      {
        next: (pokeData: PokemonItem) => {
          console.log(pokeData);
          this.pokemonData = pokeData;
        },
        error: (err) => {
          console.log(err)
        }
      }
    )
  }
}
