const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const bankModel = require("../models/bankModel");
const cryptoModel = require("../models/cryptoModel");
const { hashPassword, comparePassword } = require("../helpers/auth");

const AdminGetCrypto = async (req, res) => {
  const { email } = req.body;
  const ifAdmin = await Admin.findOne({ email: email });
  if (ifAdmin) {
    const bankR = await cryptoModel.find();
    return res.json(bankR)
  }

  return res.json({
    error: "Unidentify Admin 404"
  })
}

const AdminGetBankR = async (req, res) => {
  const { email } = req.body;

  const ifAdmin = await Admin.findOne({ email: email });
  if (ifAdmin) {
    const bankR = await bankModel.find();
    return res.json(bankR)
  }

  return res.json({
    error: "Unidentify Admin 404"
  })
}

const getCryptoRecords = async (req, res) => {
  const { email } = req.body;
  const find = await cryptoModel.find({ email: email });

  if (find) {
    return res.json(find)
  }

  return res.json({});
}

const getBankRecords = async (req, res) => {
  const { email } = req.body;

  const find = await bankModel.find({ email: email });

  if (find) {
    return res.json(find)
  }

  return res.json({});
}

const getUser = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email: email });
  if (!user) {
    return res.json({
      error: "unidentyfied user",
    });
  }
  return res.json(user);
};

