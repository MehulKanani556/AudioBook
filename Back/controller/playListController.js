const playList = require('../models/playListMasterModels');
const mongoose = require('mongoose')

exports.createPlayList = async (req, res) => {
    try {
        let { userId, name } = req.body

        let checkPlayList = await playList.findOne({ userId, name })

        if (checkPlayList) {
            return res.status(409).json({ status: 409, success: false, message: "PlayList already exists" })
        }

        checkPlayList = await playList.create({
            userId,
            name
        })

        return res.status(201).json({ status: 201, success: true, message: "PlayList create successfully...", data: checkPlayList })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllPlayList = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedPlayList;

        paginatedPlayList = await playList.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ])

        let count = paginatedPlayList.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No PlayList Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedPlayList = await paginatedPlayList.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalPlayList: count, success: true, message: "All PlayList Found SuccessFully...", data: paginatedPlayList })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getPlayListById = async (req, res) => {
    try {
        let id = req.params.id

        let getPlayListId = await playList.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ])


        if (!getPlayListId) {
            return res.status(404).json({ status: 404, success: false, message: "PlayList Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "PlayList Found SuccessFully...", data: getPlayListId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updatePlayListById = async (req, res) => {
    try {
        let id = req.params.id

        let updatePlayListId = await playList.findById(id)

        if (!updatePlayListId) {
            return res.status(404).json({ status: 404, success: false, message: "PlayList Not Found" })
        }

        updatePlayListId = await playList.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "PlayList Updated SuccessFully...", data: updatePlayListId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deletePlayListById = async (req, res) => {
    try {
        let id = req.params.id

        let deletePlayListId = await playList.findById(id)

        if (!deletePlayListId) {
            return res.status(404).json({ status: 404, success: false, message: "PlayList Not Found" })
        }

        await playList.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "PlayList Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getMyPlayList = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        let id = req.params.id

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedMyPlayList

        paginatedMyPlayList = await playList.find({ userId: id }).aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "userId",
                    foreignField: "_id",
                    as: "user"
                }
            }
        ])

        let count = paginatedMyPlayList.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No PlayList Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedMyPlayList = await paginatedMyPlayList.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, success: true, totalMyPlayList: count, message: 'All My PlayList Found SuccessFully...', data: paginatedMyPlayList })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}