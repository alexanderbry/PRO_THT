import { ErrorRequestHandler } from "express";

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  let status = 500;
  let message = "Internal Server Error";
  let data = null;
  
  switch (err.name) {
    case "TokenExpiredError":
    case "JsonWebTokenError":
      status = 401;
      message = "Please login first";
      break;
    case "EmailTaken":
      status = 400;
      message = "Email already exists";
      break;
    case "InvalidEmail/Password":
      status = 400;
      message = "Email or password is incorrect";
      break;
    case "UsersEmpty":
      status = 404;
      message = "Users data is empty";
      break;
    case "UserNotFound":
      status = 404;
      message = "User data not found";
      break;
    case "Not Found":
      status = 404;
      message = "Data not found";
      break;
    case "Unauthorized":
      status = 401;
      message = "Please login first";
      break;
    default:
      console.error(err);
      break;
  }
  console.error(err);
  
  res.status(status).json({ status, message, data });
};

export default errorHandler;
