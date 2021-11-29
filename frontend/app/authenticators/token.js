import Base from 'ember-simple-auth/authenticators/base';
import Ember from 'ember';

export default class CustomAuthenticator extends Base {

  async restore(data) {
    let { token } = data;
    if (token) {
      return data;
    } else {
      throw 'no valid session data';
    }
  }

  async authenticate(username, password) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

    var urlencoded = new URLSearchParams();
    urlencoded.append('username', username);
    urlencoded.append('password', password);

    let payload = {
      username: username,
      password: password,
    };

    let data = new FormData();
    data.append('json', JSON.stringify(payload));

    let response = await fetch('http://127.0.0.1:9000/api/login', {
      method: 'POST',
      header: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: urlencoded,
    });

    if (response.ok) {
      return response.json();
    } else {
      let error = await response.text();
      throw new Error(error);
    }
  }

  invalidate(data) {
    return Ember.RSVP.resolve();
  }
}
