import { Template } from 'meteor/templating';
import { SummerChickens, RoostedChickens } from '../api/models.js';
import './body.html';

Template.body.helpers({
  chickens() {
    // TODO: pass in a Day, default to today
    return SummerChickens.find({}, {sort: {createdAt: -1}});
  },
  today() {
    myDate = new Date();
    return myDate.toDateString();
  },
  motherHen() {
    return window.location.href.indexOf('motherHen') != -1;
  },
});

Template.body.events({
  'submit .new-chicken'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const chicken_name = target.chicken_name.value;

    // Insert a task into the collection
    SummerChickens.insert({
      name: chicken_name,
      createdAt: new Date(), // current time
    });

    // Clear form
    target.chicken_name.value = '';
  },
  // TODO: store these in another collection? we want to track completion per day
  'click .toggle-silas'() {
    // Set the checked property to the opposite of its current value
    SummerChickens.update(this._id, {
      $set: { silas: ! this.silas },
    });
  },
  'click .toggle-preston'() {
    // Set the checked property to the opposite of its current value
    SummerChickens.update(this._id, {
      $set: { preston: ! this.preston },
    });
  },
  'click .delete'() {
    SummerChickens.remove(this._id);
  },
});
