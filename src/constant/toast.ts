export const ErrorToast = {
  isToast: true,
  type: "error",
  contentHeader: "Error",
  contentBody: `데이터를 불러올 수 없습니다.`,
};

export const ScrapToast = {
  isToast: true,
  type: "success",
  contentHeader: "스크랩 성공!",
  contentBody: `스크랩 페이지에서 확인할 수 있습니다.`,
};

export const UnscrapToast = {
  isToast: true,
  type: "success",
  contentHeader: "스크랩 해제",
  contentBody: `스크랩을 해제했습니다.`,
};
