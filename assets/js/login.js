(function () {
    // Get Elements
    var txtEmail = $("#txtEmail");
    var txtPassword = $("#txtPassword");
    var btnLogin = $("#btnLogin");
    var btnSignUp = $("#btnSignUp");

    // Add login event
    btnLogin.on("click", e => {
        // Get email and pass
        const email = txtEmail.val();
        const pass = txtPassword.val();
        const auth = firebase.auth();
        // Sign in
        const promise = auth.signInWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    // Add signup event
    btnSignUp.on("click", e => {
        // Get email and pass
        const email = txtEmail.val();
        const pass = txtPassword.val();
        const auth = firebase.auth();
        // Sign in
        const promise = auth.createUserWithEmailAndPassword(email, pass);
        promise.catch(e => console.log(e.message));
    });

    firebase.auth().onAuthStateChanged(firebaseUser => {
        if (firebaseUser) {
            window.location = "index.html";
        }

    });

}());
