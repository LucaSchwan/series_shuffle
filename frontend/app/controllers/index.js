import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @service store;
  @tracked pickedSeries;
  @tracked seriesList;
  @tracked searchResults;
  @tracked randomSeason;
  @tracked randomEpisode;

  @action
  selectSeries(series, dropdown) {
    this.set('pickedSeries', series);
    dropdown.actions.close();
  }

  @action
  updateSeries(e) {
    let searchQuery = e.target.value;
    if (searchQuery == '') {
      this.set('searchResults', this.seriesList);
    } else {
      this.set(
        'searchResults',
        this.seriesList.filter((series) => {
          return series.get('title').toLowerCase().includes(searchQuery.toLowerCase());
        })
      );
    }
  }

  @action
  async shuffle() {
    let [randomSeason, randomEpisode] = this.getRandomSeasonAndEpisode(
      await this.pickedSeries.seasons
    );
    this.set('randomSeason', randomSeason);
    this.set('randomEpisode', randomEpisode);
  }

  getRandomSeasonAndEpisode(seasons) {
    let randomSeason = seasons.objectAt(
      Math.floor(Math.random() * seasons.length)
    );
    let randomEpisode = Math.floor(Math.random() * randomSeason.episodes);
    return [randomSeason.number, randomEpisode];
  }
}
