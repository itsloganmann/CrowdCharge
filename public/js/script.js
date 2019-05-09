$(document).ready(function() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            $("#bell-wrapper").css("display", "initial");
            $("#user-menu-button").css("display", "initial");
            $("#logout-button").click(() => {
                firebase.auth().signOut().then(() => {
                    location.replace("index.html");
                });
            });
        } else {
            $("#login-button-wrapper").css("display", "block");
            $("#login-button-wrapper").on("click", () => {
                $('#overlay').remove();
                $("body").prepend("<div id='overlay'></div>")
                $('#firebaseui-auth-container').css("display", "block");
            });
            $("#login-button-wrapper").css("display", "initial");
        }
    });
    $("body").on("click", "#overlay", () => {
        $('#overlay').remove();
        $('#firebaseui-auth-container').css("display", "none");
    });
});

