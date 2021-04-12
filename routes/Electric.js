// // const Wallet = require('../model/Wallet');
// const express = require("express");
// const User = require("../model/User");
// const router = express.Router();
// const auth = require("../middleware/auth");
// const axios = require("axios");
// const { v4: uuidv4 } = require("uuid");
// const Transaction = require("../model/Transaction");
// const Verify = require("../model/Verify");

// router.get("/verifyNumber", auth, async (req, res) => {
//   // const userId = await User.findById(req.user._id);
//   // console.log(userId, "transactions");
//   const verify = await Verify.find({ userId: req.user._id });
//   res.json(verify);
// });

// // get all electric
// router.get("/getElectric", auth, async (req, res) => {
//   // const userId = await User.findById(req.user._id);
//   // console.log(userId, "transactions");
//   // const transaction = await Transaction.find({ walletId: req.user.walletId });
//   // res.json(transaction);
//   try {
//     const transaction = await Transaction.find({ userId: req.user._id });
//     if (!transaction) throw Error("No items");

//     res.status(200).json(transaction);
//   } catch (e) {
//     res.status(400).json({ msg: e.message });
//   }
// });

// router.post("/verifyNumber", auth, async (req, res, error) => {
//   const { meter, service, select, transactionId } = req.body;

//   const user = `${process.env.email_login}:${process.env.password_login}`;
//   const base64 = Buffer.from(user).toString("base64");

//   config = {
//     headers: {
//       Authorization: `Basic ${base64}`,
//     },
//   };

//   const body = {
//     billersCode: meter,
//     serviceID: service,
//     type: select,
//   };

//   // const userId = await Wallet.findById(req.user.walletId);

//   axios
//     .post(`${process.env.verifyMeterNumber}`, body, config)
//     .then((response) => {
//       // console.log(response);
//       const verify = new Verify({
//         Customer_Name: response.data.content.Customer_Name,
//         Meter_Number: response.data.content.Meter_Number,
//         Address: response.data.content.Address,
//         transactionID: req.body.transactionId,
//         // walletId: userId._id,
//         select: select,
//       });
//       //verify.save();
//       if (response.data.content.WrongBillersCode == false) {
//         res.status(200).send({
//           success: true,
//           verify: verify,
//           msg: "Meter Number Successfully verified",
//         });
//         return;
//         // console.log(response.data);
//       } else {
//         throw err;
//       }
//     })
//     .catch((err) => {
//       res.status(400).json({
//         success: false,
//         msg: "Incorrect meter number. Please try with a correct one",
//       });
//     });
// });

// // pay prepaidMeter
// router.post("/prepaidMeterPayment", auth, async (req, res) => {
//   const { name, amount, meter, service, select, phone } = req.body;

//   const requestId = uuidv4();

//   const user = `${process.env.email_login}:${process.env.password_login}`;
//   const base64 = Buffer.from(user).toString("base64");

//   const config = {
//     headers: {
//       Authorization: `Basic ${base64}`,
//     },
//   };

//   const body = {
//     request_id: requestId,
//     serviceID: service,
//     billerCode: meter,
//     variation_code: select,
//     amount: amount,
//     phone: phone,
//   };

//   // const userId = await Wallet.findById(req.user.walletId);
//   const userId = await User.findById(req.user._id);

//   axios
//     .post(`${process.env.prepaidMeterPayment}`, body, config)
//     .then((res) => {
//       const transaction = new Transaction({
//         Customer_Name: res.data.content.Customer_Name,
//         Meter_Number: meter,
//         Address: res.data.content.Address,
//         userId: userId._id,
//         type: res.data.content.type,
//         date: res.data.transaction_date.date,
//         response_description: res.data.response_description,
//         amount: amount,
//         product_name: res.data.content.product_name,
//       });
//       transaction.save();
//       if (res.data.response_description === "TRANSACTION SUCCESSFUL") {
//         res.status(200).json({
//           transaction,
//           msg: "success",
//         });
//         return;
//       } else {
//         throw err;
//       }
//       // if (res.data.response_description === 'BELOW MINIMUM AMOUNT ALLOWED') {
//       // 	throw err;
//       // } else {
//       // 	res.status(200).json({
//       // 		msg: 'success'
//       // 	});
//       // }
//     })
//     .catch((err) => {
//       res.status(400).json({
//         msg: err,
//       });
//     });
//   // }
// });

// // pay postpaidMeter
// router.post("/postpaidMeterPayment", auth, async (req, res, err) => {
//   const { name, amount, meter, service, select, phone } = req.body;

//   const requestId = uuidv4();

//   const user = `${process.env.email_login}:${process.env.password_login}`;
//   const base64 = Buffer.from(user).toString("base64");

