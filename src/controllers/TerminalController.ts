import { PokeApiService } from "../services/PokeApiService";
import { BoxService } from "../services/BoxService";
import { CatalogoPokemon } from "../services/CatalogoPokemon";

export class TerminalController {
  constructor(
    private api: PokeApiService,
    private box: BoxService
  ) {}

  async iniciar(): Promise<void> {
    // 1. Carrega o que estava salvo no arquivo e cria o catálogo com esses dados
    const dadosSalvos = await this.box.carregar();
    const catalogo = new CatalogoPokemon(dadosSalvos);

    // 2. Busca e adiciona alguns Pokémon (demonstração)
    await this.buscarEAdicionar(catalogo, "pikachu");
    await this.buscarEAdicionar(catalogo, "charmander");
    await this.buscarEAdicionar(catalogo, "pikachu"); // duplicado → [AVISO]
    await this.buscarEAdicionar(catalogo, "pokemon-inexistente"); // erro → [ERRO]

    // 3. Lista o catálogo
    console.log("\n--- Catálogo ---");
    catalogo.listar();

    // 4. Remove o #25 e lista de novo
    console.log("\n--- Removendo o #25 ---");
    catalogo.remover(25);
    catalogo.listar();

    // 5. Salva o estado final no pc_box.json
    await this.box.salvar(catalogo.obterTodos());
    console.log("\n[OK] Catálogo salvo em pc_box.json");
  }

  // método auxiliar PRIVADO: encapsula o "buscar + tratar erro + adicionar"
  private async buscarEAdicionar(
    catalogo: CatalogoPokemon,
    nomeOuId: string
  ): Promise<void> {
    try {
      const pokemon = await this.api.buscarPokemon(nomeOuId);
      catalogo.adicionar(pokemon);
    } catch (erro) {
      if (erro instanceof Error) {
        console.log(`[ERRO] ${erro.message}`);
      }
    }
  }
}
