// @desc Get goals
//@route GET /api/goals
//@access Public
const getGoals = (req, res) => {
	res.status(200).json({
		message: 'get received',
	});
};

// @desc Get goals
//@route GET /api/goals
//@access Public
const createGoal = (req, res) => {
	res.status(200).json({
		message: `create received`,
	});
};

// @desc Get goals
//@route GET /api/goals/:id
//@access Private
const updateGoal = (req, res) => {
	res.status(200).json({
		message: `update received ${req.params.id} `,
	});
};

// @desc Get goals
//@route GET /api/goals/:id
//@access Private
const deleteGoal = (req, res) => {
	res.status(200).json({
		message: 'delete received',
	});
};

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
