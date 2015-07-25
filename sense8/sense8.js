//init the database which will hold all of the time series data
// Each sample is a JSON element that holds the sensor values at a given time.


Samples = new Mongo.Collection("Samples");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);
  Meteor.subscribe("Samples");
  Template.home.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.home.events({
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
      console.log(".")
      theData = {'s1' : parseInt(this.request.body.s1),
              's2' : parseInt(this.request.body.s2),
              's3' : parseInt(this.request.body.s3),
              's4' : parseInt(this.request.body.s4),
              's5' : parseInt(this.request.body.s5),
              's6' : parseInt(this.request.body.s6),
              's7' : parseInt(this.request.body.s7),
              's8' : parseInt(this.request.body.s8)
            };
      Samples.insert(theData)

      this.response.writeHead(200, {'Content-Type': 
                                    'application/json; charset=utf-8'});
      this.response.end(JSON.stringify(theData));
    }
  });
});

Router.route('/home');