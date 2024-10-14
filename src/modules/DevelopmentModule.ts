import { IModule } from "../interfaces/IModule"
import { FullDevelopmentRecipe } from "./recipes/FullDevelopmentRecipe"

export class DevelopmentModule implements IModule {
  build() {
    return new FullDevelopmentRecipe().build()
  }
}
