import { PokemonResumo } from "../models/Pokemon";

export class CatalogoPokemon {
    private pokemons: PokemonResumo[];

    constructor(pokemonsIniciais: PokemonResumo[] = []) {
        this.pokemons = pokemonsIniciais;
    }

    adicionar(pokemon: PokemonResumo): void {
        const jaExiste = this.pokemons.some((p) => p.id === pokemon.id);

        if (jaExiste) {
            console.log(`[AVISO] ${pokemon.nome} já está no catálogo.`);
            return;
        }

        this.pokemons.push(pokemon);
        console.log(`[OK] ${pokemon.nome} adicionado ao catálogo.`);
    }

    listar(): void {
        if (this.pokemons.length === 0) {
            console.log("[AVISO] Catálogo vazio.");
            return;
        }

        this.pokemons.forEach((pokemon) => {
            console.log(
                `#${pokemon.id} - ${pokemon.nome} | Tipos: ${pokemon.tipos.join(", ")} | Altura: ${pokemon.altura} | Peso: ${pokemon.peso} | HP: ${pokemon.hp} | Ataque: ${pokemon.ataque} | Defesa: ${pokemon.defesa}`
            );
        });
    }

    remover(id: number): void {
        const existe = this.pokemons.some((p) => p.id === id);

        if (!existe) {
            console.log(`[AVISO] Pokémon com ID ${id} não encontrado no catálogo.`);
            return;
        }

        this.pokemons = this.pokemons.filter((p) => p.id !== id);
        console.log(`[OK] Pokémon com ID ${id} removido do catálogo.`);
    }

    obterTodos(): PokemonResumo[] {
        return this.pokemons;
    }
}
