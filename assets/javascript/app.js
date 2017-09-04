// $(document).ready(function(){

// Steps to complete:
	// Get Firebase Started:
	var config = {
	    apiKey: "AIzaSyCWHHimgpnwRjKXNFDnoGyzQ7wlMaJu-Rk",
	    authDomain: "train-scheduler-2d78c.firebaseapp.com",
	    databaseURL: "https://train-scheduler-2d78c.firebaseio.com",
	    projectId: "train-scheduler-2d78c",
	    storageBucket: "",
	    messagingSenderId: "451731791479"
  	};

	firebase.initializeApp(config);

	var database = firebase.database();



	// Make button for adding new trains
		// Initial Values
		    var trainName = "";
		    var destination = "";
		    var nextArrival = "";
		    var frequency = "";

		//TODO: Find a way to empty the previous entries on the DOM

		//Button click
		$("#add-train-btn").on("click", function(event){
			event.preventDefault();

		//then update the html + update the Firebase database
		trainName = $("#train-name-input").val().trim();
		destination = $("#destination-input").val().trim();
		// nextArrival = moment($("#next-arrival-input").val().trim(), 'HH:mm a').format("LT");
		frequency = moment($("#frequency-input").val().trim(),"mm").format("LT");
			
		//Push to firebase
		database.ref().push({
			"trainName" : trainName,
			"destination" : destination,
			"nextArrival" : nextArrival,
			"frequency" : frequency,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
			});

		console.log(trainName);

		//Clear form for next train entry
		  // Clears all of the text-boxes
		  $("#train-name-input").val("");
		  $("#destination-input").val("");
		  $("#next-arrival-input").val("");
		  $("#frequency-input").val("");
	});

	// Retrieve trains from the train database
	//TODO: Learn why this code works? Pulled from EDM assignment
	database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
		//Store snapshot.val() into a variable
			var sv = snapshot.val();
		//Append in rows to the html page
			var row = $("<tr>");
			row.append("<td>" + snapshot.val().trainName);
			row.append("<td>" + snapshot.val().destination);
			row.append("<td>" + snapshot.val().frequency);
			$("#currentTrainSchedule tbody").append(row);

		//Change user time inputs so all time displays in minutes
		// var trainTimeFormat = moment.unix().format("HH:mm a");
		// var frequencyFormat = moment.unix().format("mm");

		//Calculate in minutes when the next train will arrive
			//From the time and frequency the user inputs
		// var minutesTilNextTrain = moment(trainTimeFormat).add

	
		
	}, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

  });
	// Calculate when the next train will arrive; this should be relative to the current time.
		// Using moment.js formatting to set difference in months.


// 
// })
