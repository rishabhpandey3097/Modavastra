import { message } from "antd";

export const errorMessage = (res) => {
  message.error(res);
};

export const successMessage = (res) => {
  message.success(res);
};
