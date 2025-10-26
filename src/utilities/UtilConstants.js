export const getDisplayName = (emailOrUsername = "") => {
  if (!emailOrUsername) return "User";

  if (emailOrUsername.includes("@")) {
    const namePart = emailOrUsername.split("@")[0];

    return namePart
      .replace(/[._-]+/g, " ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  return emailOrUsername.charAt(0).toUpperCase() + emailOrUsername.slice(1);
};

export const authUtilsConstants = {
  USER_TOKEN: "token",
  USER_DETAILS: "userDetails",
};
export const PAGINATION_CONSTANT = {
  pageSize: 5,
};
