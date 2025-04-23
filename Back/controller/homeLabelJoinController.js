const homeLabelJoin = require('../models/homeLabelJoinModels')
const mongoose = require('mongoose')

exports.createHomeLabelJoin = async (req, res) => {
    try {
        let { homeLabelId, audioBookId } = req.body

        let checkHomeLabelJoin = await homeLabelJoin.findOne({ homeLabelId, audioBookId })

        if (checkHomeLabelJoin) {
            return res.status(409).json({ status: 409, success: false, message: "Episodes already exists" })
        }

        checkHomeLabelJoin = await homeLabelJoin.create({
            homeLabelId,
            audioBookId
        });

        return res.status(201).json({ status: 201, success: true, message: "HomeLabelJoin create successfully...", data: checkHomeLabelJoin })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllHomeLabelJoin = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedHomeLabelJoin;

        paginatedHomeLabelJoin = await homeLabelJoin.aggregate([
            {
                $lookup: {
                    from: 'homelabels',
                    localField: 'homeLabelId',
                    foreignField: '_id',
                    as: 'homeLabelData'
                }
            },
            {
                $lookup: {
                    from: "audiobooks",
                    localField: "audioBookId",
                    foreignField: "_id",
                    as: "audioBookData"
                }
            }
        ])

        let count = paginatedHomeLabelJoin.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No HomeLabelJoin Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedHomeLabelJoin = await paginatedHomeLabelJoin.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalHomeLabelJoin: count, success: true, message: "All HomeLabelJoin Found SuccessFully...", data: paginatedHomeLabelJoin })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getHomeLabelJoinById = async (req, res) => {
    try {
        let id = req.params.id

        let getHomeLabelJoinId = await homeLabelJoin.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'homelabels',
                    localField: 'homeLabelId',
                    foreignField: '_id',
                    as: 'homeLabelData'
                }
            },
            {
                $lookup: {
                    from: "audiobooks",
                    localField: "audioBookId",
                    foreignField: "_id",
                    as: "audioBookData"
                }
            }
        ])


        if (!getHomeLabelJoinId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeLabelJoin Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "HomeLabelJoin Found SuccessFully...", data: getHomeLabelJoinId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateHomeLabelJoinById = async (req, res) => {
    try {
        let id = req.params.id

        let updateHomeLabelJoinId = await homeLabelJoin.findById(id)

        if (!updateHomeLabelJoinId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeLabelJoin Not Found" })
        }

        updateHomeLabelJoinId = await homeLabelJoin.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "HomeLabelJoin Updated SuccessFully...", data: updateHomeLabelJoinId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteHomeLabelJoinById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteHomeLabelJoinId = await homeLabelJoin.findById(id)

        if (!deleteHomeLabelJoinId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeLabelJoin Not Found" })
        }

        await homeLabelJoin.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "HomeLabelJoin Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}
