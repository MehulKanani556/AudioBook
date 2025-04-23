const subScription = require('../models/subScriptionModels')

exports.createSubScription = async (req, res) => {
    try {
        let { name, dicount, scratchPrice, price, status } = req.body

        let checksubScriptionName = await subScription.findOne({ name })

        if (checksubScriptionName) {
            return res.status(409).json({ status: 409, success: false, message: "subScription Name already exists" })
        }

        checksubScriptionName = await subScription.create({
            name,
            dicount,
            scratchPrice,
            price,
            status
        })

        return res.status(201).json({ status: 201, success: true, message: "subScription create successfully...", data: checksubScriptionName })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllSubScription = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedSubScription;

        paginatedSubScription = await subScription.find()

        let count = paginatedSubScription.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No SubScription Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedSubScription = await paginatedSubScription.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalSubScription: count, success: true, message: "All SubScription Found SuccessFully...", data: paginatedSubScription })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getSubScriptionById = async (req, res) => {
    try {
        let id = req.params.id

        let getsubScriptionId = await subScription.findById(id)

        if (!getsubScriptionId) {
            return res.status(404).json({ status: 404, success: false, message: "subScription Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "subScription Found SuccessFully...", data: getsubScriptionId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateSubScriptionById = async (req, res) => {
    try {
        let id = req.params.id

        let updateSubScriptionId = await subScription.findById(id)

        if (!updateSubScriptionId) {
            return res.status(404).json({ status: 404, success: false, message: "subScription Not Found" })
        }

        updateSubScriptionId = await subScription.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "subScription Updated SuccessFully...", data: updateSubScriptionId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteSubScriptionById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteSubScriptionId = await subScription.findById(id)

        if (!deleteSubScriptionId) {
            return res.status(404).json({ status: 404, success: false, message: "SubScription Not Found" })
        }

        await subScription.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "SubScription Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}