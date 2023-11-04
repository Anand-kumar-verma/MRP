import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles({
  customInput: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#FFD700", // Golden color
      },
    },
  },

  table: {
    minWidth: 600,
    borderCollapse: "separate",
    borderSpacing: "0px 4px",
    overflow: "scroll",
  },
  tableRow: {
    cursor: "pointer",
    marginTop: "8px",
    borderTop: "2px solid #ffffff",
    bacKgroundColor: "#ffffff",
  },
  tableCell: {
    marginTop: "8px",
  },
});
