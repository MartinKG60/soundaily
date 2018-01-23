(function () {
    // Get user data
    // Sync object changes
    //    const dbRefUsers = firebase.database().ref().child("users");
    //    dbRefUsers.once("value", function (snapshot) {
    //        snapshot.forEach(function (childSnapshot) {
    //            var userData = childSnapshot.val();
    //            console.log(userData);
    //        });
    //    });

    // User realtime listener
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            $("#nav .user").removeClass("hide");
            $("#nav .userInfo").removeClass("hide");
            $("#nav .login").addClass("hide");
            $("#nav .username").html("Welcome back, " + firebaseUser.email);

            var nameInput = $("#updateUserData #name");
            var ageInput = $("#updateUserData #age");
            var btnUpdateUser = $("#updateUserData #btnUpdateUser");
            var user = firebase.auth().currentUser;
            if (user != null) {

                var uid = user.uid;

                // Show user info
                var dbRefUsers = firebase.database().ref().child("users");
                dbRefUsers.once("value", function (snapshot) {
                    snapshot.forEach(function (childSnapshot) {
                        var childData = childSnapshot.val();
                        if (childData.id === uid) {
                            nameInput.val(childData.name);
                            ageInput.val(childData.age);
                        }
                    });
                });

                // Update user info
                btnUpdateUser.on("click", function () {
                    firebase.database().ref('/users/' + uid).set({
                        name: nameInput.val(),
                        age: ageInput.val(),
                        id: uid
                    });
                });
            }
        } else {
            $("#nav .login").removeClass("hide");
            $("#nav .userInfo").addClass("hide");
            $("#nav .user").addClass("hide");
        }
    });

    var btnLogout = $("#btnLogout");

    // Add signout event
    $("#btnLogout").on("click", function () {
        firebase.auth().signOut();
        window.location = "index.html";
    });

}());
