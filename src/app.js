// Imports
const path = require('path')
const express = require('express')
const stripe = require('stripe')('sk_test_51NWQUFJDvNhYRqstsiExOGGTfPTpM7AqBxFdXjgFZ6mQ4quW67CtMEwbEXTM9cpiU7EFoaoFlNcAbAdH5KDDkxP800781j2q78'); // Add this line
const userRouter = require('./routers/user')
const bookingRouter = require('./routers/booking')
const chargerRouter = require('./routers/charger')
const pagesRouter = require('./routers/pages')
const clientRouter = require('./routers/client')
const markerRouter = require('./routers/marker')
const hostRouter = require('./routers/host')
const notificationRouter = require('./routers/notification')
const reviewRouter = require('./routers/review')
const hbs = require('hbs')
const auth = require('./middleware/auth')
require('./db/mongoose')

// Variable for the current directory is __dirname.
console.log(__dirname)

// Initializes express and sets up the paths.
const app = express()

// Setup static directory to-serve. Customizes the server, pass in the path that we want to serve, the public folder 
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(publicDirectoryPath))

// Takes a path to the directory for hbs partials.
hbs.registerPartials(partialsPath)

// Get handlebars set up to create dynamic templates.
app.set('view engine', 'hbs')
app.set('views', viewsPath)

// Customizes server, automatically parse incoming json into an object
app.use(express.json())

// Add this block for Stripe Checkout
app.post('/create-checkout-session', auth, async (req, res) => {
    const { amount } = req.body;

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [{
            price_data: {
                currency: 'usd',
                product_data: {
                    name: 'Recharge',
                },
                unit_amount: amount,
            },
            quantity: 1,
        }],
        mode: 'payment',
        success_url: `${req.protocol}://${req.get('host')}/recharge/success/{CHECKOUT_SESSION_ID}?user_id=${req.user._id}`,
        cancel_url: `${req.protocol}://${req.get('host')}/recharge`,
    });

    res.json({ id: session.id });
});

app.get('/recharge/success/:session_id', async (req, res) => {
    const userId = req.query.user._id;
    const sessionId = req.params.session_id;

    // Retrieve the session to make sure the payment was successful
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') {
        // Find the user and update their balance
        const user = await User.findById(userId);
        user.balance += session.amount_total;
        await user.save();

        res.send('Balance updated successfully');
    } else {
        res.send('Payment was not successful');
    }
});

// Sets up environmental variable used for Heroku (port)
const port = process.env.PORT || 3000

// Registers routers, allowing us to refactor routes into separate files
app.use('/client', clientRouter);
app.use('/host', hostRouter)
app.use(userRouter)
app.use('/booking', bookingRouter)
app.use(chargerRouter)
app.use(markerRouter)
app.use(notificationRouter)
app.use(reviewRouter)

// Page router, do not move order, needs to come last.
app.use(pagesRouter)

// Starts up the web server.
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})