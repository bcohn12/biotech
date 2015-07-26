//init the database which will hold all of the time series data
// Each sample is a JSON element that holds the sensor values at a given time.




Samples = new Mongo.Collection("Samples");

if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('threshold', 200);
  Meteor.subscribe("Samples");
  Template.home.helpers({
    counter: function () {
      return Session.get('threshold');
    }
  });

  Template.home.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });

  Template.SensorNow.helpers({
    mostRecentSensor: function(Num) {
      var len = Samples.find().count()
      var TimeSlice = Samples.find().fetch()
      var LastOne = TimeSlice[len-1]
      var oneMoment = LastOne.moment
      return Math.abs(oneMoment[Num]);
    },
    sumSensorsNow: function() {
      var len = Samples.find().count()
      var TimeSlice = Samples.find().fetch()
      var lastOne = TimeSlice[len-1]
      var oneMoment = lastOne.moment
      var res = _(oneMoment).map(function(n){ return Math.abs(n); });
      return res.reduce(function(pv, cv) { return pv + cv; }, 0);
    },
    sumOverThreshold: function() {
      var len = Samples.find().count()
      var TimeSlice = Samples.find().fetch()
      var lastOne = TimeSlice[len-1]
      var oneMoment = lastOne.moment
      var res = _(oneMoment).map(function(n){ return Math.abs(n); });
      var SUM = res.reduce(function(pv, cv) { return pv + cv; }, 0);
      if (SUM>Session.get('threshold')) {return true} else{return false};
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
      theData = {'moment': [parseInt(this.request.body.s1),
                           parseInt(this.request.body.s2),
                           parseInt(this.request.body.s3),
                           parseInt(this.request.body.s4),
                           parseInt(this.request.body.s5),
                           parseInt(this.request.body.s6),
                           parseInt(this.request.body.s7),
                           parseInt(this.request.body.s8)]
            };
      Samples.insert(theData)

      this.response.writeHead(200, {'Content-Type': 
                                    'application/json; charset=utf-8'});
      this.response.end(JSON.stringify(theData));
    }
  });
});

Router.route('/home');