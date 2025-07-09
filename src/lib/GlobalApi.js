const { default: axios } = require("axios");

const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASEURL,
});

const login = async (phn, pass, role) => {
  console.log("role in globale API", role);
  try {
    let data =
      role === "admin"
        ? JSON.stringify({
            email: phn,
            password: pass,
          })
        : JSON.stringify({
            phoneNumber: phn,
            password: pass,
          });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: role === "admin" ? "auth/login" : "user/login-business",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);

    if (role === "admin") {
      return response;
    } else {
      return response;
    }
  } catch (error) {
    console.log("error while login ", error?.response?.data?.message);
    return error?.response?.data;
  }
};

const getAllUsers = async (id, token, role) => {
  try {
    console.log("role", role);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        role === "admin"
          ? `/superadmin/users?page=1&limit=20000&status=active`
          : `business/${id}/employees`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);
    console.log("my response", response);

    return response;
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

const getTransactions = async (token, id, filter, role, selectedType) => {
  try {
    console.log("ff", filter);
    console.log("t", selectedType);

    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url:
        role === "admin"
          ? `/superadmin/transactions?page=1&limit=10000&type=${filter}&status=${selectedType}&startDate=2024-01-01&endDate=2099-12-31&minAmount=0&maxAmount=1000000`
          : `wallet/transaction-stats/${id}/${filter}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    console.log("config", config);

    const response = await axiosClient.request(config);

    if (role === "admin") {
      return response;
    } else {
      return response?.data;
    }
  } catch (error) {
    console.log("error while fetching transactions ", error);

    if (role === "admin") {
      return error?.response;
    } else {
      return error?.response?.data;
    }
  }
};

const registerEmp = async (formdata, token, id, role) => {
  try {
    let data = null;
    role === "admin"
      ? (data = JSON.stringify({
          firstName: formdata?.firstName,
          lastName: formdata?.lastName,
          email: formdata?.email,
          phoneNumber: formdata?.phoneNumber,
          profilePicture: formdata?.profilePicture,
          Role: "USER",
          isAdmin: false,
          password: formdata?.password,
        }))
      : (data = JSON.stringify({
          businessId: id,
          firstName: formdata?.firstName,
          lastName: formdata?.lastName,
          email: formdata?.email,
          phoneNumber: formdata?.phoneNumber,
          profilePicture: formdata?.profilePicture,
        }));

    console.log("data to go", data, "  ", token);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: role === "admin" ? "superadmin/users" : "business/employee/create",
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

    console.log("obj", obj);

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

    console.log("url", config);

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

const changePass = async (id, oldp, newp, token) => {
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
        Authorization: `Bearer ${token}`,
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

const UpdateProfile = async (id, user, token, role) => {
  try {
    let data = JSON.stringify({
      userId: Number(id),
      firstName: user?.fname,
      lastName: user?.lname,
      email: user?.email,
      dob: user?.dob,
      isAdmin: role === "admin" ? true : false,
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

const addBalance = async (formData, token, role) => {
  try {
    let data = null;

    role === "admin"
      ? (data = JSON.stringify({
          userId: formData?.userId,
          amount: formData?.amount,
          description: formData?.description,
        }))
      : (data = JSON.stringify({
          fromWalletId: formData?.fromWalletId,
          walletId: formData?.walletId,
          toWalletId: formData?.toWalletId,
          amount: formData?.amount,
          pin: formData?.pin,
          userId: formData?.userId,
        }));
    console.log("data for add balance", data);

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url:
        role === "admin" ? "superadmin/users/add-balance" : "wallet/send-money",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response;
  } catch (error) {
    console.log("error while getting employee req ", error);
    return error?.response;
  }
};

const deleteEmployee = async (token, id, role) => {
  try {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url:
        role !== "admin" ? `business/employee/${id}` : `superadmin/users/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axiosClient.request(config);

    return response;
  } catch (error) {
    console.log("error while deleting employee ", error);
    return error?.response?.data;
  }
};

const deleteAccount = async (token, password, phoneNumber, userId, email) => {
  try {
    const data = {
      password,
      phoneNumber,
      userId,
      email,
    };
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: "user/delete-user-request",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: data,
    };

    console.log("data while deleting ", data);

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while sending delete account  otp", error);
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
      amount: Number(formdata?.amount),
      pin: formdata?.pin,
      userId: formdata?.userId,
    });
    console.log("data to go send moeny", data);

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

const getCardDetails = async (token, id) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: `wallet/get-wallet/${id}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while fetching card details", error);
    return error?.response?.data;
  }
};

const ConfirmOTP = async (email, otp, token) => {
  try {
    const data = {
      email,
      otp,
    };

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "user/verify-otp-and-delete-user",
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

const UpdateHeroSection = async (formdata, token) => {
  try {
    let data = JSON.stringify({
      title: formdata?.title,
      subtitle: formdata?.content,
      ctaButtonText: formdata?.ctaText,
      ctaButtonLink: formdata?.ctaLink,
      backgroundImage: "https://example.com/hero-bg.jpg",
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "superadmin/content/hero",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while saving hero content ", error);
    return error?.response?.data;
  }
};

const getHeroSection = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "superadmin/content/hero",
      headers: {},
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting hero content ", error);
    return error?.response?.data;
  }
};

const getFaqs = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "superadmin/content/faq",
      headers: {},
    };
    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting faqs ", error);
    return error?.response?.data;
  }
};

const createFaq = async (formdata, token) => {
  try {
    let data = JSON.stringify({
      question: formdata?.question,
      answer: formdata?.answer,
      order: 1,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "superadmin/content/faq",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while creating faqs ", error);
    return error?.response?.data;
  }
};

const deleteFaq = async (id, token) => {
  try {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `superadmin/content/faq/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while deleting faqs ", error);
    return error?.response?.data;
  }
};

