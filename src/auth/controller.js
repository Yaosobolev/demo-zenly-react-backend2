const pool = require("../../db");
const queries = require("./queries");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function register(req, res) {
  try {
    const { name, password } = req.body;
    const checked = await pool.query(queries.getUserByUsername, [name]);

    if (checked.rows.length > 0) {
      return res.status(400).json({
        message: "Пользователь с таким именем существует, введите другое имя ",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(queries.setUsers, [name, hashedPassword]);
    const userId = result.rows[0].id;

    const accessToken = jwt.sign({ userId }, "your_access_secret_key", {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign({ userId }, "your_refresh_secret_key", {
      expiresIn: "7d",
    });

    res.status(201).json({
      message: "Пользователь зарегистрирован",
      userId,
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
}

async function login(req, res) {
  try {
    const { name, password } = req.body;
    const result = await pool.query(queries.getUserByUsername, [name]);
    const user = result.rows[0];

    if (!user) {
      return res
        .status(401)
        .json({ message: "Пользователь с таким именем не найден" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Неправильный пароль" });
    }

    const accessToken = jwt.sign(
      { userId: user.id },
      "your_access_secret_key",
      { expiresIn: "1h" }
    );
    const refreshToken = jwt.sign(
      { userId: user.id },
      "your_refresh_secret_key",
      { expiresIn: "7d" }
    );

    res.cookie("accessToken", accessToken, { httpOnly: true });
    res.cookie("refreshToken", refreshToken, { httpOnly: true });
    res
      .status(200)
      .json({ message: "Авторизация успешна", accessToken, refreshToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
}

async function getUserByUsername(req, res) {
  try {
    const { name } = req.query;
    const checked = await pool.query(queries.getUserByUsername, [name]);
    const user = checked.rows[0];

    if (checked.rows.length > 0) {
      return res.status(200).json({
        message: "Пользователь с таким именем существует ",
        user,
      });
    } else {
      res.status(400).json({
        message: "Пользователь с таким именем существует ",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Ошибка сервера" });
  }
}

module.exports = {
  register,
  login,
  getUserByUsername,
};
