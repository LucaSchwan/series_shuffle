import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class LoginController extends Controller {
  @service session;
  @service notify;

  @action
  async authenticate() {
    try {
      await this.session.authenticate(
        'authenticator:token',
        this.username,
        this.password
      );
    } catch (error) {
      this.notify.info('Unable to login');
    }

    if (this.session.isAuthenticated) {
      this.transitionToRoute('index');
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
