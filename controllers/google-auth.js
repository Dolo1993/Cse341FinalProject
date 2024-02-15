// require("dotenv/config");
// const passport = require("passport");
// const GoogleStrategy = require("passport-google-oauth20").Strategy;
// const { GoogleUser } = require("../models/users");
// const googleRouter = require("express").Router();

// passport.serializeUser(function (user, cb) {
//   cb(null, user);
// });
// passport.deserializeUser(function (obj, cb) {
//   cb(null, obj);
// });

// passport.use(
//   //#swagger.tags=["OAuth"]
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_ID,
//       clientSecret: process.env.GOOGLE_SECRET,
//       callbackURL: process.env.GOOGLE_CALLBACK_URL,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       // console.log(profile);
//       GoogleUser.findOne({ googleId: profile.id })
//         .then((currentGoogleUser) => {
//           if (currentGoogleUser) {
//             // console.log(`Google current user: ${currentGoogleUser}`);
//             done(null, profile);
//           } else {
//             new GoogleUser({
//               username: profile.displayName,
//               googleId: profile.id,
//               thumbnail: profile._json.picture,
//             })
//               .save()
//               .then((newGoogleUser) => {
//                 console.log(`New google user created: ${newGoogleUser}`);
//                 done(null, newGoogleUser);
//               })
//               .catch((err) => {
//                 console.error(`Error creating google user... ${err}`);
//                 done(err, null);
//               });
//           }
//         })
//         .catch((err) => {
//           console.error(`Error finding google user... ${err}`);
//           done(err, null);
//         });
//     }
//   )
// );

// googleRouter.get(
//   "/",
//   passport.authenticate("google", { scope: ["profile", "email"] })
// );

// googleRouter.get(
//   "/callback",
//   passport.authenticate("google", { failureRedirect: "/auth/google/error" }),
//   (req, res) => {
//     res.redirect("/auth/google/success");
//   }
// );

// googleRouter.get("/success", (req, res) => {
//   if (req.isAuthenticated()) {
//     res.render("success", { profile: req.user });
//   } else {
//     res.redirect("/auth/google/error");
//   }
// });

// For Google
// googleRouter.get("/signout", (req, res) => {
//     try {
//       req.logout((err) => {
//         if (err) {
//           console.error("Error logging out:", err);
//           return res.status(500).json({ message: "Failed to sign you out." });
//         }
//         req.session.destroy((err) => {
//           if (err) {
//             console.error("Error destroying session:", err);
//             return res.status(500).json({ message: "Failed to sign you out." });
//           }
//           console.log("Session destroyed...");
//           return res.redirect("/"); // Redirect to the home page
//         });
//       });
//     } catch (err) {
//       console.error("Error logging out:", err);
//       res.status(500).json({ message: "Failed to sign you out." });
//     }
//   });
  
// module.exports = googleRouter;
