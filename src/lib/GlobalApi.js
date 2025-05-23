const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

const login = async (phn, pass) => {
  try {
    let data = JSON.stringify({
      phoneNumber: phn,
      password: pass,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "user/login-profile",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while login ", error?.response?.data?.message);
    return error?.response?.data;
  }
};

const getAllUsers = async (id, token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `business/${id}/employees`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("config", config);

    const response = await axiosClient.request(config);
    console.log("rr by client", response);

    return response?.data;
  } catch (error) {
    console.log("error while fetching users ", error?.response?.data?.message);
    return error?.response?.data;
  }
};

const ActUser = async (id, token) => {
  try {
    let data = JSON.stringify({
      status: "ACTIVE",
    });

    let config = {
      method: "PATCH",
      maxBodyLength: Infinity,
      url: `business/employee/${id}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log(
      "error while activating users ",
      error?.response?.data?.message
    );
    return error?.response?.data;
  }
};

const deActUser = async (id, token) => {
  try {
    let data = JSON.stringify({
      status: "INACTIVE",
    });

    let config = {
      method: "PATCH",
      maxBodyLength: Infinity,
      url: `business/employee/${id}/status`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log(
      "error while deActivating users ",
      error?.response?.data?.message
    );
    return error?.response?.data;
  }
};

const getTransactions = async (token, id, filter) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `wallet/transaction-stats/${id}/${filter}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);

    return response?.data;
  } catch (error) {
    console.log("error while fetching transactions ", error);
    return error?.response?.data;
  }
};

const registerEmp = async (formdata, token, id) => {
  try {
    let data = JSON.stringify({
      businessId: id,
      firstName: formdata?.firstName,
      lastName: formdata?.lastName,
      email: formdata?.email,
      phoneNumber: formdata?.phoneNumber,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "business/employee/create",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);

    return response?.data;
  } catch (error) {
    console.log("error while creating Employee ", error);
    return error?.response?.data;
  }
};

const getReq = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "business/payment-requests?businessId=1&status=PENDING&page=1&limit=20",
      headers: {},
    };

    axios.request(config);
  } catch (error) {}
};

const getAppSettings = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "app-settings",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting app settings ", error);
    return error?.response?.data;
  }
};

const UpdateAppSettings = async (token, formdata) => {
  try {
    let data = JSON.stringify({
      appName: formdata?.appName,
      // appLogo: "https://example.com/logo.png",
      // appIcon: "https://example.com/icon.png",
      stripePublicKey: formdata?.stripePublicKey,
      // stripeSecretKey: formdata?.stripeSecretKey,
      contactEmail: formdata?.email,
      contactPhone: formdata?.mobileNumber,
      supportUrl: formdata?.websiteUrl,
      // company: formdata?.websiteUrl,
      // defaultCurrency: formdata?.websiteUrl,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "app-settings/update",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while update app settings ", error);
    return error?.response?.data;
  }
};

const getHelpCenter = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "app-settings/help-center",
      headers: {},
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting help settings ", error);
    return error?.response?.data;
  }
};

const updateHelpCenter = async (token, updateHelpCenter) => {
  try {
    let data = JSON.stringify({
      email: updateHelpCenter?.email,
      phoneNumber: updateHelpCenter?.phoneNumber,
      address: updateHelpCenter?.address,
      website: updateHelpCenter?.website,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "app-settings/help-center",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);

    return response?.data;
  } catch (error) {
    console.log("error while update help settings ", error);
    return error?.response?.data;
  }
};

const getStaticpage = async (url) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `pages/${url}`,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting static pages ", error);
    return error?.response?.data;
  }
};

