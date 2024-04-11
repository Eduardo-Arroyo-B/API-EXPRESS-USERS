const prisma = require('../../SettingsPrisma')
const { PrismaClientKnownRequestError } = require('@prisma/client')
const express = require('express')
const router = express.Router()

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

router.use(timeLog)

//Protocolos de peticion
router.get('/consulta', async (req, res) => {
    //Consulta de datos en la db cons ORM Prisma
    const consultUsers = await prisma.users.findMany()
    
    //Envio de datos
    res.json(consultUsers)
})

router.post('/creacion', async (req, res) => {
    const createUser = await prisma.users.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            lastname: req.body.lastname,
            age: req.body.age
        }
    })

    res.json(createUser)
    console.log(createUser)
})

router.put('/actualizar/:id', async (req, res) => {

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
                email: req.body.email,
                name: req.body.name,
                lastname: req.body.lastname,
                age: req.body.age
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