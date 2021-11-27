import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class AddSeriesRoute extends Route {
  @service session;
  @service store;

  async model() {
    return await this.store.findAll('series');
  }
  
  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  setupController(controller, model) {
    controller.set('seriesList', model);
  }
 }
