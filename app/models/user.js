import DS from 'ember-data';
import { assign } from '@ember/polyfills';
import { validator, buildValidations } from 'ember-cp-validations';

const models = [
  {
    modelAttr: "name",
    presence: true,
    regexp: /^[a-zA-Z]+$/,
    formatErrorMessage: 'The name field should have alphabets only',
    minLength: 2,
    lengthErrorMessage: 'Name should have atleast two characters'
  },
  {
    modelAttr: "email",
    presence: true,
    regexp: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    formatErrorMessage: 'The email is not valid format'
  },
  {
    modelAttr: "mobileNumber",
    presence: true,
    regexp: /^[0-9]+$/,
    formatErrorMessage: 'The mobileNumber field should have alphabets only',
    minLength: 2,
    maxLength: 10,
    lengthErrorMessage: 'Mobile Number should be 2 - 10 numbers only'
  }
]

const buildValidation = {};
// iterating the models json and set each validator for a model
models.forEach(model => {
  buildValidation[model.modelAttr] = {
    validators: [
      validator('presence', {
        presence: model.presence,
        message: `${model.modelAttr} is required`
      }),
      validator('format', {
        regex: model.regexp,
        message: model.formatErrorMessage
      }),
      validator('length', {
        min: model.minLength,
        max: model.maxLength,
        message: model.lengthErrorMessage
      })
    ]
  };
});

const Validations = buildValidations(assign({}, buildValidation));

export default DS.Model.extend(Validations, {
  name: DS.attr('string'),
  email: DS.attr('string'),
  mobileNumber: DS.attr('string')
});
