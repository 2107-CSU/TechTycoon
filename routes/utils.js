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
    if(req.user.isAdmin) next()
    else throw new Error('not admin')
}

module.exports = {requireUser, requireAdmin};