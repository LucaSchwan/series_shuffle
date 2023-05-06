import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class AddSeriesController extends Controller {
  @service store;
  @service notify;
  @tracked searchQuery;
  @tracked searchResults;
  @tracked savedSeries;

  @action
  updateSearch(e) {
    this.set('searchQuery', e.target.value);
  }

  @action
  async searchSeries() {
    if(this.searchQuery != '') {
      try {
        let response = await fetch(
          'http://127.0.0.1:9000/api/add-series/search/' + this.searchQuery
        );
        response = await response.json();
        response = response.data;
        if (response.message) {
          this.notify.info(response.message);
        } else {
          this.set('searchResults', response.map((series) => {
            series.exists = this.seriesExists(series);
            return series;
          }));
        }
      } catch (e) {
        console.log(e);
        this.notify.info('Server Connection Error');
      }
    } else{
      this.notify.info('Enter a search query!');
    }
  }

  @action
  async createSeries(id) {
    try {
      let response = await fetch(
        'http://127.0.0.1:9000/api/add-series/create/' + id,
        {
          method: 'POST',
        }
      );
      response = await response.json();
      response = response.data;
      this.notify.info(response.message);
    } catch (e) {
      this.notify.info('Server Connection Error');
    }
  }

  seriesExists(series) {
    if (
      this.savedSeries.filter(
        (testSeries) => testSeries.title == series.show.name
      ).length != 0
    ) {
      return true;
    } else {
      return false;
    }
  }
}
