const backendDomain = import.meta.env.BACKEND_RENDER_API_DOMAIN;

const SummaryApi = {
  signUp: {
    url: `${backendDomain}/api/users/signup`,
    method: "post",
  },
  login: {
    url: `${backendDomain}/api/users/login`,
    method: "post",
  },
  current_user: {
    url: `${backendDomain}/api/users/user-details`,
    method: "get",
  },
  logout: {
    url: `${backendDomain}/api/users/logout`,
    method: "get",
  },
  allUser: {
    url: `${backendDomain}/api/users/all-user`,
    method: "get",
  },
  userUpdate: {
    url: `${backendDomain}/api/users/user-update`,
    method: "post",
  },
};

export default SummaryApi;
