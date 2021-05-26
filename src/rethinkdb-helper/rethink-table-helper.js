class RethinkTableHelper {
  constructor(tableConnection, dbConnection) {
    this.db = dbConnection;
    this.setTable(tableConnection);
  }

  setTable(tableConnection) {
    this.tableConnection = tableConnection;
  }

  add(docs, callBack = () => {}) {
    return new Promise((resolve, reject) => {
      let preparedData = null;
      if (Array.isArray(docs)) {
        preparedData = [...docs];
      } else {
        preparedData = { ...docs };
      }
      this.tableConnection.insert(preparedData).run(this.db, (err, result) => {
        if (err) reject(err);
        callBack(result);
        resolve(result);
      });
    });
  }

  getDocs(filterOptions = {}, callBack = () => {}) {
    return new Promise(async (resolve, reject) => {
      this.tableConnection.filter(filterOptions).run(this.db, (err, result) => {
        if (err) reject(err);
        callBack(result.toArray());
        resolve(result.toArray());
      });
    });
  }

  updateDocs(filterOptions = {}, updateTo, callBack = () => {}) {
    return new Promise(async (resolve, reject) => {
      this.tableConnection
        .filter(filterOptions)
        .update(updateTo)
        .run(this.db, (err, result) => {
          if (err) reject(err);
          callBack(result);
          resolve(result);
        });
    });
  }

  deleteDocs(filterOptions = {}, callBack = () => {}) {
    return new Promise(async (resolve, reject) => {
      this.tableConnection
        .filter(filterOptions)
        .delete()
        .run(this.db, (err, result) => {
          if (err) reject(err);
          callBack(result);
          resolve(result);
        });
    });
  }
}

module.exports = RethinkTableHelper;
