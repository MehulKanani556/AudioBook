const genre = require('../models/genreModels')

exports.createGenre = async (req, res) => {
    try {
        let { generImage, name } = req.body

        let checkGenre = await genre.findOne({ name })

        if (checkGenre) {
            return res.status(409).json({ status: 409, success: false, message: "Genre already exists" })
        }

        checkGenre = await genre.create({
            generImage: req.file.path,
            name
        })

        return res.status(201).json({ status: 201, success: true, message: "Genre create successfully...", data: checkGenre })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getAllGenre = async (req, res) => {
    try {
        let page = parseInt(req.query.page)
        let pageSize = parseInt(req.query.pageSize)

        if (page < 1 || pageSize < 1) {
            return res.status(401).json({ status: 401, success: false, message: "Page And PageSize Cann't Be Less Than 1" })
        }

        let paginatedGenre;

        paginatedGenre = await genre.find()

        let count = paginatedGenre.length

        if (count === 0) {
            return res.status(404).json({ status: 404, success: false, message: "No Genre Found" })
        }

        if (page && pageSize) {
            let startIndex = (page - 1) * pageSize
            let lastIndex = (startIndex + pageSize)
            paginatedGenre = await paginatedGenre.slice(startIndex, lastIndex)
        }

        return res.status(200).json({ status: 200, totalGenre: count, success: true, message: "All Genre Found SuccessFully...", data: paginatedGenre })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.getGenreById = async (req, res) => {
    try {
        let id = req.params.id

        let getGenreId = await genre.findById(id)

        if (!getGenreId) {
            return res.status(404).json({ status: 404, success: false, message: "Genre Not Found" })
        }

        return res.status(200).json({ status: 200, success: true, message: "Genre Found SuccessFully...", data: getGenreId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.updateGenreById = async (req, res) => {
    try {
        let id = req.params.id

        let updateGenreId = await genre.findById(id)

        if (!updateGenreId) {
            return res.status(404).json({ status: 404, success: false, message: "Genre Not Found" })
        }

        if (req.file) {
            req.body.generImage = req.file.path
        }
        updateGenreId = await genre.findByIdAndUpdate(id, { ...req.body }, { new: true })

        return res.status(200).json({ status: 200, success: true, message: "Genre Updated SuccessFully...", data: updateGenreId })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.deleteGenreById = async (req, res) => {
    try {
        let id = req.params.id

        let deleteGenreId = await genre.findById(id)

        if (!deleteGenreId) {
            return res.status(404).json({ status: 404, success: false, message: "Genre Not Found" })
        }

        await genre.findByIdAndDelete(id)

        return res.status(200).json({ status: 200, success: true, message: "Genre Deleted SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}