const user = require('../models/userModels')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer')

exports.adminLogin = async (req, res) => {
    try {
        let { email, password } = req.body;
        
        let checkEmailIsExist = await user.findOne({ email });

        if (!checkEmailIsExist) {
            return res.status(409).json({ status: 409, success: false, message: "Email Not Found" });
        }

        let comparePasswrod = await bcrypt.compare(password, checkEmailIsExist.password);

        if (!comparePasswrod) {
            return res.status(404).json({ status: 404, success: false, message: "Password Not Match" });
        }

        let token = jwt.sign({ _id: checkEmailIsExist._id }, process.env.SECRET_KEY, { expiresIn: "1D" });

        return res.status(200).json({ status: 200, success: true, message: "Admin User Login SuccessFully...", data: checkEmailIsExist, token: token });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, success: false, message: error.message });
    }
};

exports.userLogin = async (req, res) => {
    try {
        let { mobileNo } = req.body;

        let checkMobileNo = await user.findOne({ mobileNo })

        if (!checkMobileNo) {
            return res.status(404).json({ status: 404, message: "Mobile No Not Found" })
        }

        let random = Math.floor(1000 + Math.random() * 9000);

        checkMobileNo.otp = random

        await checkMobileNo.save()

        console.log(random);

        return res.status(200).json({ status: 200, message: "Otp Sent SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.resedMobileOtp = async (req, res) => {
    try {
        let { mobileNo } = req.body;

        let checkMobileNo = await user.findOne({ mobileNo })

        if (!checkMobileNo) {
            return res.status(404).json({ status: 404, message: "Mobile No Not Found" })
        }

        let random = Math.floor(1000 + Math.random() * 9000);

        checkMobileNo.otp = random

        await checkMobileNo.save()

        console.log(random);

        return res.status(200).json({ status: 200, message: "Otp Sent SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.verifyOtp = async (req, res) => {
    try {
        let { mobileNo, otp } = req.body;

        let checkMobileNo = await user.findOne({ mobileNo });

        if (!checkMobileNo) {
            return res.status(404).json({ status: 404, success: false, message: "Mobile No Not Found" })
        }

        if (checkMobileNo.otp != otp) {
            return res.status(404).json({ status: 404, success: false, message: "Otp Not Match" })
        }

        checkMobileNo.otp = undefined

        await checkMobileNo.save()

        let token = jwt.sign({ _id: checkMobileNo._id }, process.env.SECRET_KEY, { expiresIn: "1D" });

        return res.status(200).json({ status: 200, success: true, message: "Otp Verified SuccessFully...", data: checkMobileNo, token: token });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        let { email } = req.body

        let checkEmail = await user.findOne({ email })

        if (!checkEmail) {
            return res.status(404).json({ status: 404, success: false, message: "Email Not Found" })
        }

        const transport = await nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let otp = await Math.floor(1000 + Math.random() * 9000);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Forgot Password Otp",
            text: `Your Code is ${otp}`,
        };

        transport.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, success: false, message: error.message });
            }
            return res.status(200).json({ status: 200, success: true, message: "Email Sent SuccessFully..." });
        });

        checkEmail.otp = otp;
        await checkEmail.save();

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, success: false, message: error.message })
    }
}

exports.emailOtpVerify = async (req, res) => {
    try {
        let { email, otp } = req.body;

        let checkEmailIsExist = await user.findOne({ email });

        if (!checkEmailIsExist) {
            return res.status(404).json({ status: 404, success: false, message: "Email Not Found" });
        }

        if (checkEmailIsExist.otp != otp) {
            return res.status(200).json({ status: 200, success: false, message: "Invalid Otp" });
        }

        checkEmailIsExist.otp = undefined;

        await checkEmailIsExist.save();

        return res.status(200).json({ status: 200, success: true, message: "Otp Verified Successfully", data: checkEmailIsExist });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, success: false, message: error.message });
    }
};

exports.resendOtp = async (req, res) => {
    try {
        let { email } = req.body;

        let chekcEmail = await user.findOne({ email });

        if (!chekcEmail) {
            return res.status(404).json({ status: 404, success: false, message: "Email Not Found" });
        }

        const transport = await nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        let otp = Math.floor(1000 + Math.random() * 9000);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Resend Forgot Password Otp",
            text: `Your Code is ${otp}`,
        };

        transport.sendMail(mailOptions, (error) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ status: 500, success: false, message: error.message });
            }
            return res.status(200).json({ status: 200, success: true, message: "Email Sent SuccessFully...", });
        });

        chekcEmail.otp = otp;
        await chekcEmail.save();

    } catch (error) {
        console.log(error);
        return res.status(500).json({ status: 500, success: false, message: error.message });
    }
};

exports.changePassword = async (req, res) => {
    try {
        let id = req.params.id

        let userId = await user.findById(id);

        if (!userId) {
            return res.status(404).json({ status: 404, message: "User Not Found" })
        }

        let { newPassword, confirmPassword } = req.body;

        if (newPassword !== confirmPassword) {
            return res.json({ status: 400, message: "New Password And Confirm Password Not Match" })
        }

        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(newPassword, salt);

        let updatePassword = await user.findByIdAndUpdate(id, { password: hashPassword }, { new: true })

        return res.json({ status: 200, message: "Password Changed SuccessFully..." })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}

exports.updatePassword = async (req, res) => {
    try {
        let id = req.params.id

        let getUser = await user.findById(id)

        if (!getUser) {
            return res.status(404).json({ status: 404, message: "User Not Found" })
        }

        let { currentPassword, newPassword, confirmPassword } = req.body

        let checkCurrentPassword = await bcrypt.compare(currentPassword, getUser.password)

        if (!checkCurrentPassword) {
            return res.status(404).json({ status: 404, message: "Invalid Current Password" })
        }

        if (newPassword !== confirmPassword) {
            return res.json({ status: 400, message: "New Password And Confirm Password Not Match" })
        }

        let salt = await bcrypt.genSalt(10);

        let hashPassword = await bcrypt.hash(newPassword, salt);

        let updatePassword = await user.findByIdAndUpdate(id, { password: hashPassword }, { new: true });

        return res.status(200).json({ status: 200, message: "Password Update SuccessFully..." });

    } catch (error) {
        console.log(error)
        return res.status(500).json({ status: 500, message: error.message })
    }
}