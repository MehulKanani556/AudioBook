const voucherUsed = require('../models/voucherUsedModels')
const mongoose = require('mongoose')

exports.createVoucherUsed = async (req, res) => {
    try {
        let { voucharId, userId, usedDate } = req.body

        let checkVoucherUsed = await voucherUsed.findOne({ voucharId, userId })

        if (checkVoucherUsed) {
            return res.status(409).json({ status: 409, success: false, message: "VoucherUsed already exists" })
        }

        checkVoucherUsed = await voucherUsed.create({
            voucharId,
            userId,
            usedDate
        })

        return res.status(201).json({ status: 201, success: true, message: "VoucherUsed create successfully...", data: checkVoucherUsed })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllVoucherUsed = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedVoucherUsed;

        paginatedVoucherUsed = await voucherUsed.aggregate([
            {
                $lookup: {
                    from: "vouchers",
                    localField: "voucharId",
                    foreignField: "_id",
                    as: "voucharData"
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

        let count = paginatedVoucherUsed.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No VoucherUsed Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedVoucherUsed = await paginatedVoucherUsed.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalVoucherUsed: count, success: true, message: "All VoucherUsed Found SuccessFully...", data: paginatedVoucherUsed })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getVoucherUsedById = async (req, res) => {
    try {
        let id = req.params.id

        let getVoucherUsedId = await voucherUsed.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "vouchers",
                    localField: "voucharId",
                    foreignField: "_id",
                    as: "voucharData"
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

        if (!getVoucherUsedId) {
            return res.status(404).json({ status: 404, success: false, message: "VoucherUsed Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "VoucherUsed Found SuccessFully...", data: getVoucherUsedId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateVoucherUsedById = async (req, res) => {
    try {
        let id = req.params.id

        let updateVoucherUsedId = await voucherUsed.findById(id)

        if (!updateVoucherUsedId) {
            return res.status(404).json({ status: 404, success: false, message: "VoucherUsed Not Found" })
        }

        updateVoucherUsedId = await voucherUsed.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "VoucherUsed Updated SuccessFully...", data: updateVoucherUsedId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteVoucherUsedById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteVoucherUsedId = await voucherUsed.findById(id)

        if (!deleteVoucherUsedId) {
            return res.status(404).json({ status: 404, success: false, message: "VoucherUsed Not Found" })
        }

        await voucherUsed.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "VoucherUsed Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}


