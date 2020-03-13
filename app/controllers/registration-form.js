import Controller from '@ember/controller';

export default Controller.extend({
  showError: false,
  actions: {
    reset(model) {
      model.rollbackAttributes();
    },
    submit(model) {
      this.set('showError', true);
      
      if (model.get('validations').isValid) {
        this.model.save();
      }      
    }
  }
});
