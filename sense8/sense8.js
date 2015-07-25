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

Router.onBeforeAction(Iron.Router.bodyParser.urlencoded({
    extended: false
}));

Router.map(function () {
  this.route('serverFile', {
    path: '/receive/',
    where: 'server',

    action: function () {
      var filename = this.params.filename;
      console.log("===========Begin=============");
      console.log("Here is the request");
      console.log(JSON.stringify(this.request));
      // console.log("Here is the request.body");
      // console.log(this.request.body.var1);
      // console.log("Here is 'this'")
      // console.log(this)
      // console.log("Here is this.response")
      // console.log(this.response)
      console.log("===========End=============");
      resp = {var1 : this.request.body.var1,
              time : new Date()};
      Samples.insert(resp)
      this.response.writeHead(200, {'Content-Type': 
                                    'application/json; charset=utf-8'});
      this.response.end(JSON.stringify(resp));
    }
  });
});