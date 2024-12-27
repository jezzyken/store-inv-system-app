const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  isAuthenticated,
  isAdmin,
} = require("../../middlewares/auth.middleware");
const { cloudinary, uploadToCloudinary } = require("../../config/cloudinary");

router.post(
  "/register",
  uploadToCloudinary.single("image"),
  async (req, res) => {
    try {
      const { fname, lname, email, password, role } = req.body;
      let imageUrl = "";

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        imageUrl = result.secure_url;
      }

      const user = await User.create({
        fname,
        lname,
        email,
        password,
        role,
        image: imageUrl,
      });

      const token = jwt.sign(
        {
          id: user._id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "24h",
        }
      );

      const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

      res.status(201).json({
        success: true,
        token,
        expiresIn,
        user: {
          id: user._id,
          fname: user.fname,
          lname: user.lname,
          email: user.email,
          role: user.role,
          image: user.image,
        },
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    console.log(email, password);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    const expiresIn = new Date(Date.now() + 24 * 60 * 60 * 1000);

    res.json({
      success: true,
      token,
      expiresIn,
      user: {
        id: user._id,
        fname: user.fname,
        lname: user.lname,
        email: user.email,
        role: user.role,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put(
  "/:id",
  isAuthenticated,
  uploadToCloudinary.single("image"),
  async (req, res) => {
    try {
      const { fname, lname, email, status, role } = req.body;
      let updateData = { fname, lname, email, status, role };

      if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path);
        updateData.image = result.secure_url;

        const oldUser = await User.findById(req.params.id);
        if (oldUser.image) {
          const publicId = oldUser.image.split("/").pop().split(".")[0];
          await cloudinary.uploader.destroy(publicId);
        }
      }

      const user = await User.findByIdAndUpdate(req.params.id, updateData, {
        new: true,
      }).select("-password");

      if (!user) {
        return res
          .status(404)
          .json({ success: false, message: "User not found" });
      }

      res.json({ success: true, user });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
);

router.delete("/:id", isAuthenticated, isAdmin, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    if (user.image) {
      const publicId = user.image.split("/").pop().split(".")[0];
      await cloudinary.uploader.destroy(publicId);
    }

    await user.deleteOne();
    res.json({ success: true, message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.patch("/:id/change-password", isAuthenticated, async (req, res) => {
  try {
    const { newPassword } = req.body;
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.password = newPassword;
    await user.save();

    res.json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
