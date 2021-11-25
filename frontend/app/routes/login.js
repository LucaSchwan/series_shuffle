import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class LoginRoute extends Route {
  @service session;
  @tracked username;
  @tracked password;

  beforeModel(transition) {
    this.get('session').prohibitAuthentication('index');
  }
}
