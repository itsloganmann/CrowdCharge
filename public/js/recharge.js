// Highlight specified recharge amount and activates recharge button.
$('.balance-button').on('click', (e) => {
    $('.balance-button').removeClass('balance-button-selected')
    e.target.className += ' balance-button-selected';
    $('#recharge-button').removeAttr('disabled');
    $('#recharge-button').removeClass('disabled-button');
});

// Creates confirmation popup for recharging.
$('#recharge-button').on('click', (e) => {
    if ($('.balance-button-selected').length > 0) {
        let amount = $('.balance-button-selected').html().replace(/^\$+/, '');
        createPopup();
        createPopupHeader('h3', 'Confirmation', 'recharge-popup-header');
        createPopupHeader('h5', 'You have selected a balance of <b>$' + amount + '</b> to recharge. Do you wish to continue?', 'recharge-popup-subheader');
        createPopupConfirmButton('recharge-confirm', 'Confirm');
        createPopupCancelButton("popup-cancel", "Cancel");
    }
});

// After clicking confirmation button for recharging, redirects to Stripe Checkout.
$('body').on('click', '#recharge-confirm', async (e) => {
    let amount = $('.balance-button-selected').html().replace(/^\$+/, '');
    amount = parseFloat(amount) * 100; // Stripe uses cents instead of dollars

    const response = await fetch('/create-checkout-session', {
        method: "POST",
        body: JSON.stringify({ amount: amount }),
        headers: {
            'content-type': 'application/json',
            'Authorization': 'Bearer ' + jwt
        }
    })
    const session = await response.json();

    const stripe = Stripe('pk_test_51NWQUFJDvNhYRqstHSerYpzi09bxUZMkis3qjgfNFYhwq4gK0d4ncQoF9zYSMWP062nWpJFNYkgTH3insQR65L4J00HvLec1K9');

    const { error } = await stripe.redirectToCheckout({
        sessionId: session.id,
    });

    if (error) {
        console.error('Error:', error);
    }
});