//   const config = {
//     headers: {
//       Authorization: `Basic ${base64}`,
//     },
//   };

//   const body = {
//     request_id: requestId,
//     serviceID: service,
//     billerCode: meter,
//     variation_code: select,
//     amount: amount,
//     phone: phone,
//   };

//   // console.log(body);

//   // const userId = await Wallet.findById(req.user.walletId);
//   const userId = await User.findById(req.user._id);

//   axios
//     .post(`${process.env.postpaidMeterPayment}`, body, config)
//     .then((response) => {
//       console.log(response.data);
//       // console.log(res.data);
//       const transaction = new Transaction({
//         Customer_Name: response.data.content.Customer_Name,
//         Meter_Number: meter,
//         Address: response.data.content.Address,
//         userId: userId._id,
//         type: response.data.content.type,
//         // date: res.data.transaction_date.date,
//         response_description: response.data.response_description,
//         amount: amount,
//         select: select,
//         product_name: response.data.content.product_name,
//       });

//       transaction.save();
//       if (response.data.response_description === "TRANSACTION SUCCESSFUL") {
//         res.status(200).json({
//           transaction,
//           msg: "success",
//         });
//         return;
//       } else {
//         throw err;
//       }
//     })
//     .catch((err) => {
//       // res.status(400).json({
//       //   msg: "Below minimum amount allowed",
//       // });
//       console.log(err);
//     });
//   // }
// });

// // single electric tranx
// router.post("/ElectrictransAction", auth, async (req, res) => {
//   const { trans } = req.body;
//   const requestId = uuidv4();

//   const user = `${process.env.email_login}:${process.env.password_login}`;
//   const base64 = Buffer.from(user).toString("base64");

//   const uniqueId = uuidv4();

//   const config = {
//     headers: {
//       Authorization: `Basic ${base64}`,
//     },
//   };

//   const body = {
//     request_id: trans,
//   };

//   // const userId = await Wallet.findById(req.user.walletId);
//   const userId = await User.findById(req.user._id);

//   axios
//     .post(`${process.env.singleElectric}`, body, config)
//     .then((res) => {
//       const transaction = new Transaction({
//         amount: response.data.content.transactions.amount,
//         requestId: req.body.trans,
//         product_name: response.data.content.transactions.type,
//         date: response.data.transaction_date.date,
//         total_amount: response.data.content.transactions.total_amount,
//         transactionId: response.data.content.transactions.transactionId,
//         status: response.data.response_description,
//         userId: userId._id,
//         uniqueId: uniqueId,
//       });
//       //trans.save();
//       if (
//         response.data.content.transactionId ==
//         response.data.content.transactionId
//       ) {
//         res.status(200).json({
//           transaction,
//         });
//         return;
//       } else {
//         throw err;
//       }
//     })
//     .catch((err) =>
//       res.status(400).json({
//         msg: "Error occured while querying transaction",
//       })
//     );
// });

// module.exports = router;

// const Wallet = require("../model/Wallet");
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const Electric = require("../model/Electric");
const Verify = require("../model/Verify");
const User = require("../model/User");
const Transaction = require("../model/Transaction");

router.get("/verifyNumber", auth, async (req, res) => {
  const verify = await Verify.find({ userId: req.user._id });
  res.json(verify);
});

// get all electric
router.get("/getElectric", auth, async (req, res) => {
  try {
    const transaction = await Transaction.find({ userId: req.user._id });
    if (!transaction) throw Error("No items");

    res.status(200).json(transaction);
  } catch (e) {
    res.status(400).json({ msg: e.message });
  }
});

router.post("/verifyNumber", auth, async (req, res, error) => {
  const { meter, service, select } = req.body;

  const user = `${process.env.email_login}:${process.env.password_login}`;
  const base64 = Buffer.from(user).toString("base64");

  config = {
    headers: {
      Authorization: `Basic ${base64}`,
    },
  };

  const body = {
    billersCode: meter,
    serviceID: service,
    type: select,
  };

  const userId = await User.findById(req.user._id);

  axios
    .post(`${process.env.verifyMeterNumber}`, body, config)
    .then((response) => {
      const verify = new Verify({
        Customer_Name: response.data.content.Customer_Name,
        Meter_Number: response.data.content.Meter_Number,
        Address: response.data.content.Address,
        // transactionID: req.body.transactionId,
        userId: userId._id,
        select: select,
      });
      // verify.save();
      if (response.data.content.WrongBillersCode == false) {
        res.status(200).json({
          verify,
          success: true,
          msg: "success",
        });
        return;
      } else {
        throw err;
      }
    })
    .catch((err) => {
      res.status(400).json({
        success: false,
        msg: "Incorrect meter number. Please try with a correct one",
      });
    });
});

