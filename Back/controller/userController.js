const user = require('../models/userModels')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

exports.createUser = async (req, res) => {
    try {
        let { email, mobileNo, password, roleId, bio, age, occupation, studentVerificationStatus, studentIdImage, coins, language, status, image } = req.body

        let checkEmailIsExist = await user.findOne({ email })

        if (checkEmailIsExist) {
            return res.status(409).json({ status: 409, success: false, message: 'Email Is Alredy Exist' })
        }

        let salt = await bcrypt.genSalt(10)
        let hasPassword = await bcrypt.hash(password, salt)

        checkEmailIsExist = await user.create({
            email,
            mobileNo,
            password: hasPassword,
            roleId,
            bio,
            age,
            occupation,
            studentVerificationStatus,
            studentIdImage,
            coins,
            language,
            status,
            image: req.file.path
        });

        return res.status(201).json({ status: 201, success: true, message: "User Create SuccessFully...", data: checkEmailIsExist })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedUsers;

        paginatedUsers = await user.aggregate([
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'roleData'
                }
            }
        ])

        let count = paginatedUsers.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "User Not Foun" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedUsers = await paginatedUsers.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, success: true, totalUsers: count, message: "All Users Found SuccessFully...", data: paginatedUsers })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getUserById = async (req, res) => {
    try {
        let id = req.params.id

        let getUserId = await user.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'roles',
                    localField: 'roleId',
                    foreignField: '_id',
                    as: 'roleData'
                }
            }
        ])

        if (!getUserId) {
            return res.status(404).json({ status: 404, success: false, message: "User Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "User Found SuccessFully...", data: getUserId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateUserById = async (req, res) => {
    try {
        let id = req.params.id

        let updateUserId = await user.findById(id)

        if (!updateUserId) {
            return res.status(404).json({ status: 404, success: false, message: "User Not Found" })
        }

        updateUserId = await user.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, message: "User Updated SuccessFully...", data: updateUserId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteUserById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteUserId = await user.findById(id)

        if (!deleteUserId) {
            return res.status(404).json({ status: 404, success: false, message: "User Not Found" })
        }

        await user.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "User Delete SuccessFully...", data: deleteUserId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