const EditStaticPaga = async (obj, token) => {
  try {
    let data = JSON.stringify({
      title: obj?.heading,
      content: obj?.content,
      slug: obj?.slug,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `pages/${obj?.id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while editing static pages ", error);
    return error?.response?.data;
  }
};

const createStaticpage = async (obj) => {
  try {
    let data = JSON.stringify({
      title: obj?.title,
      content: obj?.content,
      slug: obj?.slug,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "pages",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while creating static pages ", error);
    return error?.response?.data;
  }
};

const changePass = async (id, oldp, newp) => {
  try {
    let data = JSON.stringify({
      userId: id,
      oldPassword: oldp,
      newPassword: newp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "user/change-password",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while changing pass ", error);
    return error?.response?.data;
  }
};

const UpdateProfile = async (id, user, token) => {
  try {
    let data = JSON.stringify({
      userId: Number(id),
      firstName: user?.fname,
      lastName: user?.lname,
      email: user?.email,
      dob: user?.dob,
      isAdmin: true,
      permanentAddress: user?.address,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "user/edit-Profile",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while editing profile ", error);
    return error?.response?.data;
  }
};

const getPendingReq = async (token, id, amount) => {
  try {
    const data = {
      employeeId: login_data?.user?.id,
      amount: amount,
      description: "Employee Requested Payment",
    };
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "business/pending-requests",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting pending req ", error);
    return error?.response?.data;
  }
};

const getPaymentRequests = async (bid, p, lim, eid) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `business/payment-requests?businessId=${bid}&status=&page=${p}&limit=${lim}&employeeId=${eid}`,
      headers: {},
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting employee req ", error);
    return error?.response?.data;
  }
};

const addBalance = async (formData, token) => {
  try {
    let data = JSON.stringify({
      fromWalletId: formData?.fromWalletId,
      walletId: formData?.walletId,
      toWalletId: formData?.toWalletId,
      amount: formData?.amount,
      pin: formData?.pin,
      userId: formData?.userId,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "wallet/send-money",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting employee req ", error);
    return error?.response?.data;
  }
};

const deleteEmployee = async (token, id) => {
  try {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `business/employee/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axiosClient.request(config);

    return response?.data;
  } catch (error) {
    console.log("error while deleting employee ", error);
    return error?.response?.data;
  }
};

const deleteAccount = async (token, password, phoneNumber, userId) => {
  try {
    const data = {
      password,
      phoneNumber,
      userId,
    };
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "user/delete-user-request",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while deleting account ", error);
    return error?.response?.data;
  }
};

const SendOtp = async (email, isSignup) => {
  try {
    let data = null;

    isSignup
      ? (data = JSON.stringify({
          email: email,
          checkExistence: true,
        }))
      : (data = JSON.stringify({
          email: email,
        }));

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "user/send-otp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while sending otp ", error);
    return error?.response?.data;
  }
};

const ResetPassword = async (phoneNumber, password) => {
  try {
    let data = JSON.stringify({
      phoneNumber: phoneNumber,
      password: password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "user/forget-password-profile",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while reseting password ", error);
    return error?.response?.data;
  }
};

const verifyOtp = async (email, otp) => {
  try {
    console.log(otp);

    let data = JSON.stringify({
      email: email,
      otp: otp,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "user/verify-otp",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while validating otp ", error);
    return error?.response?.data;
  }
};

const CreateProfile = async (submitData, email) => {
  try {
    let data = JSON.stringify({
      email: email,
      phoneNumber: submitData.get("phoneNumber"),
      password: submitData.get("password"),
      firstName: submitData.get("firstName"),
      isAdmin: true,
      role: "BUSINESS",
      companyName: "Mowa",
      lastName: submitData.get("lastName"),
      dob: submitData.get("dob"),
      permanentAddress: submitData.get("permanentAddress"),
      transactionPIN: submitData.get("transactionPIN"),
    });

    console.log("data to go", data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "user/register-profile",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while creating profile ", error);
    return error?.response?.data;
  }
};

const withdrawmoney = async (formdata, token) => {
  try {
    let data = JSON.stringify({
      token: formdata?.token,
      link: formdata?.link,
    });

    console.log("data to go", data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "wallet/create-link",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while creating link ", error);
    return error?.response?.data;
  }
};

const getUsers = async (id, token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `user/get-all-users/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting Users ", error);
    return error?.response?.data;
  }
};

const sendMoney = async (formdata, token) => {
  try {
    let data = JSON.stringify({
      fromWalletId: formdata?.fromWalletId,
      toWalletId: formdata.toWalletId,
      amount: formdata?.amount,
      pin: formdata?.pin,
      userId: formdata?.userId,
    });
    console.log("data to go", data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `wallet/send-money`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while sending Money ", error);
    return error?.response?.data;
  }
};

export default {
  login,
  getAllUsers,
  deActUser,
  ActUser,
  getTransactions,
  registerEmp,
  getReq,
  getAppSettings,
  UpdateAppSettings,
  getHelpCenter,
  updateHelpCenter,
  getStaticpage,
  EditStaticPaga,
  createStaticpage,
  changePass,
  UpdateProfile,
  getPendingReq,
  getPaymentRequests,
  addBalance,
  deleteEmployee,
  deleteAccount,
  SendOtp,
  verifyOtp,
  CreateProfile,
  ResetPassword,
  withdrawmoney,
  getUsers,
  sendMoney,
};
