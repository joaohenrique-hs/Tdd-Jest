const request = require('supertest')

const app = require('../../src/app')
const truncate = require('../utils/truncate')
const factory = require('../factories')

describe('Authentication', () => {
    beforeAll(async () => {
        await truncate();
    })

    beforeEach(async () => {
        await truncate();
    })
    
    it('should authenticate with valid credentials', async () => {
        const user = await factory.create('User', {})

        console.log(user)

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            })
        expect(response.status).toBe(200)
    })

    it('should not authenticate with invalid credentials', async () => {
        const user = await factory.create('User', {
            password: '131313'  
        })

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: '121sdsd212'
            })
        expect(response.status).toBe(401)
    })

    it('should return jwt token when authenticated', async () => {
        const user = await factory.create('User', {})

        const response = await request(app)
            .post('/sessions')
            .send({
                email: user.email,
                password: user.password
            })
        expect(response.body).toHaveProperty("token")
    })
})