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

	// //Create a train object
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
	}); //This is the end of the click function

	// Retrieve trains from the train database
	database.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
	// database.ref().on("child_added", function(snapshot, prevChildKey) {
		
		//Store snapshot.val() into a variable
		var sv = snapshot.val();

		//Pull trainObject back from Firebase to append it to the form on top
		trainObject = sv.trainObject;
		
		var trainName = trainObject.name;
		var trainDestination = trainObject.destination;
		var firstTrainTime = trainObject.firstTrain;
		var trainFrequency = trainObject.frequency;
	
	
		//Append in rows to the html page
			var row = $("<tr>");
			row.append("<td>" + trainName);
			row.append("<td>" + trainDestination);
			row.append("<td>" + firstTrainTime);
			row.append("<td>" + trainFrequency);
			$("#currentTrainSchedule tbody").append(row);
		
	}), function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
};
	// Calculate when the next train will arrive; this should be relative to the current time.
		// Using moment.js formatting to set difference in minutes
		var differenceTimes = moment().diff(moment.unix(firstTrainTime), "minutes");
		var 



})
