import { IModule } from "../interfaces/IModule"
import { FullProductionRecipe } from "./recipes/FullProductionRecipe"

export class ProductionModule implements IModule {
  build() {
    return new FullProductionRecipe().build()
  }
}
