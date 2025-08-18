export const adminMiddleware = (req, res, next) => {
    if (req.user.type !== 'Admin') {
        return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
};