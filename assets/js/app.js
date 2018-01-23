(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyA4NKmaHwDyPus-t7GjurycSv-Hq0segDA",
        authDomain: "soundaily-c40bc.firebaseapp.com",
        databaseURL: "https://soundaily-c40bc.firebaseio.com",
        projectId: "soundaily-c40bc",
        storageBucket: "soundaily-c40bc.appspot.com",
        messagingSenderId: "101300747492"
    };
    firebase.initializeApp(config);

    // Hide 'Add data' form if user not logged in
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            $("#addFileData").removeClass("hide");
            console.log("userid: " + firebaseUser.uid);
        } else {
            $("#addFileData").addClass("hide");
        }
    });

    // Loading
    var loading = $("#soundsContainer .loading");

    // Show sounds
    var soundsContainer = $("#soundsContainer");
    const dbRefSounds = firebase.database().ref().child("sounds");
    dbRefSounds.orderByKey().once("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {
            var childData = childSnapshot.val();

            // Add soundlink
            var soundLink = "https://firebasestorage.googleapis.com/v0/b/soundaily-c40bc.appspot.com/o/sounds%2F" + childData.userid + "%2F" + childData.uploadtime + childData.name + "?alt=media";

            // Add soundplayer
            var soundPlayer = "<audio controls class='soundPlayer' src='" + soundLink + "'></audio>";

            // Add sound download link
            var soundLink = "<a href=" + soundLink + ">Download</a> - upload by " + childData.username;

            soundsContainer.append("<div class='sound'>" + soundPlayer + soundLink + "</div>");
        });
        loading.hide();
    });

    // Add file data
    function addFileData(userId, userName, time, fileName) {
        const dbRefRoot = firebase.database().ref();
        var filesRef = dbRefRoot.child("sounds");
        // Create a new ref and log it’s push key
        var fileRef = filesRef.push();
        // Create a new ref and save data to it in one step
        var fileRef = filesRef.push({
            userid: userId,
            username: userName,
            uploadtime: time,
            name: fileName
        });
    }

    // Upload file
    var uploader = $("#addFileData #uploader");
    var btnUpload = $("#addFileData #btnUpload");
    btnUpload.on("change", function (e) {
        firebase.auth().onAuthStateChanged(firebaseUser => {
            var userId = firebaseUser.uid;
            var userName = firebaseUser.email;
            if (firebaseUser) {

                // Generate random number
                var dt = new Date();
                var time = dt.getHours() + "" + dt.getMinutes() + "" + dt.getSeconds() + "" + dt.getMilliseconds();

                // Get file
                var file = e.target.files[0];

                // Create the file metadata
                var metadata = {
                    contentType: "sound/mp3"
                };

                // Create a storage ref
                var storageRef = firebase.storage().ref("sounds/" + userId + "/" + time + file.name.replace(/\s/g, ''));

                // Upload file
                var task = storageRef.put(file, metadata);

                // Update progress bar
                task.on("state_changed", function progress(snapshot) {
                        var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + percentage + '% done');
                        uploader.val(percentage);
                    },
                    function error(err) {

                    },
                    function complete() {
                        addFileData(userId, userName, time, file.name.replace(/\s/g, ''));
                    });
            }
        });
    });

}());
