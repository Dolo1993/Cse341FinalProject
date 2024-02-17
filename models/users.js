// This file will be responsible for all the users, AppUser, GitHub, Google, and Facebook

const mongoose = require("mongoose"); 

// This is the github user schema.
const GithubUserSchema = mongoose.Schema({
  username: String,
  githubId: String,
  thumbnail: String,
});

// This is the google user schema.
const GoogleUserSchema = mongoose.Schema({
  username: String,
  googleId: String,
  thumbnail: String,
});

// This is the facebook user schema.
// const FacebookUserSchema = mongoose.Schema({
//   username: String,
//   facebookId: String,
//   thumbnail: String,
// });

const GithubUser = mongoose.model("github_user", GithubUserSchema);
const GoogleUser = mongoose.model("google_user", GoogleUserSchema);
// const FacebookUser = mongoose.model("facebook_user", FacebookUserSchema);

module.exports = {
  GithubUser,
  GoogleUser,
  // FacebookUser,
};
