import JSONAPIAdapter from '@ember-data/adapter/json-api';
import { underscore } from '@ember/string';

export default class ApplicationAdapter extends JSONAPIAdapter {
  host = 'http://127.0.0.1:9000';
  namespace = 'api';
}