const editfaqs = async (formdata, token, id) => {
  try {
    let data = JSON.stringify({
      question: formdata?.question,
      answer: formdata?.answer,
      order: 1,
      isActive: true,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `superadmin/content/faq/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while editing faqs ", error);
    return error?.response?.data;
  }
};

const getAbout = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "superadmin/content/about",
      headers: {},
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting about ", error);
    return error?.response?.data;
  }
};

const createAbout = async (formdata, token) => {
  try {
    let data = JSON.stringify({
      mainContent: formdata?.mainContent,
      mission: formdata?.mission,
      vision: formdata?.vision,
      values: ["Innovation", "Security", "Accessibility", "Customer Focus"],
      privacyPolicy: formdata?.privacyPolicy,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "superadmin/content/about",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while editing about ", error);
    return error?.response?.data;
  }
};

const getContact = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "superadmin/content/contact",
      headers: {},
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting contact ", error);
    return error?.response?.data;
  }
};

const UpdateContact = async (formdata, token) => {
  try {
    let data = JSON.stringify({
      address: formdata?.address,
      phoneNumbers: formdata?.phoneNumbers,
      emails: formdata?.emails,
      socialMedia: formdata?.socialMedia,
    });

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: "superadmin/content/contact",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while editing contact ", error);
    return error?.response?.data;
  }
};

const getTestimonials = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "superadmin/content/testimonials",
      headers: {},
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting testimonials ", error);
    return error?.response?.data;
  }
};

const CreateTestimonials = async (formdata, token) => {
  try {
    let data = JSON.stringify({
      action: "CREATE",
      data: {
        clientName: formdata?.clientName,
        position: formdata?.position,
        company: formdata?.company,
        content: formdata?.content,
        rating: formdata?.rating,
        imageUrl: "https://example.com/michael.jpg",
        order: 1,
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "superadmin/content/testimonials",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting testimonials ", error);
    return error?.response?.data;
  }
};

const deleteTestimonial = async (token, id) => {
  try {
    let data = JSON.stringify({
      action: "DELETE",
    });
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `superadmin/content/testimonials/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };
    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while deleting testimonial ", error);
    return error?.response?.data;
  }
};

const UpdateTestimonials = async (formdata, token, id) => {
  try {
    let data = JSON.stringify({
      action: "UPDATE",
      data: {
        clientName: formdata?.clientName,
        position: formdata?.position,
        company: formdata?.company,
        content: formdata?.content,
        rating: formdata?.rating,
        imageUrl: "https://example.com/michael.jpg",
        order: 1,
      },
    });

    console.log("data to go", data);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `superadmin/content/testimonials/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting testimonials ", error);
    return error?.response?.data;
  }
};

const getPartners = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "superadmin/content/partners",
      headers: {},
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while getting partners ", error);
    return error?.response?.data;
  }
};

const AddPartner = async (formdata, token, URL) => {
  try {
    let data = JSON.stringify({
      name: formdata?.name,
      logoUrl: URL,
      websiteUrl: formdata?.websiteUrl,
      order: 1,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "superadmin/content/partners",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while adding partners ", error);
    return error?.response?.data;
  }
};

const deleteParnter = async (token, id) => {
  try {
    let config = {
      method: "delete",
      maxBodyLength: Infinity,
      url: `superadmin/content/partners/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while deleting partners ", error);
    return error?.response?.data;
  }
};

const UpdatePartner = async (formdata, token, URL, id) => {
  try {
    let data = JSON.stringify({
      name: formdata?.name,
      logoUrl: URL,
      websiteUrl: formdata?.websiteUrl,
      order: 1,
    });

    console.log("data to go", data);

    let config = {
      method: "put",
      maxBodyLength: Infinity,
      url: `superadmin/content/partners/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error while editing partner", error);
    return error?.response?.data;
  }
};

const dashboardStats = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "superadmin/analytics/dashboard",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    };

    const response = await axiosClient.request(config);
    return response;
  } catch (error) {
    console.log("error while editing partner", error);
    return error?.response;
  }
};

const transactioninsights = async (token) => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "superadmin/analytics/transactions?timeRange=30days&interval=day",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await axiosClient.request(config);
    return response;
  } catch (error) {
    console.log("error while editing partner", error);
    return error?.response;
  }
};

const createCTA = async (formdata) => {
  try {
    let data = JSON.stringify({
      heading: formdata?.title,
      description: formdata?.content,
      backgroundImage: "https://example.com/hero-bg.jpg",
      ctaButton: {
        text: formdata?.ctaText,
        link: formdata?.ctaLink,
        type: "primary",
      },
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "hero-section",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    const response = await axiosClient.request(config);

    return response?.data;
  } catch (error) {
    console.log("error adding cta", error);

    return error?.message;
  }
};

const getCta = async () => {
  try {
    let config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "hero-section",
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await axiosClient.request(config);
    return response?.data;
  } catch (error) {
    console.log("error getting CTA", error);

    return error?.message;
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
  getCardDetails,
  ConfirmOTP,
  getHeroSection,
  UpdateHeroSection,
  getFaqs,
  createFaq,
  deleteFaq,
  editfaqs,
  getAbout,
  createAbout,
  getContact,
  UpdateContact,
  getTestimonials,
  CreateTestimonials,
  deleteTestimonial,
  UpdateTestimonials,
  getPartners,
  AddPartner,
  deleteParnter,
  UpdatePartner,
  dashboardStats,
  transactioninsights,
  createCTA,
  getCta,
};
