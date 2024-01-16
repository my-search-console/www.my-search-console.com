import { IModule } from "../interfaces/IModule"
import { FullDevelopmentRecipe } from "./recipes/FullDevelopmentRecipe"
import { FullLocalRecipe } from "./recipes/FullLocalRecipe"
import { FullProductionRecipe } from "./recipes/FullProductionRecipe"

export class DevelopmentModule implements IModule {
  build() {
    return new FullDevelopmentRecipe().build()
  }
}
