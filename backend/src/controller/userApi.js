import { SecretConfigs } from "../configs/SecretConfigs.js";
import { db } from "../dbConnection.js";
import { generateText } from "../geminiService.js";
import jwt from 'jsonwebtoken'
 

export class userApi {
  static async searchPrompt(req, res) {
    let { prompt } = req.body;
    try {
      let response = await generateText(prompt);
      return res.status(200).send({ message: "success", data: response });
    } catch (error) {
      console.log(error);
      return res.status(400).send(error);
    }
  }
 static async signup(req, res) {
  const signupForm = req.body;

  try {
    if (!signupForm) {
      return res.status(400).send({ message: "Signup form is required" });
    }

    // password confirmation check
    if (signupForm.password !== signupForm.confirmPassword) {
      return res.status(400).send({ message: "Passwords do not match" });
    }

    // insert into DB
    await db.query(
      "INSERT INTO signup (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [
        signupForm.fname,
        signupForm.lname,
        signupForm.email,
        signupForm.password,
      ]
    );

    return res.status(200).send({ message: "success", status: 200 });
  } catch (error) {
    console.error("Signup error:", error);
    return res.status(500).send({ message: "Internal server error", error });
  }
}
static async login(req, res) {
  const loginForm = req.body;

  try {
    // find user by email
    const [rows] = await db.query(
      "SELECT * FROM signup WHERE email=?",
      [loginForm.email]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).send({ message: "Wrong email" });
    }

    const user = rows[0];

    // check password (⚠️ you should hash with bcrypt later)
    if (user.password !== loginForm.password) {
      return res.status(401).send({ message: "Invalid password" });
    }

    // generate JWT token
    const token = jwt.sign(
      {
        id: user.id,
        fname: user.first_name,
        lname: user.last_name,
      },
      SecretConfigs.JWT_SECRET,
      { expiresIn: "3h" }
    );

    return res.status(200).send({
      message: "success",
      status: 200,
      data: { token, user_id: user.id },
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ message: "Internal server error", error });
  }
}

static async search(req, res) {
  const { userId } = req.body;
  

  if (!userId) {
    return res.status(400).send({ message: "userId is required" }); 
  }

  try {
    // ✅ Destructure properly from MySQL2 query response
    const [rows] = await db.query("SELECT * FROM signup WHERE id = ?", [userId]);

    if (rows.length === 0) {
      return res.status(404).send({ message: "User not found" }); 
    }

    return res.status(200).send({
      message: "success",
      data: rows[0], // ✅ return first row
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      message: "Internal server error",
      error: error.message,
    });
  }
}



}
