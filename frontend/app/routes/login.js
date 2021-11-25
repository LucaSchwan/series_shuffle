import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class LoginRoute extends Route {
  @service session;
  @tracked username;
  @tracked password;
  @tracked errorMessage;

  beforeModel(transition) {
    this.session.prohibitAuthentication('index');
  }
}
