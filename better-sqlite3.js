// Mock better-sqlite3 for web
class Database {
  constructor(filename, options) {}
  prepare(sql) {
    return {
      run: (...params) => ({ changes: 0, lastInsertRowid: 0 }),
      get: (...params) => ({}),
      all: (...params) => ([]),
      finalize: () => {},
    };
  }
  exec(sql) {}
  close() {}
  pragma(pragma) { return []; }
}

module.exports = Database;
