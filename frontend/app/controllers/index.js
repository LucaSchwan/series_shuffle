import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  store = service();
  pickedSeries;
  seasons;

  @action
  valueChanged(series) {
    this.set('pickedSeries', series);
  }

  @action
  async shuffle() {
    this.set('seasons', await this.pickedSeries.seasons);
  }
}
