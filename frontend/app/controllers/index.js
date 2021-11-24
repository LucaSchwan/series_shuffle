import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class IndexController extends Controller {
  @service store;
  pickedSeries;
  @tracked randomSeason;
  @tracked randomEpisode;

  @action
  valueChanged(series) {
    this.set('pickedSeries', series);
  }

  @action
  async shuffle() {
    let [ randomSeason, randomEpisode ] = this.getRandomSeasonAndEpisode( await this.pickedSeries.seasons);
    this.set('randomSeason', randomSeason);
    this.set('randomEpisode', randomEpisode);
  }

  getRandomSeasonAndEpisode(seasons) {
    let randomSeason = seasons.objectAt(Math.floor(Math.random() * seasons.length));
    let randomEpisode = Math.floor(Math.random() * randomSeason.episodes);
    return [ randomSeason.number, randomEpisode ];
  }

}
