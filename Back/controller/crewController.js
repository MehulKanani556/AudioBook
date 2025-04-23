const crew = require('../models/crewModels')
const mongoose = require('mongoose')

exports.createCrew = async (req, res) => {
    try {
        let { audiBookId, name, roleId, crewImage } = req.body

        let checkCrew = await crew.findOne({ audiBookId, name })

        if (checkCrew) {
            return res.status(409).json({ status: 409, success: false, message: "Crew already exists" })
        }

        checkCrew = await crew.create({
            audiBookId,
            name,
            roleId,
            crewImage: req.file.path
        })

        return res.status(201).json({ status: 201, success: true, message: "Crew create successfully...", data: checkCrew })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllCrew = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedCrew;

        paginatedCrew = await crew.aggregate([
            {
                $lookup: {
                    from: "audiobooks",
                    localField: "audiBookId",
                    foreignField: "_id",
                    as: "audiBookData"
                }
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "roleData"
                }
            }
        ])

        let count = paginatedCrew.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No Crew Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedCrew = await paginatedCrew.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalCrew: count, success: true, message: "All Crew Found SuccessFully...", data: paginatedCrew })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getCrewById = async (req, res) => {
    try {
        let id = req.params.id

        let getCrewId = await crew.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            },
            {
                $lookup: {
                    from: "audiobooks",
                    localField: "audiBookId",
                    foreignField: "_id",
                    as: "audiBookData"
                }
            },
            {
                $lookup: {
                    from: "roles",
                    localField: "roleId",
                    foreignField: "_id",
                    as: "roleData"
                }
            }
        ])


        if (!getCrewId) {
            return res.status(404).json({ status: 404, success: false, message: "Crew Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Crew Found SuccessFully...", data: getCrewId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateCrewById = async (req, res) => {
    try {
        let id = req.params.id

        let updateCrewId = await crew.findById(id)

        if (!updateCrewId) {
            return res.status(404).json({ status: 404, success: false, message: "Crew Not Found" })
        }

        if (req.file) {
            req.body.crewImage = req.file.path
        }
        updateCrewId = await crew.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "Crew Updated SuccessFully...", data: updateCrewId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteCrewById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteCrewId = await crew.findById(id)

        if (!deleteCrewId) {
            return res.status(404).json({ status: 404, success: false, message: "Crew Not Found" })
        }

        await crew.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "Crew Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}