const coinMaster = require('../models/coinMasterModels')
const mongoose = require('mongoose')

exports.createCoinMaster = async (req, res) => {
    try {
        let { coin, payment, freeCoins, labelId, isOneTime, validTill, status } = req.body

        let checkCoinMaster = await coinMaster.findOne({ coin })

        if (checkCoinMaster) {
            return res.status(409).json({ status: 409, success: false, message: "CoinMaster already exists" })
        }

        checkCoinMaster = await coinMaster.create({
            coin,
            payment,
            freeCoins,
            labelId,
            isOneTime,
            validTill,
            status
        })

        return res.status(201).json({ status: 201, success: true, message: "CoinMaster create successfully...", data: checkCoinMaster })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllCoinMaster = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedCoinMaster;

        paginatedCoinMaster = await coinMaster.aggregate([
            {
                $lookup: {
                    from: "coinlabels",
                    localField: "labelId",
                    foreignField: "_id",
                    as: "coinLabelData"
                }
            }
        ])

        let count = paginatedCoinMaster.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No CoinMaster Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedCoinMaster = await paginatedCoinMaster.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalCoinMaster: count, success: true, message: "All CoinMaster Found SuccessFully...", data: paginatedCoinMaster })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getCoinMasterById = async (req, res) => {
    try {
        let id = req.params.id

        let getCoinMasterId = await coinMaster.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "coinlabels",
                    localField: "labelId",
                    foreignField: "_id",
                    as: "coinLabelData"
                }
            }
        ])


        if (!getCoinMasterId) {
            return res.status(404).json({ status: 404, success: false, message: "CoinMaster Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "CoinMaster Found SuccessFully...", data: getCoinMasterId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateCoinMasterById = async (req, res) => {
    try {
        let id = req.params.id

        let updateCoinMasterId = await coinMaster.findById(id)

        if (!updateCoinMasterId) {
            return res.status(404).json({ status: 404, success: false, message: "CoinMaster Not Found" })
        }

        updateCoinMasterId = await coinMaster.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "CoinMaster Updated SuccessFully...", data: updateCoinMasterId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteCoinMasterById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteCoinMasterId = await coinMaster.findById(id)

        if (!deleteCoinMasterId) {
            return res.status(404).json({ status: 404, success: false, message: "CoinMaster Not Found" })
        }

        await coinMaster.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "CoinMaster Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}