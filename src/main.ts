import { PokeApiService } from "./services/PokeApiService";
import { BoxService } from "./services/BoxService";
import { TerminalController } from "./controllers/TerminalController";

async function main() {
  // 1. cria os serviços (as dependências)
  const api = new PokeApiService();
  const box = new BoxService();

  // 2. injeta os serviços no controller
  const controller = new TerminalController(api, box);

  // 3. inicia a aplicação
  await controller.iniciar();
}

main();
