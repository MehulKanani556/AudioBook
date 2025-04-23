const homeLabel = require('../models/homeLabelModels')

exports.createHomeLabel = async (req, res) => {
    try {
        let { labelName } = req.body

        let checkHomeLabel = await homeLabel.findOne({ labelName })

        if (checkHomeLabel) {
            return res.status(409).json({ status: 409, success: false, message: "Episodes already exists" })
        }

        checkHomeLabel = await homeLabel.create({
            labelName
        });

        return res.status(201).json({ status: 201, success: true, message: "HomeLabel create successfully...", data: checkHomeLabel })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllHomeLabel = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedHomeLabel;

        paginatedHomeLabel = await homeLabel.find()

        let count = paginatedHomeLabel.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No HomeLabel Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedHomeLabel = await paginatedHomeLabel.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalHomeLabel: count, success: true, message: "All HomeLabel Found SuccessFully...", data: paginatedHomeLabel })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getHomeLabelById = async (req, res) => {
    try {
        let id = req.params.id

        let getHomeLabelId = await homeLabel.findById(id)

        if (!getHomeLabelId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeLabel Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "HomeLabel Found SuccessFully...", data: getHomeLabelId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateHomeLabelById = async (req, res) => {
    try {
        let id = req.params.id

        let updateHomeLabelId = await homeLabel.findById(id)

        if (!updateHomeLabelId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeLabel Not Found" })
        }

        updateHomeLabelId = await homeLabel.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "HomeLabel Updated SuccessFully...", data: updateHomeLabelId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteHomeLabelById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteHomeLabelId = await homeLabel.findById(id)

        if (!deleteHomeLabelId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeLabel Not Found" })
        }

        await homeLabel.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "HomeLabel Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}