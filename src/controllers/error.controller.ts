import { NextFunction, Request, Response } from "express";
const errors = require("throw.js");


export class ErrorController {

    public handleError(req: Request, res: Response, next: NextFunction) {

      switch (req.params.error) {

          case "Custom":
              // errors.CustomError(slug, message, statusCode, errorCode);
              next(new errors.CustomError("CustomError",
                  "This is a Custom Error message", 900, 900));
              break;

          case "400":
          case "BadRequest":
              next(new errors.BadRequest());
              break;

          case "404":
          case "NotFound":
          default:
              next(new errors.NotFound());

      /*
       * Etc
       *
       * All of the classes below have all parameters set up by default,
       * based on RFC7231.
       * But you can override the message and the errorCode to fit your for
       * personal needs.
       *
       * 400 Bad Request
       *     -- errors.BadRequest(message, errorCode);
       * 401 Unauthorized
       *     -- errors.Unauthorized(message, errorCode);
       * 402 Payment Required
       *     -- errors.PaymentRequired(message, errorCode);
       * 403 Forbidden
       *     -- errors.Forbidden(message, errorCode);
       * 404 Not Found
       *     -- errors.NotFound(message, errorCode);
       * 405 Method Not Allowed
       *     -- errors.MethodNotAllowed(message, errorCode);
       * 406 Not Acceptable
       *     -- errors.NotAcceptable(message, errorCode);
       * 407 Proxy Authentication Required
       *     -- errors.ProxyAuthenticationRequired(message, errorCode);
       * 408 Request Timeout
       *     -- errors.RequestTimeout(message, errorCode);
       * 409 Conflict
       *     -- errors.Conflict(message, errorCode);
       * 410 Gone
       *     -- errors.Gone(message, errorCode);
       * 422 Unprocessable Entity
       *     -- errors.UnprocessableEntity(message, errorCode);
       * 424 Failed Dependency
       *     -- errors.FailedDependency(message, errorCode);
       * 500 Internal Server Error
       *     -- errors.InternalServerError(message, errorCode);
       * 501 Not Implemented
       *     -- errors.NotImplemented(message, errorCode);
       * 502 Bad Gateway
       *     -- errors.BadGateway(message, errorCode);
       * 503 Service Unavailable
       *     -- errors.ServiceUnavailable(message, errorCode);
       * 504 Gateway Timeout
       *     -- errors.GatewayTimeout(message, errorCode);
       * 505 HTTP Version Not Supported
       *     -- errors.HttpVersionNotSupported(message, errorCode);
       * 511 Network Authentication Required
       *     -- errors.NetworkAuthenticationRequired(message, errorCode);
       *
      */
    }
  }
}
