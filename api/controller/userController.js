const asyncHandler = require('express-async-handler');
const User = require('../Model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
// @desc Register user
//@route GET /api/user
//@access Public
const registerUser = asyncHandler(async (req, res) => {
	const { name, email, password } = req.body;
	if (!name || !email || !password) {
		res.status(400);
		throw new Error('Enter required details');
	}
	const userExist = await User.findOne({ email });
	if (userExist) {
		res.status(400);
		throw new Error('User already exists');
	}

	const salt = await bcrypt.genSalt(10);
	const hashedPassword = await bcrypt.hash(password, salt);

	const user = await User.create({
		name,
		email,
		password: hashedPassword,
	});

	if (user) {
		res.status(201).json({
			id: user.id,
			name: user.name,
			email: user.email,
			token: generateToken(user._id),
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});

// @desc Register user
//@route GET /api/user
//@access Public
const loginUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	// Find the user by email
	const checkedUser = await User.findOne({
		email: new RegExp(`^${email}$`, 'i'),
	});

	// If no user is found with the provided email
	if (!checkedUser) {
		return res.status(401).json({ error: 'Invalid email or password' });
	}

	// Compare the provided password with the stored hashed password
	const isPasswordMatch = await bcrypt.compare(password, checkedUser.password);

	// If the passwords don't match
	if (!isPasswordMatch) {
		return res.status(401).json({ error: 'Invalid password' });
	}

	// Generate a JSON Web Token (JWT) for the authenticated user
	const token = generateToken(checkedUser._id);

	// Return the user data and the JWT token
	res.status(200).json({
		id: checkedUser._id,
		name: checkedUser.name,
		email: checkedUser.email,
		token,
	});
});

const getMe = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);

	if (!user) {
		res.status(404);
		throw new Error('User not found');
	}

	res.status(200).json({
		id: user._id,
		name: user.name,
		email: user.email,
	});
});

const generateToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

module.exports = {
	registerUser,
	loginUser,
	getMe,
};
