$(document).ready(function() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            $("#browserMenu-button").css("display", "initial");
            $("#bell-icon").css("display", "initial");
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

