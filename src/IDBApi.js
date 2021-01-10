const OBJECT_STORE_NAME = 'nominations';

async function connectToDB() {
  const openRequest = window.indexedDB.open('ShoppiesDB', 1);
  return new Promise((resolve, reject) => {
    openRequest.addEventListener('error', () => {
      console.error('Unable to open database', openRequest.error.code);
      reject('Unable to open database: ', openRequest.error.message);
    });

    openRequest.addEventListener('upgradeneeded', () => {
      const db = openRequest.result;
      db.createObjectStore(OBJECT_STORE_NAME, {
        autoIncrement: false,
        keyPath: 'imdbID',
      });
    });

    openRequest.addEventListener('success', () => {
      const db = openRequest.result;
      resolve(db);
    });
  });
}

export async function getAllNominations() {
  /**
   * @type {IDBDatabase}
   */
  const db = await connectToDB();
  const transaction = db.transaction(OBJECT_STORE_NAME, 'readonly');
  const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
  const readRequest = objectStore.getAll();

  return new Promise((resolve, reject) => {
    readRequest.addEventListener('error', () => {
      console.error('Unable to read from store', readRequest.error.code);
      reject('Unable to read from store: ' + readRequest.error.message);
    });

    readRequest.addEventListener('success', () => {
      resolve(readRequest.result);
    });
  });
}

export async function storeNomination(nomination) {
  /**
   * @type {IDBDatabase}
   */
  const db = await connectToDB();
  const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const objectStore = transaction.objectStore(OBJECT_STORE_NAME);
  const storeRequest = objectStore.add(nomination);

  return new Promise((resolve, reject) => {
    storeRequest.addEventListener('error', () => {
      reject('Unable to add nomination: ' + storeRequest.error.message);
    });

    storeRequest.addEventListener('success', () => {
      resolve(storeRequest.result);
    });
  });
}

export async function deleteNomination(nomination) {
  /**
   * @type {IDBDatabase}
   */
  const db = await connectToDB();
  const transaction = db.transaction(OBJECT_STORE_NAME, 'readwrite');
  const objectStore = transaction.objectStore(OBJECT_STORE_NAME);

  const deleteRequest = objectStore.delete(nomination.imdbID);

  return new Promise((resolve, reject) => {
    deleteRequest.addEventListener('error', () => {
      reject('Unable to clear db: ' + deleteRequest.error.message);
    });

    deleteRequest.addEventListener('success', () => {
      resolve(deleteRequest.result);
    });
  });
}
