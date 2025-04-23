const subScriptionSell = require('../models/subScriptionSellModels')
const mongoose = require('mongoose')

exports.createSubScriptionSell = async (req, res) => {
    try {
        let { subscriptionId, userId, expiryDate, amount, paymentId, status } = req.body

        let checkSubScriptionSell = await subScriptionSell.findOne({ subscriptionId, userId })

        if (checkSubScriptionSell) {
            return res.status(409).json({ status: 409, success: false, message: "SubScriptionSell already exists" })
        }

        checkSubScriptionSell = await subScriptionSell.create({
            subscriptionId,
            userId,
            expiryDate,
            amount,
            paymentId,
            status
        })

        return res.status(201).json({ status: 201, success: true, message: "SubScriptionSell create successfully...", data: checkSubScriptionSell })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllSubScriptionSell = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedSubScriptionSell;

        paginatedSubScriptionSell = await subScriptionSell.aggregate([
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "subscriptionId",
                    foreignField: "_id",
                    as: "subscriptionData"
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

        let count = paginatedSubScriptionSell.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No SubScriptionSell Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedSubScriptionSell = await paginatedSubScriptionSell.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalSubScriptionSell: count, success: true, message: "All SubScriptionSell Found SuccessFully...", data: paginatedSubScriptionSell })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getSubScriptionSellById = async (req, res) => {
    try {
        let id = req.params.id

        let getSubScriptionSellId = await subScriptionSell.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "subscriptions",
                    localField: "subscriptionId",
                    foreignField: "_id",
                    as: "subscriptionData"
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

        if (!getSubScriptionSellId) {
            return res.status(404).json({ status: 404, success: false, message: "SubScriptionSell Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "SubScriptionSell Found SuccessFully...", data: getSubScriptionSellId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateSubScriptionSellById = async (req, res) => {
    try {
        let id = req.params.id

        let updateSubScriptionSellId = await subScriptionSell.findById(id)

        if (!updateSubScriptionSellId) {
            return res.status(404).json({ status: 404, success: false, message: "SubScriptionSell Not Found" })
        }

        updateSubScriptionSellId = await subScriptionSell.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "SubScriptionSell Updated SuccessFully...", data: updateSubScriptionSellId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteSubScriptionSellById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteSubScriptionSellId = await subScriptionSell.findById(id)

        if (!deleteSubScriptionSellId) {
            return res.status(404).json({ status: 404, success: false, message: "SubScriptionSell Not Found" })
        }

        await subScriptionSell.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "SubScriptionSell Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}