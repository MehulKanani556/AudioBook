const homeCorousel = require('../models/homeCorouselModels')

exports.createHomeCorousel = async (req, res) => {
    try {
        let { homeCorouselImage } = req.body

        let checkHomeCorousel = await homeCorousel.create({
            homeCorouselImage: req.file.path,
        });

        return res.status(201).json({ status: 201, success: true, message: "HomeCorousel create successfully...", data: checkHomeCorousel })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllHomeCorousel = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedHomeCorousel;

        paginatedHomeCorousel = await homeCorousel.find()

        let count = paginatedHomeCorousel.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No HomeCorousel Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedHomeCorousel = await paginatedHomeCorousel.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalHomeCorousel: count, success: true, message: "All HomeCorousel Found SuccessFully...", data: paginatedHomeCorousel })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getHomeCorouselById = async (req, res) => {
    try {
        let id = req.params.id

        let getHomeCorouselId = await homeCorousel.findById(id)

        if (!getHomeCorouselId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeCorousel Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "HomeCorousel Found SuccessFully...", data: getHomeCorouselId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateHomeCorouselById = async (req, res) => {
    try {
        let id = req.params.id

        let updateHomeCorouselId = await homeCorousel.findById(id)

        if (!updateHomeCorouselId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeCorousel Not Found" })
        }

        if (req.file) {
            req.body.homeCorouselImage = req.file.path
        }

        updateHomeCorouselId = await homeCorousel.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "HomeCorousel Updated SuccessFully...", data: updateHomeCorouselId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteHomeCorouselById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteHomeCorouselId = await homeCorousel.findById(id)

        if (!deleteHomeCorouselId) {
            return res.status(404).json({ status: 404, success: false, message: "HomeCorousel Not Found" })
        }

        await homeCorousel.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "HomeCorousel Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}