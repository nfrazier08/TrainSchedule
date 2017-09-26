$(document).ready(function(){

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

	//Button click
	$("#addTrainBtn").on("click", function(event){
		event.preventDefault();

	//then update the html + update the Firebase database
		var	trainName = $("#trainNameInput").val().trim();
		var	trainDestination = $("#destinationInput").val().trim();
		var firstTrainTime = $("#firstTrainInput").val().trim();
		var	trainFrequency = $("#frequencyInput").val().trim();

	//Clear form for next train entry
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#firstTrainInput").val("");
		$("#frequencyInput").val("");

	//Create a train object
		var trainObject = {
			name: trainName,
			destination: trainDestination,
			firstTrain: firstTrainTime,
			frequency: trainFrequency
		}
		
		//Push to firebase
		database.ref().push({
			trainObject,
			dateAdded: firebase.database.ServerValue.TIMESTAMP
		});

		// console.log(trainName);
		// console.log("User first train time " + firstTrainTime);
		// console.log(frequency);

	}); //This is the end of the click function

	// Retrieve trains from the train database
	//TODO: Learn why this code works? Pulled from EDM assignment
	database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
		// database.ref().on("child_added", function(snapshot, prevChildKey) {
	//Store snapshot.val() into a variable
			var sv = snapshot.val();
		//Append in rows to the html page
			var row = $("<tr>");
			row.append("<td>" + snapshot.val().trainName);
			row.append("<td>" + snapshot.val().destination);
			row.append("<td>" + snapshot.val().frequency);
			$("#currentTrainSchedule tbody").append(row);

		//Add frequency (min) to the first train time using moment.js
		// var theFutureTime = moment().hour('12').minute('44').add(4,'hours').format("HH:mm");
		// var nextArrival = moment.duration(frequency + firstTrainTime);
		// console.log(nextArrival + " nA");

	
		
	}), function(errorObject) {
      console.log("Errors handled: " + errorObject.code);

  };
	// Calculate when the next train will arrive; this should be relative to the current time.
		// Using moment.js formatting to set difference in months.


// 
})
