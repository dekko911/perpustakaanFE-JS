import Swal from "sweetalert2";

export const swalToast = (
  icon = "success",
  title = "Successfully",
  width = 410
) => {
  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.onmouseenter = Swal.stopTimer;
      toast.onmouseleave = Swal.resumeTimer;
    },
    width,
  });
  return Toast.fire({
    icon,
    title,
    theme: "dark",
  });
};

export const swalDialogConfirm = (title = "", text = "", icon = "") => {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    background: "#2b2b2a",
    color: "#ffffff",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};

export const swalDialogConfirmForRoles = (
  title = "",
  text = "",
  icon = "",
  inputOptions
) => {
  return Swal.fire({
    title,
    text,
    icon,
    input: "select",
    inputPlaceholder: "Select the Roles",
    inputOptions,
    showCancelButton: true,
    theme: "dark",
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes",
  });
};
