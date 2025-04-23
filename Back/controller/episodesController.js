const episodes = require('../models/EpisodesModels');
const mongoose = require('mongoose')

exports.createEpisodes = async (req, res) => {
    try {
        let { audioBookId, audioFile, premium, coinRequired, duration } = req.body

        let checkEpisodes = await episodes.findOne({ audioBookId })

        if (checkEpisodes) {
            return res.status(409).json({ status: 409, success: false, message: "Episodes already exists" })
        }

        checkEpisodes = await episodes.create({
            audioBookId,
            audioFile: req.file.path,
            premium,
            coinRequired,
            duration
        });

        return res.status(201).json({ status: 201, success: true, message: "Episodes create successfully...", data: checkEpisodes })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllEpisodes = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedEpisodes;

        paginatedEpisodes = await episodes.aggregate([
            {
                $lookup: {
                    from: 'audiobooks',
                    localField: 'audioBookId',
                    foreignField: '_id',
                    as: 'audioBookData'
                }
            },
        ])

        let count = paginatedEpisodes.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No Episodes Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedEpisodes = await paginatedEpisodes.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalEpisodes: count, success: true, message: "All Episodes Found SuccessFully...", data: paginatedEpisodes })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getEpisodesById = async (req, res) => {
    try {
        let id = req.params.id

        let getEpisodesId = await episodes.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: 'audiobooks',
                    localField: 'audioBookId',
                    foreignField: '_id',
                    as: 'audioBookData'
                }
            },
        ])


        if (!getEpisodesId) {
            return res.status(404).json({ status: 404, success: false, message: "Episodes Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Episodes Found SuccessFully...", data: getEpisodesId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateEpisodesById = async (req, res) => {
    try {
        let id = req.params.id

        let updateEpisodesId = await episodes.findById(id)

        if (!updateEpisodesId) {
            return res.status(404).json({ status: 404, success: false, message: "Episodes Not Found" })
        }

        if (req.file) {
            req.body.audioFile = req.file.path
        }
        updateEpisodesId = await episodes.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "Episodes Updated SuccessFully...", data: updateEpisodesId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteEpisodesById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteEpisodesId = await episodes.findById(id)

        if (!deleteEpisodesId) {
            return res.status(404).json({ status: 404, success: false, message: "Episodes Not Found" })
        }

        await episodes.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "Episodes Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}