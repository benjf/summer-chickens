import { Mongo } from 'meteor/mongo';

// the tasks
export const SummerChickens = new Mongo.Collection('summer_chickens');

// records of task completion
export const RoostedChickens = new Mongo.Collection('roosted_chickens');