router.post("/prepaidMeterPayment", auth, async (req, res) => {
  const { name, amount, meter, service, select, phone, uuid } = req.body;

  const requestId = uuidv4();

  const user = `${process.env.email_login}:${process.env.password_login}`;
  const base64 = Buffer.from(user).toString("base64");

  const config = {
    headers: {
      Authorization: `Basic ${base64}`,
    },
  };

  const body = {
    request_id: uuid,
    serviceID: service,
    billersCode: meter,
    variation_code: select,
    amount: amount,
    phone: phone,
  };

  const userId = await User.findById(req.user._id);

  // if (userId.wallet < amount) {
  //   res.status(400).json({
  //     msg: "Wallet balance is low. please fund account",
  //   });
  //   return;
  // } else {
  axios
    .post(`${process.env.prepaidMeterPayment}`, body, config)
    .then((res) => {
      console.log(res.data);
      const transaction = new Transaction({
        Customer_Name: res.data.content.Customer_Name,
        Meter_Number: meter,
        Address: res.data.content.Address,
        userId: userId._id,
        type: res.data.content.type,
        date: res.data.transaction_date.date,
        response_description: res.data.response_description,
        amount: amount,
        product_name: res.data.content.product_name,
        uuid: uuid
      });
      transaction.save();
      if (res.data.response_description === "BELOW MINIMUM AMOUNT ALLOWED") {
        throw err;
      } else {
        res.status(200).json({
          msg: "success",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        msg: "Below minimum amount allowed",
      });
    });
  // }
});

router.post("/postpaidMeterPayment", auth, async (req, res) => {
  const { name, amount, meter, service, select, phone } = req.body;

  const requestId = uuidv4();

  const user = `${process.env.email_login}:${process.env.password_login}`;
  const base64 = Buffer.from(user).toString("base64");

  const config = {
    headers: {
      Authorization: `Basic ${base64}`,
    },
  };

  const body = {
    request_id: requestId,
    serviceID: service,
    billersCode: meter,
    variation_code: select,
    amount: amount,
    phone: phone,
  };

  // console.log(body);

  const userId = await User.findById(req.user._id);

  axios
    .post(`${process.env.postpaidMeterPayment}`, body, config)
    .then((response) => {
      // console.log(res);
      const transaction = new Transaction({
        Customer_Name: response.data.content.Customer_Name,
        Meter_Number: meter,
        Address: response.data.content.Address,
        userId: userId._id,
        type: response.data.content.type,
        date: response.data.transaction_date.date,
        response_description: response.data.response_description,
        amount: amount,
        select: select,
        product_name: response.data.content.product_name,
      });
      console.log(transaction);
      transaction.save();
      if (response.data.response_description === "BELOW MINIMUM AMOUNT ALLOWED") {
        throw err;
      } else {
        res.status(200).json({
          transaction,
          msg: "success",
        });
      }
    })
    .catch((err) => {
      res.status(400).json({
        msg: "Below minimum amount allowed",
      });
    });
  //}
});

// prepaid single query
router.post("/DataTransaction", auth, async (req, res) => {
  const { amount, service, phone, variation } = req.body;
  const requestId = uuidv4();

  const user = `${process.env.email_login}:${process.env.password_login}`;
  const base64 = Buffer.from(user).toString("base64");

  const uniqueId = uuidv4();

  const config = {
    headers: {
      Authorization: `Basic ${base64}`,
    },
  };

  const body = {
    request_id: requestId,
    serviceID: service,
    amount: amount,
    billersCode: phone,
    variation_code: variation,
    amount: amount,
    phone: phone,
  };

  const userId = await User.findById(req.user._id);

  axios
    .post(`${process.env.singleElectric}`, body, config)
    .then((res) => {
      const trans = new Transaction({
        amount: response.data.content.transactions.amount,
        requestId: req.body.trans,
        product_name: response.data.content.transactions.type,
        date: response.data.transaction_date.date,
        total_amount: response.data.content.transactions.total_amount,
        transactionId: response.data.content.transactions.transactionId,
        status: response.data.response_description,
        userId: userId._id,
        uniqueId: uniqueId,
      });
      //trans.save();
      if (
        response.data.content.transactionId ==
        response.data.content.transactionId
      ) {
        res.status(200).json({
          transaction,
          success: true,
          msg: "success",
        });
        return;
      } else {
        const transaction = new Transaction({
          status: response.data.response_description,
        });
        transaction.save();
        throw err;
      }
    })
    .catch((err) =>
      res.status(400).json({
        msg: "Error occured while querying transaction",
      })
    );
});

module.exports = router;
