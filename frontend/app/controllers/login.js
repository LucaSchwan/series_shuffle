import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class LoginController extends Controller {
  @service session;

  @action
  async authenticate() {
    try {
      await this.session.authenticate('authenticator:token', this.username, this.password);
    } catch(error) {
      this.errorMessage = error.error || error;
    }

    if (this.session.isAuthenticated) {
      this.transitionToRoute('addSeries');
    }
  }

  @action
  updateUsername(e) {
    this.set('username', e.target.value);
  }
  
  @action
  updatePassword(e) {
    this.set('password', e.target.value);
  }
}
