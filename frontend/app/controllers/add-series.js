import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from "@ember/object";

export default class AddSeriesController extends Controller {
  @service session;

  @action
  logout() {
    this.session.invalidate();
  }


  @action
  updateSearch(e) {
    this.set('search', e.target.value);
  }

  @action
  async searchSeries() {
    let response = await fetch('http://127.0.0.1:9000/api/add-series/search/' + this.search);
    response = await response.json();
    this.set('series_set', response.data);
  }

  @action
  async createSeries(id) {
    let response = await fetch('http://127.0.0.1:9000/api/add-series/create/' + id, {
      method: 'POST'
    });
    response = await response.json();
    console.log(response.data);
  }
}
