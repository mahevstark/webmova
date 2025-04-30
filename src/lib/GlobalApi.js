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

const getAllUsers = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "admin/all-users",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("config", config);

    const response = await axiosClient.request(config);
    console.log("rr", response);

    return response?.data;
  } catch (error) {
    console.log("error while fetching users ", error?.response?.data?.message);
    return error?.response?.data;
  }
};

const deActUser = async (id, token) => {
  try {
    let data = JSON.stringify({
      userId: id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "admin/deactivate-user",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while fetching users ", error?.response?.data?.message);
    return error?.response?.data;
  }
};

const ActUser = async (id, token) => {
  try {
    let data = JSON.stringify({
      userId: id,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "admin/activate-user",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    console.log("rr", response);

    return response?.data;
  } catch (error) {
    console.log("error while fetching users ", error);
    return error?.response?.data;
  }
};

const getApprTransactions = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "admin/approved-transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);

    return response?.data;
  } catch (error) {
    console.log("error while fetching req ", error?.response?.data?.message);
    return error?.response?.data;
  }
};

const getUnAprTransactions = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "admin/unapproved-transactions",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log(
      "error while fetching unappr req ",
      error?.response?.data?.message
    );
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

const getPendingReq = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "payment/pending-requests",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting pending req ", error);
    return error?.response?.data;
  }
};
export default {
  login,
  getAllUsers,
  deActUser,
  ActUser,
  getApprTransactions,
  getUnAprTransactions,
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
};
