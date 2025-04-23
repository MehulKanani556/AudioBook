const episodeState = require('../models/episodeStateModels')
const mongoose = require('mongoose')

exports.createEpisodeState = async (req, res) => {
    try {
        let { userId, unlockEpisodeId, watchedTill } = req.body

        let checkEpisodeState = await episodeState.findOne({ userId, unlockEpisodeId })

        if (checkEpisodeState) {
            return res.status(409).json({ status: 409, success: false, message: "EpisodeState already exists" })
        }

        checkEpisodeState = await episodeState.create({
            userId,
            unlockEpisodeId,
            watchedTill
        });

        return res.status(201).json({ status: 201, success: true, message: "EpisodeState create successfully...", data: checkEpisodeState })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllEpisodeState = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedEpisodeState;

        paginatedEpisodeState = await episodeState.aggregate([
            {
                $lookup: {
                    from: 'unlockepisodes',
                    localField: 'unlockEpisodeId',
                    foreignField: '_id',
                    as: 'unlockEpisodeData'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ])

        let count = paginatedEpisodeState.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No EpisodeState Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedEpisodeState = await paginatedEpisodeState.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalEpisodeState: count, success: true, message: "All EpisodeState Found SuccessFully...", data: paginatedEpisodeState })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getEpisodeStateById = async (req, res) => {
    try {
        let id = req.params.id

        let getEpisodeStateId = await episodeState.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'unlockepisodes',
                    localField: 'unlockEpisodeId',
                    foreignField: '_id',
                    as: 'unlockEpisodeData'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ])


        if (!getEpisodeStateId) {
            return res.status(404).json({ status: 404, success: false, message: "EpisodeState Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "EpisodeState Found SuccessFully...", data: getEpisodeStateId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateEpisodeStateById = async (req, res) => {
    try {
        let id = req.params.id

        let updateEpisodeStateId = await episodeState.findById(id)

        if (!updateEpisodeStateId) {
            return res.status(404).json({ status: 404, success: false, message: "EpisodeState Not Found" })
        }

        if (req.file) {
            req.body.audioFile = req.file.path
        }
        
        updateEpisodeStateId = await episodeState.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "EpisodeState Updated SuccessFully...", data: updateEpisodeStateId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteEpisodeStateById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteEpisodeStateId = await episodeState.findById(id)

        if (!deleteEpisodeStateId) {
            return res.status(404).json({ status: 404, success: false, message: "EpisodeState Not Found" })
        }

        await episodeState.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "EpisodeState Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}