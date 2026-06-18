import { readFile, writeFile } from "node:fs/promises";
import { PokemonResumo } from "../models/Pokemon";
import { LocalBoxError } from "../models/CustomErrors";

export class BoxService {
  private caminho = "pc_box.json";

  // Lê o arquivo e devolve a lista de Pokémon
  async carregar(): Promise<PokemonResumo[]> {
    try {
      const conteudo = await readFile(this.caminho, "utf-8");
      return JSON.parse(conteudo) as PokemonResumo[];
    } catch {
      // se o arquivo ainda não existe (1ª execução), começa vazio
      return [];
    }
  }

  // Grava a lista de Pokémon no arquivo
  async salvar(pokemons: PokemonResumo[]): Promise<void> {
    try {
      const conteudo = JSON.stringify(pokemons, null, 2);
      await writeFile(this.caminho, conteudo, "utf-8");
    } catch {
      throw new LocalBoxError("Não foi possível salvar o catálogo no arquivo.");
    }
  }
}
