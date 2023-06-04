const express = require("express");

//const ejs = require("ejs");
const clearbit = require("clearbit");
const validator = require("validator");
const axios = require("axios");
const md5 = require("md5");
const app = express();
const bodyParser = require("body-parser");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = 4000;

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.post("/", async (req, res) => {
  const  {input}  = req.body;
  console.log(input,"input")

  if (!input) {
    return res.status(400).json({ error: "Text is required." });
  }
  if (validator.isEmail(input)) {
    const gravatarUrl = `https://www.gravatar.com/avatar/${input}?d=404`;
    console.log(gravatarUrl,"gravatarUrl")
    //console.log(gravatarUrl,"url")
    try {
      const response = await axios.get(gravatarUrl);
      console.log("gravatar",response)
      if (response.status === 200) {
        res.render("result",{
          // type: "email",
          // text: input,
          // imageUrl: gravatarUrl,

          input:input
        });
      } else {
        throw new Error();
      }
      console.log(input)
    } catch (error) {
      res.render("result", {
        type: "email",
        text: input,
        message: "Could not retrieve Gravatar image for email",
      });
    }
  } else if (validator.isURL(input)) {
    const clearbitUrl = `https://logo.clearbit.com/${input}`;
    try {
      const response = await axios.get(clearbitUrl);
      if (response.status === 200) {
        res.render("result", {
          type: "website",
          input: input,
          imageUrl: clearbitUrl,
        },
        console.log(input,"input"));
      } else {
        throw new Error();
      }
    } catch (error) {
      console.error(error);
      res.render("result", {
        type: "website",
        input: input,
        message: "Could not retrieve website logo for domain",
      });
    }
  } else {
    res.render("result", {
      message: "Invalid input. Please enter a valid email or website domain",
    });
  }
});

app.listen(4000, () => {
  console.log(`App is running on ${port}`);
});

// let updatedInput = {
//   ...input,
//   avatar: avatarUrl,
// };
// console.log(updatedInput);
