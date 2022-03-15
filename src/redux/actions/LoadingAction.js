import { ActionTypes } from "../constants/Types";

export const startRegisterLoading = () => {
  return {
    type: ActionTypes.START_REGISTER_LOADING,
  };
};

export const startForgotLoading = () => {
  return {
    type: ActionTypes.START_FORGOT_LOADING,
  };
};

export const startResetPassLoading = () => {
  return {
    type: ActionTypes.START_RESET_PASSWORD_LOADING,
  };
};
export const startUploadVoiceLoading = () => {
  return {
    type: ActionTypes.START_UPLOAD_VOICE_LOADING,
  };
};

export const voiceReportListLoading = () => {
  return {
    type: ActionTypes.START_VOICE_REPORT_LIST_LOADING,
  };
};

export const reportDataLoading = () => {
  return {
    type: ActionTypes.START_REPORT_DATA_LOADING,
  };
};

export const genericListLoading = () => {
  return {
    type: ActionTypes.START_GENERIC_LIST_LOADING,
  };
};

export const planListLoading = () => {
  return {
    type: ActionTypes.START_PLAN_LIST_LOADING,
  };
};

export const startEmailVerifyLoading = () => {
  return {
    type: ActionTypes.START_EMAIL_VERIFY_LOADING,
  };
};

export const stopLoading = () => {
  return {
    type: ActionTypes.STOP_LOADING,
  };
};
