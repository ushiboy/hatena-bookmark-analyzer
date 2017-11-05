class DB {

  constructor() {
    const request = window.indexedDB.open('HatenaBookmarkAnalyzer', 1);
    this.waits = [];
    request.onupgradeneeded = e => {
      const db = e.target.result;
      const store = db.createObjectStore('bookmarks', { autoIncrement: true });
      store.createIndex('link', 'link', { unique: true });
      store.createIndex('date', 'date', { unique: false });
    };
    request.onsuccess = e => {
      this.db = e.target.result;
      this.waits.forEach(w => {
        w(this.db);
      });
    };
  }

  _getDBInstance() {
    if (this.db) {
      return Promise.resolve(this.db);
    } else {
      return new Promise((resolve, reject) => {
        this.waits.push(db => {
          resolve(db);
        });
      });
    }
  }

  add(row) {
    return this._getDBInstance().then(() => {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction('bookmarks', 'readwrite');
        const bookmarks = transaction.objectStore('bookmarks');
        const r = bookmarks.add(row);
        r.onerror = function(event) {
          reject(event);
        };
        r.onsuccess = function(event) {
          resolve(Object.assign({}, {
            id: event.target.result
          }, row));
        };
      });
    });
  }

  get(key) {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction('bookmarks', 'readwrite');
      const bookmarks = transaction.objectStore('bookmarks');
      const r = bookmarks.get(key);
      r.onerror = function(event) {
        reject(event);
      };
      r.onsuccess = function(event) {
        resolve(r.result);
      };
    });
  }

  count() {
    return this._getDBInstance().then(() => {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction('bookmarks', 'readwrite');
        const bookmarks = transaction.objectStore('bookmarks');
        const r = bookmarks.count();
        r.onerror = function(event) {
          reject(event);
        };
        r.onsuccess = function(event) {
          resolve(event.target.result);
        };
      });
    });
  }

  getAll() {
    return this._getDBInstance().then(() => {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction('bookmarks', 'readwrite');
        const bookmarks = transaction.objectStore('bookmarks');
        const r = bookmarks.openCursor()
        r.onerror = function(event) {
          reject(event);
        };
        const results = [];
        r.onsuccess = function(event) {
          const cursor = event.target.result;
          if (cursor) {
            results.push(Object.assign({}, r.result.value, {
              id: r.result.key
            }));
            cursor.continue();
          } else {
            resolve(results);
          }
        };
      });
    });
  }

  paginate(page, perPage) {
    return this._getDBInstance().then(() => {
      return new Promise((resolve, reject) => {
        const transaction = this.db.transaction('bookmarks', 'readwrite');
        const bookmarks = transaction.objectStore('bookmarks');

        const range = IDBKeyRange.bound(perPage * (page - 1), perPage * page, true, false);
        const r = bookmarks.openCursor(range)
        r.onerror = function(event) {
          reject(event);
        };
        const results = [];
        r.onsuccess = function(event) {
          const cursor = event.target.result;
          if (cursor) {
            results.push(Object.assign({}, r.result.value, {
              id: r.result.key
            }));
            cursor.continue();
          } else {
            resolve(results);
          }
        };
      });
    });
  }

  getRangeByDate(from, to) {
    return new Promise((resolve, reject) => {
      const r = this.bookmarks.index('date').openCursor(IDBKeyRange.bound(from, to, false, true));
      r.onerror = function(event) {
        reject(event);
      };
      const results = [];
      r.onsuccess = function(event) {
        const cursor = event.target.result;
        results.push(r.result);
        if (cursor) {
          cursor.continue();
        } else {
          resolve(results);
        }
      };
    });
  }

}

const db = new DB();
export default db;
