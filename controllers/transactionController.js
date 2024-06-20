const transactionModel = require("../models/transactionModel");
const moment = require("moment");

exports.getTransaction = async (req, resp) => {
  try {
    const { userid, frequency, type } = req.body;
    const transaction = await transactionModel.find({
      date: {
        $gt: moment().subtract(Number(frequency), "d").toDate(),
      },
      ...(type !== "all" && { type }),
      userid,
    });
    return resp.status(200).json(transaction);
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

exports.addTransaction = async (req, resp) => {
  try {
    const trans = new transactionModel(req.body);
    await trans.save();
    return resp.status(200).send({
      success: true,
      message: "Transaction added successfully",
      trans,
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

exports.editTransaction = async (req, resp) => {
  try {
    const { transactionid } = req.body;
    await transactionModel.findOneAndUpdate(
      { _id: transactionid },{...req.body}
    );
    resp.status(200).send({
      success: true,
      message: "Edit successfull",
    });
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};

exports.deleteTransaction =async(req,resp)=>{
  try {
    const {deleteId}=req.body;
    console.log(deleteId);
    await transactionModel.findOneAndDelete({_id:deleteId})
    resp.status(200).send({
      success:true,
      message:"Deleted Successfull"
    })
  } catch (error) {
    resp.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    })
  }
}
