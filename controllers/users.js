"use strict";

module.exports = function (_, passport, User) {
  return {
    SetRouting: function (router) {
      router.get("/", this.indexPage);
      router.get("/signup", this.signupPage);
      router.get("/home", this.homePage);

      router.post("/signup", User.SignUpValidation, this.postSignup);
    },
    indexPage: function (req, res) {
      return res.render("index", { test: "Let it work" });
    },
    signupPage: function (req, res) {
      const errors = req.flash("error");
      return res.render("signup", {
        title: "login to system",
        messages: errors,
        hasErrors: errors.length > 0,
      });
    },
    postSignup: passport.authenticate("local.signup", {
      successRedirect: "/home",
      failureRedirect: "/signup",
      faliureFlash: true,
    }),
    homePage: function (req, res) {
      return res.render("home");
    },
  };
};
