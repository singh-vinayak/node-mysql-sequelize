const { user, project, Sequelize } = require('../models');
const Op = Sequelize.Op;
let self = {};

/**
* @description Get All Projects
* @type GET
* @path /api/projects
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.getAll = async (req, res) => {
    try {
        let data = await project.findAll({
            include: [{
                model: user,
                as: 'created_by_user',
                id: Sequelize.col('user_id')
            }]
        });
        return res.status(200).json({
            success: true,
            count: data.length,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}

/**
* @description Create New Project
* @type POST
* @path /api/projects/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.createProject = async (req, res) => {
    if (!req.body.user_id) {
        return res.status(400).send({
            success: false,
            message: "User ID needs to be provided!"
        });
    }
    if (!req.body.name) {
        return res.status(400).send({
            success: false,
            message: "Project Name can not be empty!"
        });
    }
    try {
        const newProject = {
            name: req.body.name,
            description: req.body?.description || "",
            user_id: req.body.user_id
        };
        let data = await project.create(newProject);
        return res.status(201).json({
            success: true,
            data: data
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}
/**
* @description Get Single Project info by id
* @type GET
* @path /api/projects/:id
* @param {*} req
* @param {*} res
* @param {Number} — id — project id
* @returns JSON
*/
self.get = async (req, res) => {
    let id = req.params.id;
    try {
        let data = await project.findOne({
            where: {
                id: id
            },
            include: [{
                model: user,
                as: 'created_by_user',
                id: Sequelize.col('user_id')
            }]
        });
        if (data)
            return res.status(200).json({
                success: true,
                data: data
            });
        else
            return res.status(200).json({
                success: false,
                message: "No project with specified ID found"
            });
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error
        })
    }
}
/**
* @description Update Project data
* @type PUT
* @path /api/projects/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.updateProject = async (req, res) => {
    try {
        let id = req.params.id;
        let body = req.body;
        let data = await project.update(body, {
            where: {
                id: id
            }
        });

        if (data[0] === 0) {
            return res.status(200).json({
                success: false,
                error: "No user found with this id"
            })
        }
        return res.status(200).json({
            success: true,
            "number of rows changed": data
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
}
/**
* @description Delete project with the specified id in the request
* @type DELETE
* @path /api/projects/:id
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.delete = async (req, res) => {
    try {
        let id = req.params.id;
        let data = await project.destroy({
            where: {
                id: id
            }
        });
        if (data === 1) {
            return res.status(200).json({
                success: true,
                message: `User with id=${id} deleted`
            })
        }
        return res.status(200).json({
            success: false,
            message: `User with id=${id} is not present.`
        })
    } catch (error) {
        return res.status(200).json({
            success: false,
            error: error
        })
    }
}
/**
* @description Delete all projects from the database
* @type DELETE
* @path /api/projects/
* @param {*} req
* @param {*} res
* @returns JSON
*/
self.deleteAll = async (req, res) => {
    try {
        let data = await project.destroy({
            where: {},
            truncate: true
        });
        return res.status(200).json({
            success: true,
            data: data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error
        })
    }
};
module.exports = self;