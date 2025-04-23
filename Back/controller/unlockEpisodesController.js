const unlockEpisodes = require('../models/unlockEpisodesModels')
const mongoose = require('mongoose')

exports.createUnlockEpisodes = async (req, res) => {
    try {
        let { userId, episodeId, date, coinLabelId } = req.body

        let checkUnlockEpisodes = await unlockEpisodes.findOne({ userId, episodeId })

        if (checkUnlockEpisodes) {
            return res.status(409).json({ status: 409, success: false, message: "UnlockEpisodes already exists" })
        }

        checkUnlockEpisodes = await unlockEpisodes.create({
            userId,
            episodeId,
            date,
            coinLabelId
        });

        return res.status(201).json({ status: 201, success: true, message: "UnlockEpisodes create successfully...", data: checkUnlockEpisodes })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllUnlockEpisodes = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedUnlockEpisodes;

        paginatedUnlockEpisodes = await unlockEpisodes.aggregate([
            {
                $lookup: {
                    from: 'episodes',
                    localField: 'episodeId',
                    foreignField: '_id',
                    as: 'episodeData'
                }
            },
            {
                $lookup: {
                    from: 'coinlabels',
                    localField: 'coinLabelId',
                    foreignField: '_id',
                    as: 'coinLabelData'
                }
            }
        ])

        let count = paginatedUnlockEpisodes.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No UnlockEpisodes Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedUnlockEpisodes = await paginatedUnlockEpisodes.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalUnlockEpisodes: count, success: true, message: "All UnlockEpisodes Found SuccessFully...", data: paginatedUnlockEpisodes })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getUnlockEpisodesById = async (req, res) => {
    try {
        let id = req.params.id

        let getUnlockEpisodesId = await unlockEpisodes.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'episodes',
                    localField: 'episodeId',
                    foreignField: '_id',
                    as: 'episodeData'
                }
            },
            {
                $lookup: {
                    from: 'coinlabels',
                    localField: 'coinLabelId',
                    foreignField: '_id',
                    as: 'coinLabelData'
                }
            }
        ])

        if (!getUnlockEpisodesId) {
            return res.status(404).json({ status: 404, success: false, message: "UnlockEpisodes Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "UnlockEpisodes Found SuccessFully...", data: getUnlockEpisodesId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateUnlockEpisodesById = async (req, res) => {
    try {
        let id = req.params.id

        let updateUnlockEpisodesId = await unlockEpisodes.findById(id)

        if (!updateUnlockEpisodesId) {
            return res.status(404).json({ status: 404, success: false, message: "UnlockEpisodes Not Found" })
        }

        updateUnlockEpisodesId = await unlockEpisodes.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "UnlockEpisodes Updated SuccessFully...", data: updateUnlockEpisodesId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteUnlockEpisodesById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteUnlockEpisodesId = await unlockEpisodes.findById(id)

        if (!deleteUnlockEpisodesId) {
            return res.status(404).json({ status: 404, success: false, message: "UnlockEpisodes Not Found" })
        }

        await unlockEpisodes.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "UnlockEpisodes Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}