const withdrawCrypto = async (req, res) => {
  const { email, value, walletAddress } = req.body;

  if (!value || value <= 10) {
    return res.json({
      error: "Amount must be provided and must be greater than 10",
    });
  }

  if (!walletAddress) {
    return res.json({
      error: "A valid wallet address is required",
    });
  }

  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    return res.status(404).json({
      error: "Invalid request, Unidentify user",
    });
  }

  if (findUser.deposit >= value) {
    await cryptoModel.create({
      amount: value,
      email: email,
      cryptoAddress: walletAddress,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { deposit: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.profit >= value) {
    await cryptoModel.create({
      amount: value,
      cryptoAddress: walletAddress,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { profit: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.bonuse >= value) {
    await cryptoModel.create({
      amount: value,
      cryptoAddress: walletAddress,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { bonuse: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.deposit <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }

  if (findUser.profit <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }

  if (findUser.bonuse <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }
};

const withdrawBank = async (req, res) => {
  const { email, value, bank_name, account_name, account_number, swift_code } =
    req.body;

  if (!value || value <= 10) {
    return res.json({
      error: "Amount is required and must be greater than 10",
    });
  }

  if (!bank_name) {
    return res.json({
      error: "Bank name must be provided, to sign Withdrawal",
    });
  }

  if (!account_name) {
    return res.json({
      error: "Account Name must be provided, to sign Withdrawal",
    });
  }

  if (!account_number) {
    return res.json({
      error: "Account number must be provided, to sign Withdrawal",
    });
  }

  if (!swift_code) {
    return res.json({
      error: "Swift-Code must be provided, to sign Withdrawal",
    });
  }

  const findUser = await User.findOne({ email: email });
  if (!findUser) {
    return res.status(404).json({
      error: "Invalid request, Unidentify user",
    });
  }

  console.log(findUser.deposit);
  if (findUser.deposit >= value) {
    await bankModel.create({
      amount: value,
      bank: bank_name,
      name: account_name,
      swiftCode: swift_code,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { deposit: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.profit >= value) {
    await bankModel.create({
      amount: value,
      bank: bank_name,
      name: account_name,
      swiftCode: swift_code,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { profit: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.bonuse >= value) {
    await bankModel.create({
      amount: value,
      bank: bank_name,
      name: account_name,
      swiftCode: swift_code,
      email: email,
      reg_date: new Date(),
    });

    await User.updateOne({ email: email }, { $inc: { bonuse: -value } });
    return res.json({
      success: "withdrawal request sent",
    });
  }

  if (findUser.deposit <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }

  if (findUser.profit <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }

  if (findUser.bonuse <= value) {
    return res.json({
      error: "Insufficient Balance!",
    });
  }
};

const addBalance = async (req, res) => {
  const { id, value, type } = req.body;

  if (!id) {
    return res.json({
      error: "user ID must be provided!",
    });
  }

  if (!value || value < 1) {
    return res.json({
      error: "value to be added is needed and must be greater than 0",
    });
  }

  if (type == "deposit") {
    await User.updateOne({ _id: id }, { $set: { deposit: value } });
    return res.status(200).json({
      success: "Deposit Balance Added Successfully!",
    });
  }

  if (type == "bonuse") {
    await User.updateOne({ _id: id }, { $set: { bonuse: value } });
    return res.status(200).json({
      success: "Bonuse Balance Added Successfully!",
    });
  }

  if (type == "profit") {
    await User.updateOne({ _id: id }, { $set: { profit: value } });
    return res.status(200).json({
      success: "Profit Balance Added Successfully!",
    });
  }
};

const getUsers = async (req, res) => {
  const users = await User.find();
  if (User.countDocuments < 1) {
    return res.status(404).json({
      message: "No User Found",
    });
  }

  return res.json(users);
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email) {
      return res.json({
        error: "email is required",
      });
    }

    //Check if password is goood
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be atleast six(6) characters",
      });
    }

    //Check if user exist
    const user = await Admin.findOne({ email });
    const adminCount = await Admin.countDocuments();
    if (!user && adminCount < 1) {
      const hashedPassword = await hashPassword(password);
      await Admin.create({
        name: "Admin",
        email: "example@gmail.com",
        password: hashedPassword,
        req_date: new Date(),
      });
      return res.json({
        new: "New admin created Contact lordy-popdy for Details!",
      });
    }
    //Check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { name: user.name, email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      return res.json({
        error:
          "password not match our database, password should be atleast six(6) character",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //Check if user exist
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found",
      });
    }
    //Check if password match
    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { name: user.name, email: user.email, id: user._id },
        process.env.JWT_SECRET,
        {},
        (error, token) => {
          if (error) throw error;
          res.cookie("token", token).json(user);
        }
      );
    }
    if (!match) {
      return res.json({
        error:
          "password not match our database, password should be atleast six(6) character",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const test = async (req, res) => {
  return res.status(200).json({ message: "Connected Succesfully!" });
};

const createUser = async (req, res) => {
  const {
    name,
    email,
    country,
    currency,
    account,
    password,
    comfirm_password,
  } = req.body;
  try {
    //Check if name was taken
    if (!name) {
      return res.json({
        error: "name is required",
      });
    }

    //check if email is provided
    if (!email) {
      return res.json({
        error: "email is required!",
      });
    }

    //check if country is provided
    if (!country) {
      return res.json({
        error: "country is required!",
      });
    }

    //check if currency is provided
    if (!currency) {
      return res.json({
        error: "currency is required!",
      });
    }

    //check if country is provided
    if (!account) {
      return res.json({
        error: "account is required!",
      });
    }

    //Check if password is goood
    if (!password || password.length < 6) {
      return res.json({
        error: "password is required and should be atleast six(6) characters",
      });
    }

    //Check comfirmPassword
    if (password !== comfirm_password) {
      return res.json({
        error: "Comfirm password must match password",
      });
    }

    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "email is taken",
      });
    }

    // const adminTotalUserUpdate = await Admin.updateOne(
    //   { adminEmail: "bitclubcontract@gmail.com" },
    //   { $inc: { totalUser: 1 } }
    // );

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name: name,
      email: email,
      country: country,
      currency: currency,
      account: account,
      password: hashedPassword,
      req_date: new Date(),
    });

    console.log(user);
    if (user) {
      return res.json(user);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  getUser,
  getUsers,
  loginUser,
  createUser,
  loginAdmin,
  addBalance,
  withdrawBank,
  AdminGetBankR,
  AdminGetCrypto,
  withdrawCrypto,
  getBankRecords,
  getCryptoRecords
};
