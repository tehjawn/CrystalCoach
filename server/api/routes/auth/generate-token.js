module.exports = (req, res) => {
	res.json({
		token: Math.random()*1000
	})
}