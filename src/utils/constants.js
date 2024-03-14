export const URL = "https://localhost:7041";

export const responsiveProperties = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
export const propertyStatus = [
  { label: "Rent", value: "Rent" },
  { label: "Buy", value: "Sale" },
];

export const propertyTypes = [
  { value: "Residential", label: "Residential" },
  { value: "House", label: "House" },
  { value: "Flat", label: "Flat" },
  { value: "Bunglow", label: "Bunglow" },
];
