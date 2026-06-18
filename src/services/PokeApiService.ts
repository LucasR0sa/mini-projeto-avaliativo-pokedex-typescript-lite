import { APIError } from "../models/CustomErrors";
import { PokemonApiResponse, PokemonResumo } from "../models/Pokemon";


export class PokeApiService {
  async buscarPokemon(nomeOuId: string): Promise<PokemonResumo> {

    const url = `https://pokeapi.co/api/v2/pokemon/${nomeOuId}`;

    const resposta = await fetch(url);

    if (!resposta.ok) {
      throw new APIError(`Pokémon não encontrado: ${nomeOuId}`);
    }

    const dados = (await resposta.json()) as PokemonApiResponse;

    const statHp = dados.stats.find((s) => s.stat.name === "hp");
    const statAtaque = dados.stats.find((s) => s.stat.name === "attack");
    const statDefesa = dados.stats.find((s) => s.stat.name === "defense");

return {
  id: dados.id,
  nome: dados.name,
  tipos: dados.types.map((t) => t.type.name),
  altura: dados.height,
  peso: dados.weight,
  hp: statHp ? statHp.base_stat : 0,
  ataque: statAtaque ? statAtaque.base_stat : 0,
  defesa: statDefesa ? statDefesa.base_stat : 0,
};

  }
}

