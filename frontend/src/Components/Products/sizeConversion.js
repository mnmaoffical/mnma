// sizeConversion.js

const SHOE_SIZE_MAP = {
  "6": "39",
  "7": "40",
  "8": "42",
  "9": "43",
  "10": "44",
  "11": "45",
};

const APPAREL_SIZE_MAP = {
  "S": "44",
  "M": "46",
  "L": "48",
  "XL": "50",
  "XXL": "52",
};

// Add every footwear-type category name you use in the admin panel
const FOOTWEAR_CATEGORIES = ["footwear", "sandals", "shoes", "sneakers", "heels", "boots"];

export const getEuSize = (size, category = "") => {
  const isFootwear = FOOTWEAR_CATEGORIES.includes(category.toLowerCase());
  const map = isFootwear ? SHOE_SIZE_MAP : APPAREL_SIZE_MAP;
  return map[size] ?? "-";
};