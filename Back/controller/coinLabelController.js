const coinLabel = require('../models/coinLabelModel')

exports.createCoinLabel = async (req, res) => {
    try {
        let { labelName } = req.body

        let checkCoinLabelName = await coinLabel.findOne({ labelName })

        if (checkCoinLabelName) {
            return res.status(409).json({ status: 409, success: false, message: "CoinLabel Name already exists" })
        }

        checkCoinLabelName = await coinLabel.create({
            labelName
        })

        return res.status(201).json({ status: 201, success: true, message: "CoinLabel create successfully...", data: checkCoinLabelName })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllCoinLabel = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedCoinLabel;

        paginatedCoinLabel = await coinLabel.find()

        let count = paginatedCoinLabel.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No CoinLabel Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedCoinLabel = await paginatedCoinLabel.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalCoinLabel: count, success: true, message: "All CoinLabel Found SuccessFully...", data: paginatedCoinLabel })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getCoinLabelById = async (req, res) => {
    try {
        let id = req.params.id

        let getCoinLabelId = await coinLabel.findById(id)

        if (!getCoinLabelId) {
            return res.status(404).json({ status: 404, success: false, message: "CoinLabel Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "CoinLabel Found SuccessFully...", data: getCoinLabelId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateCoinLabelById = async (req, res) => {
    try {
        let id = req.params.id

        let updateCoinLabelId = await coinLabel.findById(id)

        if (!updateCoinLabelId) {
            return res.status(404).json({ status: 404, success: false, message: "CoinLabel Not Found" })
        }

        updateCoinLabelId = await coinLabel.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "CoinLabel Updated SuccessFully...", data: updateCoinLabelId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteCoinLabelById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteCoinLabelId = await coinLabel.findById(id)

        if (!deleteCoinLabelId) {
            return res.status(404).json({ status: 404, success: false, message: "CoinLabel Not Found" })
        }

        await coinLabel.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "CoinLabel Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}