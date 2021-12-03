import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AddSeriesRoute extends Route {
  @service session;
  @service notify;
  @service store;

  async model() {
    try {
      return await this.store.findAll('series');
    } catch (e) {
      return false;
    }
  }

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'add-series');
  }

  afterModel(model) {
    if (model == false) {
      this.notify.info('Server Connection Error');
    }
  }

  setupController(controller, model) {
    controller.set('savedSeries', model);
  }
}
