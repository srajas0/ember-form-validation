import Component from '@ember/component';
import { computed } from '@ember/object';

export default Component.extend({
  isFocusdOutError: false,
  errorMessage: computed(`value`, 'showError', 'isFocusdOutError', {
    get() {
      if (this.showError || this.isFocusdOutError) {
        return this.model.validations.attrs[this.name].message;
      } else {
        return null;
      }
    },
    set(key, value) {
      return value;
    }
  }),
  actions: {
    focusedOut() {
      this.set('isFocusdOutError', true);
    }
  }
});
