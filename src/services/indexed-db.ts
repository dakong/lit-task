import { openDB, IDBPDatabase } from "idb";
import { todoItems } from "../data";
import logger from "../utils/logger";

export const COLUMN_UUID = "uuid";
export const COLUMN_DONE = "done";
export const COLUMN_VALUE = "value";
export const COLUMN_COMMENT = "comment";
export const COLUMN_DATETIME = "datetime";

class TodoDB {
  database: IDBPDatabase | undefined;
  dbName: string;
  storeName: string;
  version: number;

  private static COLUMN = {
    UUID: "uuid",
    DONE: "done",
    VALUE: "value",
    COMMENT: "comment",
    DATETIME: "datetime",
  };

  constructor(dbName: string, storeName: string, version: number) {
    this.dbName = dbName;
    this.storeName = storeName;
    this.version = version;
  }
  async initializeDB() {
    const self = this;

    this.database = await openDB(this.dbName, this.version, {
      async upgrade(db, oldversion, newversion, transaction) {
        if (oldversion !== newversion) {
          logger.Log("Upgrading database");
        }
        try {
          const store = await db.createObjectStore(self.storeName, {
            keyPath: TodoDB.COLUMN.UUID,
          });

          store.createIndex(TodoDB.COLUMN.DONE, TodoDB.COLUMN.DONE, {
            unique: false,
          });
          store.createIndex(TodoDB.COLUMN.VALUE, TodoDB.COLUMN.VALUE, {
            unique: false,
          });
          store.createIndex(TodoDB.COLUMN.COMMENT, TodoDB.COLUMN.COMMENT, {
            unique: false,
          });
          store.createIndex(TodoDB.COLUMN.DATETIME, TodoDB.COLUMN.DATETIME, {
            unique: false,
          });

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
      if (!this.database) throw new Error("Database is not initialized");
      return await this.database.getAll(this.storeName);
    } catch (e) {
      throw new Error(`Unable to get all task items: ${e.message}`);
    }
  }

  async add(uuid: string) {
    try {
      if (!this.database) throw new Error("Database is not initialized");

      const newTodo = {
        uuid,
        datetime: new Date().toUTCString(),
        value: "",
        done: false,
        comment: "",
      };
      await this.database.add(this.storeName, newTodo);
      return newTodo;
    } catch (e) {
      throw new Error(`Unable to create a new task: ${e.message}`);
    }
  }

  async get(uuid: string) {
    try {
      if (!this.database) throw new Error("Database is not initialized");
      return await this.database.get(this.storeName, uuid);
    } catch (e) {
      throw new Error(
        `Unable to get the task with uuid, ${uuid}: ${e.message}`
      );
    }
  }

  async update(payload: { uuid: string; column: string; value: string }) {
    try {
      if (!this.database) throw new Error("Database is not initialized");

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
      throw new Error(`Unable to update the task: ${e.message}`);
    }
  }

  async delete(uuid: string) {
    try {
      if (!this.database) throw new Error("Database is not initialized");
      return await this.database.delete(this.storeName, uuid);
    } catch (e) {
      throw new Error(
        `Unable to delete the task with uuid, ${uuid}: ${e.message}`
      );
    }
  }
}

const DB_NAME = "LIT_TASKS";
const VERSION = 1;
const STORE_NAME = "todo";

export default new TodoDB(DB_NAME, STORE_NAME, VERSION);
