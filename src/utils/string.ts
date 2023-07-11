export const isValidString = (data: any) =>
  data != null && typeof data === "string" && data !== "";

// function to convert kebab-case to title case
export const convertStringKebabToTitle = (str: string) => {
  return str
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};
