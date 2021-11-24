import { stringify } from "qs";
import request, { reRequest } from "utils/request";
import { NOVA_DEFAULT_ROOT } from "./config";

export const fetchCaptcha = async () =>
  reRequest(`${NOVA_DEFAULT_ROOT}/bootes2/passport/captcha`);

export const fetchUser =()=>
  request(`${NOVA_DEFAULT_ROOT}/user-info`);

export const sendEmail = (query) =>
  reRequest(`${NOVA_DEFAULT_ROOT}/send-email?${stringify(query)}`);
export const login = (body) =>
  reRequest(`${NOVA_DEFAULT_ROOT}/student/${body.email}`, {
    method: "POST",
    body,
  });
export const signUp = (body) =>
  reRequest(`${NOVA_DEFAULT_ROOT}/student`, {
    method: "POST",
    body,
  });
export const authenticatedPrincipal = () => {
  return reRequest(
    `${NOVA_DEFAULT_ROOT}/bootes2/passport/authenticated-principal`
  );
};

export const fetchAccountById = (accountId) =>
  reRequest(`${NOVA_DEFAULT_ROOT}/bootes2/passport/accounts/${accountId}`);

export const fetchUserAccounts = () =>
  request(`${NOVA_DEFAULT_ROOT}/bootes2/passport/user/accounts`);

export const fetchTokenFromAccount = (query) =>
  reRequest(
    `${NOVA_DEFAULT_ROOT}/bootes2/passport/select-account?${stringify(query)}`,
    {
      method: "PUT",
    }
  );

export const getTokenByrefreshToken = (body) =>
  reRequest(`${NOVA_DEFAULT_ROOT}/bootes2/passport/refresh-token`, {
    method: "POST",
    body,
  });
