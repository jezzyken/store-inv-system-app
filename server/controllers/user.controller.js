const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const service = require("../services/user");

const get = catchAsync(async (req, res) => {
  const result = await service.get();
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const getById = catchAsync(async (req, res, next) => {
  const result = await service.getById(req.params.id);

  if (!result) {
    return next(new AppError("No User found with that ID", 404));
  }
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const add = catchAsync(async (req, res) => {
  const result = await service.add(req);
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

const updatePassword = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({
        success: false,
        message: "Password is required",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { password: hashedPassword },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      result: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating password",
      error: error.message,
    });
  }
});

const update = catchAsync(async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    console.log(updateData)

    delete updateData.password;

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!updatedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      result: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating user",
      error: error.message,
    });
  }
});

const remove = catchAsync(async (req, res) => {
  const result = await Models.findByIdAndDelete(req.params.id);
  const data = {
    success: true,
    result,
  };
  return res.status(200).send(data);
});

module.exports = {
  get,
  getById,
  add,
  updatePassword,
  update,
  remove,
};
