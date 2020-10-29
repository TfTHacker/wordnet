var sqlite3 = require("sqlite3").verbose();
var SqlString = require('sqlstring');

var db = new sqlite3.Database('./sqlite-data/wordnet-sqlite.db'); 

//SQLITE SCHEMA
//CREATE TABLE words (word TEXT, definition TEXT, type TEXT);
//CREATE INDEX word_idx ON twords (word ASC);
//CREATE INDEX type_idx ON words (type ASC);

module.exports = {
  query: function(term, callback) {
      db.serialize(function() {
        let t =  SqlString.escape(term + '%');
        console.log(t,term)
        db.all("SELECT word, definition, type, length(word) as ln  FROM words WHERE word like " + t +  " order by ln, word LIMIT 20 " , function(err, allRows) {
            callback(allRows);
            //db.close();
            //console.log(results);
        });
      }); 
   } 
};


