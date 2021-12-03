import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class IndexRoute extends Route {
  @service store;
  @service notify;

  async model() {
    try {
      return await this.store.findAll('series');
    } catch (e) {
      return false;
    }
  }

  afterModel(model) {
    if (model == false) {
      this.notify.info('Server Connection Error');
    }
  }

  setupController(controller, model) {
    controller.set('seriesList', model);
    controller.set('searchResults', model);
  }
}
