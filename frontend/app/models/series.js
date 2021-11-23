import Model, { attr, hasMany } from '@ember-data/model';

export default class SeriesModel extends Model {
  @attr('string') title;
  @attr('date') created_at;
  @attr('string') description;
  @hasMany('season') seasons;
}
