import * as Yup from "yup";

export const rescheduleMeetingSchema = Yup.object({
  from: Yup.date().required("Required"),
  to: Yup.date().required("Required"),
  fromTime: Yup.string().required("Required"),
  toTime: Yup.string().required("required a Time"),
});
