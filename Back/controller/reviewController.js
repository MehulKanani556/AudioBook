const reviewData = require('../models/reviewModels')
const mongoose = require('mongoose')

exports.createReview = async (req, res) => {
    try {
        let { audioBookId, userId, date, review, rating } = req.body

        let checkReview = await reviewData.findOne({ audioBookId })

        if (checkReview) {
            return res.status(409).json({ status: 409, success: false, message: "Review already exists" })
        }

        checkReview = await reviewData.create({
            audioBookId,
            userId,
            date,
            review,
            rating
        })

        return res.status(201).json({ status: 201, success: true, message: "Review create successfully...", data: checkReview })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllReview = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedReview;

        paginatedReview = await reviewData.aggregate([
            {
                $lookup: {
                    from: 'audiobooks',
                    localField: 'audioBookId',
                    foreignField: '_id',
                    as: 'audioBookData'
                }
            },
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userData'
                }
            }
        ])

        let count = paginatedReview.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No Review Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedReview = await paginatedReview.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalReview: count, success: true, message: "All Review Found SuccessFully...", data: paginatedReview })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getReviewById = async (req, res) => {
    try {
        let id = req.params.id

        let getReviewId = await reviewData.aggregate([
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
            {
                $lookup: {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userData'
                }
            }
        ])

        if (!getReviewId) {
            return res.status(404).json({ status: 404, success: false, message: "Review Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Review Found SuccessFully...", data: getReviewId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateReviewById = async (req, res) => {
    try {
        let id = req.params.id

        let updateReviewId = await reviewData.findById(id)

        if (!updateReviewId) {
            return res.status(404).json({ status: 404, success: false, message: "Review Not Found" })
        }

        updateReviewId = await reviewData.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "Review Updated SuccessFully...", data: updateReviewId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteReviewById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteReviewId = await reviewData.findById(id)

        if (!deleteReviewId) {
            return res.status(404).json({ status: 404, success: false, message: "Review Not Found" })
        }

        await reviewData.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "Review Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}