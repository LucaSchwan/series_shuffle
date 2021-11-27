import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IndexRoute extends Route {
  @service store;
  @tracked seriesList;

  async model() {
    return await this.store.findAll('series');
  }

  setupController(controller, model) {
    controller.set('seriesList', model);
    controller.set('searchedList', model);
  }
}
