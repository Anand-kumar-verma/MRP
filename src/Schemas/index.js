import * as Yup from "yup";

export const createLeadSchema = Yup.object({
  first_name: Yup.string()
    .max(15, "Must be 15 characters or less")
    .required("Required"),
  last_name: Yup.string()
    .max(20, "Must be 20 characters or less")
    .required("Required"),
  email: Yup.string().email("Invalid email address").required("Required"),
  no_of_employees: Yup.number()
    .typeError("That doesn't look like a  number")
    .positive("A number can't start with a minus")
    .integer("A number can't include a decimal point")
    .min(1)
    .required("required a number"),
  phone: Yup.number()
    .typeError("That doesn't look like a phone number")
    .positive("A phone number can't start with a minus")
    .integer("A phone number can't include a decimal point")
    .min(8)
    .required("A phone number is required"),
});
