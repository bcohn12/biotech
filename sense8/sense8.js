//init the database which will hold all of the time series data
// Each sample is a JSON element that holds the sensor values at a given time.
Samples = new Mongo.Collection("Samples");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Meteor.subscribe("Samples");
  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.SensorNow.helpers({
    sensor: function() {
      return Samples.findOne();
    }
  });
}

if (Meteor.isServer) {
   Meteor.publish("tasks", function () {
    return Tasks.find({});
  });
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

Router.map(function () {
  this.route('serverFile', {
    path: '/receive/',
    where: 'server',

    action: function () {
      var filename = this.params.filename;
      console.log(JSON.stringify(this.request.body, null, 2))
      console.log("I got something!")
      resp = {var1 : this.request.body.var1,
              time : new Date()};
      Samples.insert(resp)
      this.response.writeHead(200, {'Content-Type': 
                                    'application/json; charset=utf-8'});
      this.response.end(JSON.stringify(resp));
    }
  });
});