// const passport = require("passport");
// const FacebookStrategy = require("passport-facebook").Strategy;
// const { FacebookUser } = require("../models/users");
// const facebookRouter = require("express").Router();

// const facebook_client_id = process.env.FACEBOOK_ID;
// const facebook_client_secret = process.env.FACEBOOK_SECRET;
// const facebook_cbURL = process.env.FACEBOOK_CALLBACK_URL;

// passport.use(
//   new FacebookStrategy(
//     {
//       clientID: facebook_client_id,
//       clientSecret: facebook_client_secret,
//       callbackURL: facebook_cbURL,
//     },
//     (accessToken, refreshToken, profile, done) => {
//       console.log(profile);
//       FacebookUser.findOne({ facebookId: profile.id }) 
//         .then((currentFacebookUser) => {
//           if (currentFacebookUser) {
//             console.log(`Facebook current user: ${currentFacebookUser}`);
//             done(null, profile);
//           } else {
//             new FacebookUser({
//               username: profile.displayName,
//               facebookId: profile.id,
//               thumbnail: profile.photos[0].value,
//             })
//               .save()
//               .then((newFacebookUser) => {
//                 console.log(`New Facebook user created: ${newFacebookUser}`);
//                 done(null, newFacebookUser);
//               })
//               .catch((err) => {
//                 console.error(`Error creating Facebook user ${err}`);
//                 done(err, null);
//               });
//           }
//         })
//         .catch((err) => {
//           console.error(`Error finding Facebook user ${err}`);
//           done(err, null);
//         });
//     }
//   )
// );

// // For Facebook
// facebookRouter.get("/signout", (req, res) => {
//   try {
//     req.logout();
//     req.session.destroy((err) => {
//       if (err) {
//         console.error("Error destroying session:", err);
//         return res.status(500).json({ message: "Failed to sign you out." });
//       }
//       console.log("Session destroyed...");
//       return res.redirect("/"); 
//     });
//   } catch (err) {
//     console.error("Error logging out:", err);
//     res.status(500).json({ message: "Failed to sign you out." });
//   }
// });

// module.exports = facebookRouter;
