import Model, { attr, belongsTo } from '@ember-data/model';

export default class SeasonModel extends Model {
  @attr('number') number;
  @attr('string') title;
  @attr('number') episodes;
  @belongsTo('series') series;
}
