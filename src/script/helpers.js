import {
  REGEX_CHECK_IP,
  REGEX_CHECK_EMAIL,
  REGEX_CHECK_DOMAIN,
} from "./config";

export const checkIP = (input) => {
  return REGEX_CHECK_IP.test(input);
};
export const checkEmail = (input) => {
  return REGEX_CHECK_EMAIL.test(input);
};
export const checkDomain = (input) => {
  return REGEX_CHECK_DOMAIN.test(input);
};
