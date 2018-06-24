export default class Subscription {
  static nextId = 0;

  constructor(name, costs, active = true) {
    this.id = Subscription.nextId++;
    this.name = name;
    this.costs = costs;
    this.active = active;
  }
}
