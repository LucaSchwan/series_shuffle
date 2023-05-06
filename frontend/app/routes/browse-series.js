import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class BrowseSeriesRoute extends Route {
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
  
}
