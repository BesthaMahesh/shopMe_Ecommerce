const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');

// Initialize Firebase Admin (Make sure to download your serviceAccountKey.json from Firebase Console)
// and place it in the \`backend\` folder.
try {
    const serviceAccount = require('./serviceAccountKey.json');
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log('Firebase initialized successfully!');
} catch (error) {
    console.warn('Firebase initialization failed. Make sure you added serviceAccountKey.json.', error.message);
}

const db = admin.firestore();

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parses JSON requests

// Routes

// 1. Get all products (Example API for View All Buttons)
app.get('/api/products', async (req, res) => {
    try {
        const snapshot = await db.collection('products').get();
        if (snapshot.empty) {
            // Return some mock data if Firestore is empty
            return res.json([
                { id: '1', name: 'Product 1', price: 99 },
                { id: '2', name: 'Product 2', price: 199 },
            ]);
        }

        const products = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Failed to fetch products' });
    }
});

// 2. Handle Orders from Popup / Order Buttons
app.post('/api/order', async (req, res) => {
    const { name, email, address } = req.body;

    if (!name || !email || !address) {
        return res.status(400).json({ message: 'Please provide all details (name, email, address)' });
    }

    try {
        // Save to Firebase Firestore
        const docRef = await db.collection('orders').add({
            name,
            email,
            address,
            createdAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log('Received and saved new order:', { id: docRef.id, name, email, address });
        res.status(200).json({ message: 'Order created successfully!', data: { id: docRef.id, name, email, address } });
    } catch (error) {
        console.error('Error saving order:', error);
        res.status(500).json({ message: 'Failed to save order' });
    }
});

// 3. Handle Subscriptions from Subscribe Section
app.post('/api/subscribe', async (req, res) => {
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({ message: 'Email is required to subscribe' });
    }

    try {
        await db.collection('subscriptions').add({
            email,
            subscribedAt: admin.firestore.FieldValue.serverTimestamp()
        });

        console.log(`New subscriber saved: ${email}`);
        res.status(200).json({ message: 'Subscribed successfully!' });
    } catch (error) {
        console.error('Error saving subscriber:', error);
        res.status(500).json({ message: 'Failed to save subscription' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server is running on http://localhost:${PORT}`);
});
