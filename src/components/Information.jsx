import { FaCreditCard } from "react-icons/fa";
import { SiSpotify } from "react-icons/si";

const DEFAULT_NOTIFICATIONS = [
  {
    title: "New Message From Laura",
    time: "13 minutes ago",
    image: "/src/assets/images/laur.jpg",
  },
  {
    title: "New Album By Travis Scott",
    time: "1 day ago",
    icon: "spotify",
  },
  {
    title: "Payment Successfully Completed",
    time: "2 days ago",
    icon: "payment",
  },
];

export default function Information({ notifications = DEFAULT_NOTIFICATIONS }) {
  return (
    <div className="information">
      {notifications.map((notification) => (
        <article className="information-item" key={`${notification.title}-${notification.time}`}>
          {notification.icon === "spotify" ? (
            <span className="information-icon information-icon-spotify" aria-label="Spotify">
              <SiSpotify aria-hidden="true" />
            </span>
          ) : notification.icon === "payment" ? (
            <span className="information-icon information-icon-payment" aria-label="Payment">
              <FaCreditCard aria-hidden="true" />
            </span>
          ) : notification.image ? (
            <img src={notification.image} alt="" className="information-image" />
          ) : null}
          <div>
            <p>{notification.title}</p>
            <small>{notification.time}</small>
          </div>
        </article>
      ))}
    </div>
  );
}
