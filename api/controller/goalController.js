const asyncHandler = require('express-async-handler');
const Goal = require('../Model/goalModel');
const User = require('../Model/userModel');
// @desc Get goals
//@route GET /api/goals
//@access Public
const getGoals = asyncHandler(async (req, res) => {
	const goals = await Goal.find({ user: req.user.id });

	res.status(200).json(goals);
});

// @desc Create goals
//@route POST /api/goals
//@access Public
const createGoal = asyncHandler(async (req, res) => {
	if (!req.body.text) {
		res.status(400);
		throw new Error('Please add required texts');
	}

	const goal = await Goal.create({
		text: req.body.text,
		user: req.user.id,
	});

	res.status(200).json(goal);
});

// @desc Update goals
//@route GET /api/goals/:id
//@access Private
const updateGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Please add required texts');
	}

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
		new: true,
	});

	res.status(200).json(updatedGoal);
});

// @desc Get goals
//@route GET /api/goals/:id
//@access Private
const deleteGoal = asyncHandler(async (req, res) => {
	const goal = await Goal.findById(req.params.id);

	if (!goal) {
		res.status(400);
		throw new Error('Goal not found');
	}

	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(401);
		throw new Error('User not found');
	}

	if (goal.user.toString() !== user.id) {
		res.status(401);
		throw new Error('User not authorized');
	}

	await goal.deleteOne();

	res.status(200).json({ id: req.params.id, text: goal.text });
});

module.exports = {
	getGoals,
	createGoal,
	updateGoal,
	deleteGoal,
};
