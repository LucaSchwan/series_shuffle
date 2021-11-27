import Controller from '@ember/controller';
import { action } from "@ember/object";
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AddSeriesController extends Controller {
  @service store;
  @service notify;
  @tracked search;
  @tracked seriesSet;
  @tracked seriesList;

  @action
  updateSearch(e) {
    this.set('search', e.target.value);
  }

  @action
  async searchSeries() {
    let response = await fetch('http://127.0.0.1:9000/api/add-series/search/' + this.search);
    response = await response.json();
    this.set('seriesSet', response.data);
    this.set('seriesSet', this.seriesSet.map((series) => {
      series.exists = this.seriesExists(series);
      return series;
    }));
  }

  @action
  async createSeries(id) {
    let response = await fetch('http://127.0.0.1:9000/api/add-series/create/' + id, {
      method: 'POST'
    });
    response = await response.json();
    response = response.data;
    this.notify.info(response.message);
  }

  seriesExists(series) {
    if(this.seriesList.filter(testSeries => testSeries.title == series.show.name).length != 0) {
       return true;
    } else {
       return false;
    }
  }
}
