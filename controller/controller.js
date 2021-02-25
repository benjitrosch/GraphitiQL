const { Pool } = require('pg');
// import dynamic from "next/dynamic";

module.exports = {
  connectToDB: async (URI) => {
    return new Promise((resolve) => {
      const pool = new Pool({ connectionString: URI });
      // test if db connection works
      try {
        pool.query("SELECT 1", (err, data) => {
          if (err) return resolve(new Error(err));
          return resolve(pool);
        }); 
      } catch {
        return resolve(new Error(err));
      }
    });
  },
  asyncQuery: async (pool, query, params) => {
    return new Promise((resolve) => {
      pool.query(query, params, (err, data) => {
        if (err) return resolve(new Error(err));
        else return resolve(data);
      })
    })
  },
  errorHandler: (res, err) => {
    console.log(`Error in middleware function: ${err}`);
    res.status(400).json('Error in middleware function- check server logs for more information');
  }
}