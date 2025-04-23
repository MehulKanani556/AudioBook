const audiobook = require('../models/audioBookModels')
const mongoose = require('mongoose')

exports.createAudiobook = async (req, res) => {
    try {
        let { genreId, name, description, sampleFile, tags, language } = req.body

        let checkAudiobook = await audiobook.findOne({ genreId, name })

        if (checkAudiobook) {
            return res.status(409).json({ status: 409, success: false, message: "Audiobook already exists" })
        }

        checkAudiobook = await audiobook.create({
            genreId,
            name,
            description,
            sampleFile: req.file.path,
            tags,
            language
        })

        return res.status(201).json({ status: 201, success: true, message: "Audiobook create successfully...", data: checkAudiobook })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllAudiobook = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedAudiobook;

        paginatedAudiobook = await audiobook.aggregate([
            {
                $lookup: {
                    from: "genres",
                    localField: "genreId",
                    foreignField: "_id",
                    as: "genre"
                }
            }
        ])
        let count = paginatedAudiobook.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No Audiobook Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedAudiobook = await paginatedAudiobook.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalAudiobook: count, success: true, message: "All Audiobook Found SuccessFully...", data: paginatedAudiobook })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAudiobookById = async (req, res) => {
    try {
        let id = req.params.id

        let getAudiobookId = await audiobook.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "genres",
                    localField: "genreId",
                    foreignField: "_id",
                    as: "genre"
                }
            }
        ])

        if (!getAudiobookId) {
            return res.status(404).json({ status: 404, success: false, message: "Audiobook Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Audiobook Found SuccessFully...", data: getAudiobookId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateAudiobookById = async (req, res) => {
    try {
        let id = req.params.id

        let updateAudiobookId = await audiobook.findById(id)

        if (!updateAudiobookId) {
            return res.status(404).json({ status: 404, success: false, message: "Audiobook Not Found" })
        }

        if (req.file) {
            req.body.sampleFile = req.file.path
        }

        updateAudiobookId = await audiobook.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "Audiobook Updated SuccessFully...", data: updateAudiobookId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteAudiobookById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteAudiobookId = await audiobook.findById(id)

        if (!deleteAudiobookId) {
            return res.status(404).json({ status: 404, success: false, message: "Audiobook Not Found" })
        }

        await audiobook.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "Audiobook Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}
