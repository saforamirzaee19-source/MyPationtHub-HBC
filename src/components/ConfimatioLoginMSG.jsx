import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

const confirmations = {
  login: {
    title: "Login successful!",
    text: "Welcome back to MyPatientHUB.",
    confirmButtonText: "Continue",
  },
  logout: {
    title: "Logged out",
    text: "You have been safely logged out.",
    confirmButtonText: "Go to login",
  },
};

export default function ConfirmationLoginMSG(action) {
  const confirmation = confirmations[action];

  if (!confirmation) {
    throw new Error(`Unknown confirmation action: ${action}`);
  }

  const isDarkTheme = document.body.classList.contains("dark-theme");

  return Swal.fire({
    ...confirmation,
    icon: "success",
    iconColor: "#168a68",
    customClass: {
      popup: "patienthub-alert-popup",
      icon: "patienthub-alert-icon",
      title: "patienthub-alert-title",
      htmlContainer: "patienthub-alert-message",
      confirmButton: "patienthub-alert-confirm",
      footer: "patienthub-alert-footer",
    },
    buttonsStyling: false,
    showClass: {
      popup: "swal2-show patienthub-alert-show",
    },
    hideClass: {
      popup: "swal2-hide patienthub-alert-hide",
    },
    background: isDarkTheme ? "#18242d" : "#ffffff",
    color: isDarkTheme ? "#eff7f4" : "#20332d",
    footer: '<span>MyPatientHUB <span aria-hidden="true">•</span> Secure account access</span>',
    heightAuto: false,
    scrollbarPadding: false,
  });
}
