export default function validateSchema(schema) {
    return (req, res, next) => {
        
        const validation = schema.validate(req.body, {abortEarly: false})

        if (validation.error) return res.status(400).send(validation.error.message)
        
        next()
    }
}