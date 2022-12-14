const request = require('supertest')
const fs = require('fs')
const { Pool } = require('pg')
const app = require('../../app')
const testSeed = fs.readFileSync(__dirname + '/testSeed.sql').toString();

const resetTestDB = () => {
    return new Promise (async (resolve, reject) => {
        try{
            const db = new Pool({ connectionString: 'postgres://hcwhtede:J7a8uihmawGG1D7xyzruhmOrbpjQ2C3f@mouse.db.elephantsql.com/hcwhtede'});
            await db.query(testSeed);
            resolve('Test DB reset successfully')
        } catch (err){
            reject(`Test DB not reset: ${err}`)
        }
    })
}

global.request = request;
global.app = app;
global.resetTestDB = resetTestDB;
global.port = process.env.PORT || 5000;
