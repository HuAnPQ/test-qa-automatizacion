
import { BrowseTheWeb } from './abilities/BrowseTheWeb';

export class Actor {
  private abilities: { [key: string]: any } = {};

  static named(name: string) {
    return new Actor(name);
  }

  private constructor(public readonly name: string) {}

  hasAbilityTo(ability: any) {
    this.abilities[ability.constructor.name] = ability;
    return this;
  }

  whoCan(ability: any) {
    this.hasAbilityTo(ability);
    return this;
  }

  attemptsTo(task: any) {
    task.performAs(this);
  }

  getThe<T>(question: any): T {
    return question.answeredBy(this);
  }

  abilityTo<T>(ability: new (...args: any[]) => T): T {
    const instance = this.abilities[ability.name];
    if (!instance) {
      throw new Error(`Actor "${this.name}" no tiene la habilidad para ${ability.name}.`);
    }
    return instance as T;
  }
}