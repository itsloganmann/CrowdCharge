$(document).ready(function() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            $("#logout-button").css("display", "block");
            $("#logout-button").click(() => {
                firebase.auth().signOut().then(() => {
                    location.replace("index.html");
                });
            });
        } else {
            $("#login-button").css("display", "block");
            $("#login-button").on("click", () => {
                $('#firebaseui-auth-container').css("display", "block");
            });
        }
    });
});
