const coinSubScriptionSell = require('../models/coinSellModels')
const mongoose = require('mongoose')

exports.createcoinSubScriptionSell = async (req, res) => {
    try {
        let { coinMasterId, userId, amount, paymentId, status } = req.body

        let checkcoinSubScriptionSellName = await coinSubScriptionSell.findOne({ coinMasterId, userId })

        if (checkcoinSubScriptionSellName) {
            return res.status(409).json({ status: 409, success: false, message: "coinSubScriptionSell Name already exists" })
        }

        checkcoinSubScriptionSellName = await coinSubScriptionSell.create({
            coinMasterId,
            userId,
            amount,
            paymentId,
            status
        })

        return res.status(201).json({ status: 201, success: true, message: "coinSubScriptionSell create successfully...", data: checkcoinSubScriptionSellName })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllcoinSubScriptionSell = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedcoinSubScriptionSell;

        paginatedcoinSubScriptionSell = await coinSubScriptionSell.aggregate([
            {
                $lookup: {
                    from: 'coinmasters',
                    localField: 'coinMasterId',
                    foreignField: '_id',
                    as: 'coinMasterData'
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userData"
                }
            }
        ])

        let count = paginatedcoinSubScriptionSell.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No coinSubScriptionSell Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedcoinSubScriptionSell = await paginatedcoinSubScriptionSell.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalcoinSubScriptionSell: count, success: true, message: "All coinSubScriptionSell Found SuccessFully...", data: paginatedcoinSubScriptionSell })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getcoinSubScriptionSellById = async (req, res) => {
    try {
        let id = req.params.id

        let getcoinSubScriptionSellId = await coinSubScriptionSell.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'coinmasters',
                    localField: 'coinMasterId',
                    foreignField: '_id',
                    as: 'coinMasterData'
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "userData"
                }
            }
        ])


        if (!getcoinSubScriptionSellId) {
            return res.status(404).json({ status: 404, success: false, message: "coinSubScriptionSell Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "coinSubScriptionSell Found SuccessFully...", data: getcoinSubScriptionSellId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateCoinSubScriptionSellById = async (req, res) => {
    try {
        let id = req.params.id

        let updatecoinSubScriptionSellId = await coinSubScriptionSell.findById(id)

        if (!updatecoinSubScriptionSellId) {
            return res.status(404).json({ status: 404, success: false, message: "coinSubScriptionSell Not Found" })
        }

        updatecoinSubScriptionSellId = await coinSubScriptionSell.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "coinSubScriptionSell Updated SuccessFully...", data: updatecoinSubScriptionSellId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deletecoinSubScriptionSellById = async (req, res) => {
    try {
        let id = req.params.id

        let deletecoinSubScriptionSellId = await coinSubScriptionSell.findById(id)

        if (!deletecoinSubScriptionSellId) {
            return res.status(404).json({ status: 404, success: false, message: "coinSubScriptionSell Not Found" })
        }

        await coinSubScriptionSell.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "coinSubScriptionSell Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}