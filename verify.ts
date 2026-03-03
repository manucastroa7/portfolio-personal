import Database from "better-sqlite3";

const db = new Database("portfolio.db");
const projects = db.prepare("SELECT title FROM projects").all();
console.log("Projects in database:", JSON.stringify(projects, null, 2));
db.close();
