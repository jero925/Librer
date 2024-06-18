import { Routes } from "@angular/router";
import { PokemonListComponent } from "./pokemon-list/pokemon-list.component";

export const AUTH_ROUTES: Routes = [
    { path: 'pokedex', component: PokemonListComponent}
];