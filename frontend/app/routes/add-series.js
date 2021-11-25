import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AddSeriesRoute extends Route {
  @service session;
  @tracked search;
  @tracked series_set;

  beforeModel(transition) {
    this.session.requireAuthentication(transition, 'login');
  }
 }
