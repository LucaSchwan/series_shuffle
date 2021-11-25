import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { underscore } from '@ember/string';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ApplicationAdapter extends JSONAPIAdapter {
  @service session;
  host = 'http://127.0.0.1:9000';
  namespace = 'api';

  @computed('session.data.authenticated.access_token')
  get headers() {
    let headers = {};
    if (this.session.isAuthenticated) {
      // OAuth 2
      headers['Authorization'] = 'Token' + this.session.data.authenticated.access_token;
    }

    return headers;
  }
}
