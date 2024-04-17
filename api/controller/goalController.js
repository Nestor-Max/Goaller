// @desc Get goals
//@route GET /api/goals
//@access Public
const getGoals = (req, res) => {
	res.status(200).json({
		message: 'get received',
	});
};
