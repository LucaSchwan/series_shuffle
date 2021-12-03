import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | browse-series', function (hooks) {
  setupTest(hooks);

  test('it exists', function (assert) {
    let route = this.owner.lookup('route:browse-series');
    assert.ok(route);
  });
});
