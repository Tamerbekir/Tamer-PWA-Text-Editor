import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Added 'try / catch ' to async await

// TODO: Add logic to a method that accepts some content and adds it to the database 
// Exporting a function that takes in data and updates it to the database
export const putDb = async (content) => {
  try {
    console.log('Post to the database')
    // Creating a connection to the database 'jate' and version we want to use (1)
    const contactDb = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
    //Transaction method used to create and manage a transaction within a database
    const tx = contactDb.transaction('jate', 'readwrite')
    // Open up the desired object store.
    const store = tx.objectStore('jate')
    // Using the put method to update the database with the ID of the content and what the text/content itself
    const request = store.put({ id: 1, value: content })
    // Get confirmation of the request.
    const result = await request;
    console.log('Content saved to database', result)
  } catch (error) {
    console.error('putDb not implemented')
  }
}


// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  try {
    console.log('Get from the database')
    // Creating a connection to the database 'jate' and version we want to use (1)
    const contactGetDb = await openDB('jate', 1);
    // Create a new transaction and specify the database and data privileges.
    const txGet = contactGetDb.transaction('jate', 'readonly')
    // Open up the desired object store.
    const storeGet = txGet.objectStore('jate')
    // Use the .getAll() method to get all data in the database.
    const requestGet = storeGet.getAll()
    // Confirmation of request
    const resultGet = await requestGet;
    console.log('result.value', resultGet);
    // using return to fetch the entries from the database and display them
    return resultGet;
  } catch (err) {
    console.error('getDb not implemented');
  }
}

initdb();



