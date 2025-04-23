const playListSong = require('../models/playListSongModels');
const mongoose = require('mongoose');

exports.createPlayListSong = async (req, res) => {
    try {
        let { playListId, episodeId } = req.body

        let checkPlayListSong = await playListSong.findOne({ playListId, episodeId })

        if (checkPlayListSong) {
            return res.status(409).json({ status: 409, success: false, message: "PlayListSong already exists" })
        }

        checkPlayListSong = await playListSong.create({
            playListId,
            episodeId
        })

        return res.status(201).json({ status: 201, success: true, message: "PlayListSong create successfully...", data: checkPlayListSong })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllPlayListSong = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedPlayListSong;

        paginatedPlayListSong = await playListSong.aggregate([
            {
                $lookup: {
                    from: "playlists",
                    localField: "playListId",
                    foreignField: "_id",
                    as: "playListData"
                }
            },
            {
                $lookup: {
                    from: "episodes",
                    localField: "episodeId",
                    foreignField: "_id",
                    as: "episodeData"
                }
            }
        ])

        let count = paginatedPlayListSong.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No PlayListSong Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedPlayListSong = await paginatedPlayListSong.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalPlayListSong: count, success: true, message: "All PlayListSong Found SuccessFully...", data: paginatedPlayListSong })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getPlayListSongById = async (req, res) => {
    try {
        let id = req.params.id

        let getPlayListSongId = await playListSong.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "playlists",
                    localField: "playListId",
                    foreignField: "_id",
                    as: "playListData"
                }
            },
            {
                $lookup: {
                    from: "episodes",
                    localField: "episodeId",
                    foreignField: "_id",
                    as: "episodeData"
                }
            }
        ])

        if (!getPlayListSongId) {
            return res.status(404).json({ status: 404, success: false, message: "PlayListSong Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "PlayListSong Found SuccessFully...", data: getPlayListSongId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updatePlayListSongById = async (req, res) => {
    try {
        let id = req.params.id

        let updatePlayListSongId = await playListSong.findById(id)

        if (!updatePlayListSongId) {
            return res.status(404).json({ status: 404, success: false, message: "PlayListSong Not Found" })
        }

        updatePlayListSongId = await playListSong.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "PlayListSong Updated SuccessFully...", data: updatePlayListSongId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deletePlayListSongById = async (req, res) => {
    try {
        let id = req.params.id

        let deletePlayListSongId = await playListSong.findById(id)

        if (!deletePlayListSongId) {
            return res.status(404).json({ status: 404, success: false, message: "PlayListSong Not Found" })
        }

        await playListSong.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "PlayListSong Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}