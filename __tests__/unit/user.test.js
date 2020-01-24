const bcrypt = require('bcryptjs')
const truncate = require('../utils/truncate')

const { User } = require('../../src/app/models')

describe('User', () => {
    beforeEach(async () => {
        await truncate()
    })
    
    it('should encrypt user password', async () => {
        const user = await User.create({
            name: 'João',
            email: 'joaohenrique.hs@hotmail.com',
            password: '121212'
        })

        const compareHash = await bcrypt.compare('121212', user.password_hash)

        expect(compareHash).toBe(true)
    })
})
