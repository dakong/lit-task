import { openDB } from "idb";
import { todoItems } from "../data";
import * as CONSTANTS from "./constants";

class TodoDB {
  database;

  constructor(dbName, storeName, version) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
  }

  async initializeDB() {
    const self = this;

    this.database = await openDB(this.dbName, this.version, {
      async upgrade(db, oldversion, newversion, transaction) {
        try {
          const store = await db.createObjectStore(self.storeName, {
            keyPath: CONSTANTS.COLUMN_UUID,
          });

          store.createIndex(CONSTANTS.COLUMN_DONE, CONSTANTS.COLUMN_DONE, {
            unique: false,
          });
          store.createIndex(CONSTANTS.COLUMN_VALUE, CONSTANTS.COLUMN_VALUE, {
            unique: false,
          });
          store.createIndex(
            CONSTANTS.COLUMN_COMMENT,
            CONSTANTS.COLUMN_COMMENT,
            { unique: false }
          );
          store.createIndex(
            CONSTANTS.COLUMN_DATETIME,
            CONSTANTS.COLUMN_DATETIME,
            { unique: false }
          );

          await transaction.done;
        } catch (e) {
          throw new Error(
            `Unable to upgrade the ${self.dbName} database to version ${self.version}`
          );
        }

        self
          .populateDemoData(db)
          .then(() => console.log("*** Successfully generated demo data"))
          .catch((e) => console.log(e));
      },
    });
  }

  async populateDemoData(database) {
    try {
      const tx = database.transaction(this.storeName, "readwrite");
      todoItems.forEach((todo) => {
        tx.store.add(todo);
      });
      await tx.done;
    } catch (e) {
      throw new Error(`Unable to populate the demo data`);
    }
  }

  async getAll() {
    try {
      return await this.database.getAll(this.storeName);
    } catch (e) {
      throw new Error("Unable to get all task items");
    }
  }

  async add(uuid) {
    try {
      const newTodo = {
        uuid,
        datetime: new Date().toUTCString(),
        value: "",
        done: false,
        comment: "",
      };
      console.log(this);
      await this.database.add(this.storeName, newTodo);
      return newTodo;
    } catch (e) {
      throw new Error(`Unable to create a new task: ${e}`);
    }
  }

  async get(uuid) {
    try {
      return await this.database.get(this.storeName, uuid);
    } catch (e) {
      throw new Error(`Unable to get the task with uuid: ${uuid}`);
    }
  }

  async update(payload) {
    try {
      const { uuid, column, value } = payload;
      const oldVal = await this.get(uuid);

      const newVal = {
        ...oldVal,
        [column]: value,
      };

      return {
        column,
        value,
        uuid: await this.database.put(this.storeName, newVal),
      };
    } catch (e) {
      console.log(e);
      throw new Error(`Unable to update the task`);
    }
  }

  async delete(uuid) {
    try {
      return await this.database.delete(this.storeName, uuid);
    } catch (e) {
      throw new Error(`Unable to delete the task with uuid: ${uuid}`);
    }
  }
}

const DB_NAME = "LIT_TASKS";
const VERSION = 1;
const STORE_NAME = "todo";

export default new TodoDB(DB_NAME, STORE_NAME, VERSION);
