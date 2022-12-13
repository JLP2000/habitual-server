describe('User Endpoints', () => {
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

    // it('Should login into existing user successfully', async () => {
    //     const res = await request(api).post('/users/login').send({username: 'Tester'});
    // })
})
