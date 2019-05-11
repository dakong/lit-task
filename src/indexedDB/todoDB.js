import { openDB } from 'idb';
import { todoItems } from '../data';

class TodoDB {
  database;
  dbName = 'LIT_TASKS';
  version = 2;
  storeName = 'todo';

  constructor() {}

  async initializeDB() {
    const self = this;
    this.database = await openDB(this.dbName, this.version, {
      async upgrade(db, oldversion, newversion, transaction) {
        const store = await db.createObjectStore(self.storeName, {
            keyPath: 'uuid',
        });

        store.createIndex('done', 'done', { unique: false });
        store.createIndex('value', 'value', { unique: false });
        store.createIndex('comment', 'comment', { unique: false });
        store.createIndex('datetime', 'datetime', { unique: false });

        await transaction.done;

        self.populateDemoData(db)
          .then(() => console.log('success'))
          .catch((e) => console.log(e));
      }
    });
  }

  async populateDemoData(database) {
    const tx = database.transaction(this.storeName, 'readwrite');
    todoItems.forEach(todo => {
      tx.store.add(todo);
    });
    await tx.done;
  }

  async getAll() {
    return await this.database.getAll(this.storeName);
  }

  async get(uuid) {
    return await this.database.get(this.storeName, uuid);
  }

  async update(payload) {
    const {uuid, column, value} = payload
    const oldVal = await this.get(uuid);

    const newVal = {
      ...oldVal,
      [column]: value
    };

    await this.database.put(this.storeName, newVal);
  }

  async delete(uuid) {
    return await this.database.delete(this.storeName, uuid);
  }
}

export default new TodoDB();