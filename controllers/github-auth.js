const passport = require("passport");
const GithubStrategy = require("passport-github2").Strategy;
const { GithubUser } = require("../models/users"); // Import the user model
const githubRouter = require("express").Router();

// Passport serializeUser and deserializeUser
passport.serializeUser((user, done) => {
  done(null, user.id);
});

//callback function
passport.deserializeUser(async (id, done) => {
  try {
    const user = await GithubUser.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      GithubUser.findOne({ githubId: profile.id })
        .then((currentGithubUser) => {
          if (currentGithubUser) {
            console.log(`GitHub current user: ${currentGithubUser}`);
            done(null, currentGithubUser); // Pass currentGithubUser instead of profile
          } else {
            new GithubUser({
              username: profile.username,
              githubId: profile.id,
              // Use real name if available, otherwise fallback to GitHub username
              displayName: profile.displayName || profile.username,
              thumbnail: profile._json.avatar_url,
            })
              .save()
              .then((newGithubUser) => {
                console.log(`New github user created: ${newGithubUser}`);
                done(null, newGithubUser);
              })
              .catch((err) => {
                console.error(`Error creating github user ${err}`);
                done(err, null);
              });
          }
        })
        .catch((err) => {
          console.error(`Error finding github user ${err}`);
          done(err, null);
        });
    }
  )
);


githubRouter.get(
  "/",
  passport.authenticate("github", { scope: ["user:email"] })
);

githubRouter.get(
  "/callback",
  passport.authenticate("github", { failureRedirect: "/auth/github/error" }),
  (req, res) => {
    res.redirect("/auth/github/success");
  }
);
githubRouter.get("/success", (req, res) => {
  const userInfo = {
    id: req.user.id, // Use req.user for the authenticated user
    displayName: req.user.displayName || req.user.username, // Use displayName if available, otherwise fallback to username
    provider: "github", // Assuming GitHub provider
    thumbnail: req.user.thumbnail // Add thumbnail to the user info
  };
  res.render("fb-github-success", { user: userInfo });
});

githubRouter.get("/error", (req, res) => {
  res.send("Error logging you in with GitHub...");
});

// For GitHub
githubRouter.get("/signout", (req, res) => {
  try {
    req.logout((err) => {
      if (err) {
        console.error("Error logging out:", err);
        return res.status(500).json({ message: "Failed to sign you out." });
      }
      req.session.destroy((err) => {
        if (err) {
          console.error("Error destroying session:", err);
          return res.status(500).json({ message: "Failed to sign you out." });
        }
        console.log("Session destroyed...");
        return res.redirect("/"); // Redirect to the home page
      });
    });
  } catch (err) {
    console.error("Error logging out:", err);
    res.status(500).json({ message: "Failed to sign you out." });
  }
});

module.exports = githubRouter;
