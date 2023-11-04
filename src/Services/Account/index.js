import { toast } from "react-toastify";
import { API_URLS } from "../../Config/apiUrls";
import { baseUrl } from "../../URls";
import axios from "axios";

export async function get_account({ setloding, setData }) {
  setloding(true);
  try {
    const response = await axios.get(
      `${baseUrl}${API_URLS.get_account}`,

      {
        headers: {
          Authorization: localStorage.getItem("erp_token"),
          "Content-Type": "application/json",
        },
      }
    );
    setData(response?.data?.account_data);

    console.log(response);
  } catch (e) {
    console.log(e);
    toast.warn("Something went wrong");
  }
  setloding(false);
}
