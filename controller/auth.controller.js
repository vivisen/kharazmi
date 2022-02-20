const ErrorResponse = require("../utils/ErrorResponse");
const authValidation = require("../validation/auth.validation");
const AuthService = require("../services/auth.service");

module.exports.regiserType = (req, res) => {
  res.render("register-type", {
    title: "ثبت نام در وبسایت | هنرستان خوارزمی",
  });
};

module.exports.register = (req, res) => {
  const { type } = req.query;
  res.render("register", {
    title: "ثبت نام در وبسایت | هنرستان خوارزمی",
    registerType: type,
  });
};

module.exports.login = (req, res) => {
  res.render("login", {
    title: "ورود به وبسایت | هنرستان خوارزمی",
  });
};

module.exports.handleRegisterAdmin = async (req, res) => {
  const validate = authValidation.adminValidation.validate(req.body);
  if (validate.error) {
    throw new ErrorResponse(422, validate.error.message, "back");
  }
  if (!req.files.profileImg) {
    throw new ErrorResponse(402, "عکس پروفایل الزامی است", "back");
  }
  const adminDto = {
    ...req.body,
    profileImg: req.files.profileImg[0],
  };
  await new AuthService().registerAdmin(adminDto);
  req.flash("success", "ثبت نام با موفقیت انجام شد!");
  res.redirect("/login");
};

module.exports.handleRegisterTeacher = async (req, res) => {
  const validate = authValidation.teacherValidation.validate(req.body);
  if (validate.error) {
    throw new ErrorResponse(422, validate.error.message, "back");
  }
  if (!req.files.profileImg) {
    throw new ErrorResponse(404, "عکس پروفایل الزامی است", "back");
  }
  const teacherDto = {
    ...req.body,
    profileImg: req.files.profileImg[0],
  };
  await new AuthService().registerTeacher(teacherDto);
  req.flash(
    "success",
    "ثبت نام شما با موفقیت انجام شد و پس از تأیید حساب کاربری شما از سوی مدیریت، میتوانید وارد حساب خود شوید!",
  );
  res.redirect("/");
};

module.exports.handleRegisterUser = async (req, res) => {
  const validate = authValidation.normalUserValidation.validate(req.body);
  if (validate.error) {
    throw new ErrorResponse(422, validate.error.message, "back");
  }
  if (!req.files.profileImg) {
    throw new ErrorResponse(404, "عکس پروفایل الزامی است", "back");
  }
  const userDto = { ...req.body, profileImg: req.files.profileImg[0] };
  await new AuthService().registerUser(userDto);
  req.flash(
    "success",
    "ثبت نام شما با موفقیت انجام شد و میتوانید وارد اکانت خود شوید!",
  );
  res.redirect("/login");
};

module.exports.handleLogin = async (req, res, next) => {
  const validate = authValidation.loginValidation.validate(req.body);
  if (validate.error) {
    throw new ErrorResponse(422, validate.error.message, "/login");
  }
  const userDto = { ...req.body };
  const user = await new AuthService().login(userDto);
  req.session.user = user;
  req.flash("success", "خــــوش آمــــدیــــد");
  next();
};

module.exports.handleRememberMe = (req, res) => {
  const { rememberme } = req.body;
  if (rememberme === "on") {
    req.session.cookie.originalMaxAge = 60 * 60 * 60 * 10000; // 15 minutes
  }
  res.redirect("/");
};

module.exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) throw new ErrorResponse(500, "Something went wrong!", "/");
    res.redirect("/");
  });
};

module.exports.forgetPassword = (req, res) => {
  res.render("forget-password", {
    title: "فراموشی رمز عبور!",
  });
};

module.exports.handleForgetPassword = async (req, res) => {
  const userDto = { ...req.body };
  await new AuthService().forgetPassword(userDto);
  req.flash("success", "ایمیل حاوی لینک بازنشانی رمز عبور برایتان ارسال شد!");
  res.redirect("/");
};

module.exports.resetPassword = (req, res) => {
  const { token } = req.params;
  res.render("reset-password", {
    title: "تغییر رمز عبور",
    token,
  });
};

module.exports.handleResetPassword = async (req, res) => {
  const userDto = { ...req.body };
  await new AuthService().resetPassword(userDto);
  req.flash("success", "رمز عبور شما با موفقیت تعویض شد!");
  res.redirect("/login");
};
