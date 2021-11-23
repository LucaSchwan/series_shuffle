import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';

export default class IndexRoute extends Route {
  store = service();

  model() {
    const store = this.store;
    return store.findAll('series');
  }
}
