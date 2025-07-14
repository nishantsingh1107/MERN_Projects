const jwt = require("jsonwebtoken");

const getUserDetailsController = async (request, response) => {
    try {
        const { authorization } = request.cookies;
        if (!authorization) {
            response.status(401).json({
                isSuccess: false,
                message: "Token Not Found!",
            });
        }
        jwt.verify(authorization, process.env.JWT_SECRET, function (err, decodedData) {
            if (err) {
                response.status(401).json({
                    isSuccess: false,
                    message: "Invalid Token!",
                    data: {},
                });
            } else {
                response.status(200).json({
                    isSuccess: true,
                    message: "Valid Token!",
                    data: {
                        user: decodedData,
                    },
                });
            }
        });
    } catch (err) {
        console.log("Error in getUserDetailsController ---> ", err.message);
        response.status(500).json({
            isSuccess: false,
            message: "Internal Server Error!",
            data: {
                message: err.message,
            }
        });
    }
};

module.exports = { getUserDetailsController };