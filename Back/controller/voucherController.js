const voucher = require('../models/voucherModels')
const mongoose = require('mongoose')

exports.createVoucher = async (req, res) => {
    try {
        let { name, description, code, discount, coinMasterId, subScriptionSellId, validTill, forStudent, status } = req.body

        let checkVoucher = await voucher.findOne({ name })

        if (checkVoucher) {
            return res.status(409).json({ status: 409, success: false, message: "Voucher already exists" })
        }

        checkVoucher = await voucher.create({
            name,
            description,
            code,
            discount,
            coinMasterId,
            subScriptionSellId,
            validTill,
            forStudent,
            status
        })

        return res.status(201).json({ status: 201, success: true, message: "Voucher create successfully...", data: checkVoucher })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllVoucher = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedVoucher;

        paginatedVoucher = await voucher.aggregate([
            {
                $lookup: {
                    from: 'coinmasters',
                    localField: 'coinMasterId',
                    foreignField: '_id',
                    as: 'coinMaster'
                }
            },
            {
                $lookup: {
                    from: 'subscriptionsells',
                    localField: 'subScriptionSellId',
                    foreignField: '_id',
                    as: 'subScriptionSell'
                }
            }
        ])

        let count = paginatedVoucher.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No Voucher Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedVoucher = await paginatedVoucher.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalVoucher: count, success: true, message: "All Voucher Found SuccessFully...", data: paginatedVoucher })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getVoucherById = async (req, res) => {
    try {
        let id = req.params.id

        let getVoucherId = await voucher.aggregate([
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
                    as: 'coinMaster'
                }
            },
            {
                $lookup: {
                    from: 'subscriptionsells',
                    localField: 'subScriptionSellId',
                    foreignField: '_id',
                    as: 'subScriptionSell'
                }
            }
        ])

        if (!getVoucherId) {
            return res.status(404).json({ status: 404, success: false, message: "Voucher Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Voucher Found SuccessFully...", data: getVoucherId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateVoucherById = async (req, res) => {
    try {
        let id = req.params.id

        let updateVoucherId = await voucher.findById(id)

        if (!updateVoucherId) {
            return res.status(404).json({ status: 404, success: false, message: "Voucher Not Found" })
        }

        updateVoucherId = await voucher.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "Voucher Updated SuccessFully...", data: updateVoucherId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteVoucherById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteVoucherId = await voucher.findById(id)

        if (!deleteVoucherId) {
            return res.status(404).json({ status: 404, success: false, message: "Voucher Not Found" })
        }

        await voucher.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "Voucher Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}