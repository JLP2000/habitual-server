describe('Habit Endpoints', () => {
    let api;
    beforeEach(async() => {
        await resetTestDB()
    });

    beforeAll(async() => {
        api = app.listen(5000, () => console.log("Test server on port 5000"))
    });

    afterAll(done => {
        console.log("Stopping test server");
        api.close(done)
    })

    it('Returns the number of habits in the database', async () => {
        const res = await request(api).get('/habits');
        expect(res.statusCode).toEqual(200);
        expect(res.body.length).toEqual(3);
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
                          });
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("habit_id")

        const datesRes = await request(api).get('/habitdate/4');
        expect(datesRes.body.length).toEqual(3)
    })

    it('Delete a habit', async() => {
        const res = await request(api).delete('/habits/1')
        expect(res.statusCode).toEqual(204);

        const habitRes = await request(api).get('/habits/1');
        expect(habitRes.statusCode).toEqual(404);
    })

    it('Updates a habit', async() => {
        const res = await request(api).put('/habits/2')
                            .send({
                                habit_id: 2,
                                name: 'Updated',
                                note: 'Updating habit id 2',
                                colour: 'Purple'
                            })
        expect(res.statusCode).toEqual(200);
        
        const habitRes = await request(api).get('/habits/2')
        expect(habitRes.statusCode).toEqual(200)
        expect(habitRes.body).toEqual({ name: "Updated", 
                                        start_date: "2000-11-12",
                                        interval_in_days: 1,
                                        interval_in_months: 0,
                                        end_date: "2000-11-14",
                                        note: "Updating habit id 2",
                                        colour: "Purple",
                                        user_id: 2})

    })
})
