const role = require('../models/roleModels')

exports.createRole = async (req, res) => {
    try {
        let { roleName } = req.body

        let checkRoleName = await role.findOne({ roleName })

        if (checkRoleName) {
            return res.status(409).json({ status: 409, success: false, message: "Role Name already exists" })
        }

        checkRoleName = await role.create({
            roleName
        })

        return res.status(201).json({ status: 201, success: true, message: "Role create successfully...", data: checkRoleName })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllRoles = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedRoles;

        paginatedRoles = await role.find()

        let count = paginatedRoles.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No Roles Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedRoles = await paginatedRoles.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalRoles: count, success: true, message: "All Roles Found SuccessFully...", data: paginatedRoles })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getRolesById = async (req, res) => {
    try {
        let id = req.params.id

        let getRoleId = await role.findById(id)

        if (!getRoleId) {
            return res.status(404).json({ status: 404, success: false, message: "Role Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Role Found SuccessFully...", data: getRoleId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateRoleById = async (req, res) => {
    try {
        let id = req.params.id

        let updateRoleId = await role.findById(id)

        if (!updateRoleId) {
            return res.status(404).json({ status: 404, success: false, message: "Role Not Found" })
        }

        updateRoleId = await role.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "Role Updated SuccessFully...", data: updateRoleId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteRoleById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteRoleId = await role.findById(id)

        if (!deleteRoleId) {
            return res.status(404).json({ status: 404, success: false, message: "Role Not Found" })
        }

        await role.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "Role Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}
