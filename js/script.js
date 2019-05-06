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
                $('#overlay').remove();
                $("body").prepend("<div id='overlay'></div>")
                $('#firebaseui-auth-container').css("display", "block");
            });
        }
    });
    $("body").on("click", "#overlay", () => {
        $('#overlay').remove();
        $('#firebaseui-auth-container').css("display", "none");
    });
});
