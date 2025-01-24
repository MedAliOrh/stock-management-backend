const admin = require("firebase-admin");

// Initialize Firestore Emulator
process.env.FIRESTORE_EMULATOR_HOST = "localhost:8080"; // Specify the Firestore emulator host
admin.initializeApp({
  projectId: "stock-management-local", // Use a dummy project ID for local emulation
});

const db = admin.firestore();

// Fonction pour initialiser la base de données
async function initializeDatabase() {
  try {
    // Ajouter des magasins
    const stores = [
      { id: 'store1', name: 'Magasin A', location: 'Paris', contact: '0123456789' },
      { id: 'store2', name: 'Magasin B', location: 'Lyon', contact: '0987654321' },
    ];

    for (const store of stores) {
      await db.collection('stores').doc(store.id).set(store);
    }

    // Ajouter des produits
    const products = [
      { id: 'product1', name: 'Produit 1', description: 'Description du produit 1', category: 'Catégorie 1' },
      { id: 'product2', name: 'Produit 2', description: 'Description du produit 2', category: 'Catégorie 2' },
    ];

    for (const product of products) {
      await db.collection('products').doc(product.id).set(product);
    }

    // Ajouter des stocks
    const inventory = [
      {
        storeID: 'store1',
        productID: 'product1',
        quantity: 50,
        expirationDates: [
          { date: '2025-02-01', quantity: 20 },
          { date: '2025-03-01', quantity: 30 },
        ],
      },
      {
        storeID: 'store2',
        productID: 'product2',
        quantity: 30,
        expirationDates: [
          { date: '2025-04-01', quantity: 15 },
          { date: '2025-05-01', quantity: 15 },
        ],
      },
    ];

    for (const stock of inventory) {
      const docID = `${stock.storeID}_${stock.productID}`;
      await db.collection('inventory').doc(docID).set(stock);
    }

    // Ajouter des réservations
    const reservations = [
      {
        id: 'reservation1',
        storeID: 'store1',
        productID: 'product1',
        customerID: 'customer1',
        quantity: 2,
        reservationDate: '2025-01-24',
        status: 'en attente',
      },
      {
        id: 'reservation2',
        storeID: 'store2',
        productID: 'product2',
        customerID: 'customer2',
        quantity: 1,
        reservationDate: '2025-01-25',
        status: 'validée',
      },
    ];

    for (const reservation of reservations) {
      await db.collection('reservations').doc(reservation.id).set(reservation);
    }

    console.log('Base de données initialisée avec succès !');
  } catch (error) {
    console.error('Erreur lors de l\'initialisation de la base de données :', error);
  }
}

// Exécuter l'initialisation
initializeDatabase();

