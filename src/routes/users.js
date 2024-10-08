const express = require('express')
const router = express.Router()
const prisma = require('../../SettingsPrisma')
const { PrismaClientKnownRequestError } = require('@prisma/client')
const jwt= require('jsonwebtoken')
const config = require('../modules/config')
const verifyToken = require('../modules/verifyToken')

//Middleware que especifica los tiempos de peticion en el servidor
const timeLog = (req, res, next) => {
    const date = new Date()

    const dateOptions = {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric"
    }

    console.log('Time:', date.toLocaleString('es-MX', dateOptions))
    next()
}

// Lanza en consola los tiempos de conexion de las peticiones
router.use(timeLog)

//Protocolos de peticion
router.get('/consulta', verifyToken, async (req, res) => {
    //Consulta de datos en la db con ORM Prisma
    const consultUsers = await prisma.users.findMany()
    if (!consultUsers) {
        return res.status(404).send('User no found')
    }
    
    //Envio de datos
    res.json(consultUsers)
})

router.post('/creacion', async (req, res) => {

    const { email, name, lastname, age } = req.body

    const createUser = await prisma.users.create({
        data: {
            email: email,
            name: name,
            lastname: lastname,
            age: age
        }
    })

    const token = jwt.sign({id: createUser.id}, config.secret, {
        expiresIn: '24h'
    })

    res.json({createUser, token})
    console.log(createUser, token)
})

router.post('/signin', async (req, res,) => {
    const { email } = req.body

    const searchUser = await prisma.users.findUnique({
        where: {
            email: email
        }
    })

    if (!searchUser) {
        return res.status(404).json({message: "User not found"})
    }

    const token = jwt.sign({email}, config.secret)

    res.json({
        auth: true,
        token,
        searchUser
    })
})

router.post('/login', async (req, res,) => {
    const { email, name } = req.body

    const searchUser = await prisma.users.findUnique({
        where: {
            email,
            name
        }
    })

    if (!searchUser) {
        return res.status(404).json({message: "User not found"})
    }

    res.json({searchUser})
})

router.put('/actualizar/:id', verifyToken,  async (req, res) => {

    const { email, name, lastname, age } = req.body

    const searchUser = await prisma.users.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (searchUser) {
        const updateUser = await prisma.users.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                email: email,
                name: name,
                lastname: lastname,
                age: age
            }
        })

        res.json(updateUser)

    } else {
        res.send('Username does no exist')
    }
})

router.delete('/eliminar/:id', async (req, res) => {

    const searchUser = await prisma.users.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (searchUser) {
        const deleteUser = await prisma.users.delete({
            where: {
                id: Number(req.params.id)
            }
        })

        res.send('user deleted successfully')

    } else {
        res.send('Username does no exist')
    }

})

router.patch('/actualizarDato/:id/name', async (req, res) => {

    const searchUser = await prisma.users.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (searchUser) {
        const updateData = await prisma.users.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                name: req.body.name
            }
        })

        res.json(updateData)
    } else {
        res.send('Username does no exist')
    }
})
router.patch('/actualizarDato/:id/lastname', async (req, res) => {

    const searchUser = await prisma.users.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (searchUser) {
        const updateData = await prisma.users.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                lastname: req.body.lastname
            }
        })

        res.json(updateData)
    } else {
        res.send('Username does no exist')
    }
})

router.patch('/actualizarDato/:id/email', async (req, res) => {

    const searchUser = await prisma.users.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (searchUser) {
        const updateData = await prisma.users.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                email: req.body.email
            }
        })

        res.json(updateData)
    } else {
        res.send('Username does no exist')
    }
})

router.patch('/actualizarDato/:id/age', async (req, res) => {

    const searchUser = await prisma.users.findUnique({
        where: {
            id: Number(req.params.id)
        }
    })

    if (searchUser) {
        const updateData = await prisma.users.update({
            where: {
                id: Number(req.params.id)
            },
            data: {
                age: req.body.age
            }
        })

        res.json(updateData)
    } else {
        res.send('Username does no exist')
    }
})

module.exports = router