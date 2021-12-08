function requireUser(req, res, next) {
    if (!req.user) {
        next({
            name: "MissingUserError",
            message: "You must be logged in to perform this action"
          });
    }

    next();
}

const requireAdmin = (req, res, next) => {
    if(req.isAdmin) next()
    else next(error)
}

module.exports = {requireUser, requireAdmin};