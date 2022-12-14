// require('dotenv').config({ path: `.env.development` }

describe('Testing with a test database (ElephantSQL)', () => {
    let api;
    let token;
    // beforeEach(async() => {
        // await resetTestDB()
    // });

    beforeAll(async() => {
        await resetTestDB()
        api = app.listen(5001, () => {
            console.log("Test server on port 5000")
            console.log(process.env.DB_URL)
        })
    });

    afterAll(done => {
        console.log("Stopping test server");
        api.close(done)
    })

    it('Creates a User', async() => {
        const res = await request(api).post('/users/register').send({username: 'Josh1', password: '123'})
        expect(res.statusCode).toEqual(201);
    })

    it('Log into existing user', async() => {
        const res = await request(api).post('/users/login').send({username: 'Josh1', password: '123'})
        expect(res.statusCode).toEqual(200);

        token = res.body.session
        // console.log(token)
    })

    it('Finds and returns a user using the session token', async() => {
        const res = await request(api).get(`/users/${token}`)
        expect(res.statusCode).toEqual(200)
        expect(res.body.title).toEqual('Josh1')
    })

    it('Creates a new habit and dates associating to that habit', async() => {
        const res = await request(api).post('/habits')
                          .send({
                            name: "Create habit test",
                            start_date: "2000-11-12",
                            interval_in_days: 1,
                            interval_in_months: 0,
                            end_date: "2000-11-14",
                            note: "Testing a habit",
                            colour: "Red",
                            user_id: 1
                          })
                          .set({Authorization: token})
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("habit_id")

        const datesRes = await request(api).get('/habitdates/1');
        console.log(Object.keys(datesRes.body).length)
        expect(Object.keys(datesRes.body).length).toEqual(3)
    })

    it('Returns the number of habits in the database', async () => {
        const res = await request(api).get('/habits').set({Authorization: token});
        expect(res.statusCode).toEqual(200);
        // expect 3 because there are 3 dates inbetween the start and end date of the created habit
        expect(res.body.length).toEqual(3);
    })

    

    it('Updates a habit', async() => {
        const res = await request(api).put('/habits/1')
                            .send({
                                habit_id: 1,
                                name: 'Updated',
                                note: 'Updating habit id 1',
                                colour: 'Purple'
                            })
                            .set({Authorization: token})

        expect(res.statusCode).toEqual(200);
        
        const habitRes = await request(api).get('/habits/1').set({Authorization: token})
        expect(habitRes.statusCode).toEqual(200)
        console.log(habitRes.body)
        expect(habitRes.body).toEqual({ habit_id: 1,
                                        name: "Updated", 
                                        start_date: "2000-11-12T00:00:00.000Z",
                                        interval_in_days: 1,
                                        interval_in_months: 0,
                                        end_date: "2000-11-14T00:00:00.000Z",
                                        note: "Updating habit id 1",
                                        colour: "Purple"})

    })

    it('Delete a habit', async() => {
        const res = await request(api).delete('/habits/1').set({Authorization: token})
        expect(res.statusCode).toEqual(204);

        const habitRes = await request(api).get('/habits/1').set({Authorization: token});
        expect(habitRes.statusCode).toEqual(404);
    })
})
