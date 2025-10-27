const Address = require("../../models/address");

const addAddress = async (req, res) => {
  try {
    const { userId, address, city, pincode, phone, notes } = req.body;

    if (!userId || !address || !city || !pincode || !phone || !notes) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Provided" });
    }

    const newlyCreatedAddress = new Address({
      userId: userId,
      address: address,
      city: city,
      phone: phone,
      pincode: pincode,
      notes: notes,
    });

    await newlyCreatedAddress.save();

    return res.status(200).json({
      success: true,
      message: "Address Saved Successfully",
      data: newlyCreatedAddress,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const fetchAllAddress = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User not Found",
      });
    }

    const addressList = await Address.find({ userId });

    return res.status(200).json({
      success: true,
      data: addressList,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const editAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    const formData = req.body;

    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id and address id required",
      });
    }

    const address = await Address.findOneAndUpdate(
      {
        userId,
        _id: addressId,
      },
      formData,
      { new: true }
    );

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not Found",
      });
    }

    res.status(200).json({
      success: true,
      data: address,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { userId, addressId } = req.params;
    // console.log( userId, addressId )
    if (!userId || !addressId) {
      return res.status(400).json({
        success: false,
        message: "User id and address id required",
      });
    }

    const address = await Address.findOneAndDelete({ _id: addressId, userId });

    if (!address) {
      return res.status(404).json({
        success: false,
        message: "Address not Found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Address Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error",
    });
  }
};

module.exports = { addAddress, deleteAddress, editAddress, fetchAllAddress };
