import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
          <img src={item.images[0]} alt={item.title} />
          <div className="textContainer">
            <Link to={`/${item.id}`} className="title">
              {item.title}
            </Link>
            <span className="bed">
              {item.bedroom} bedroom
              <img src="/bed.png" alt="bed" className="icon" />
            </span>
            <span className="bath">
              {item.bathroom} bathroom
              <img src="/bath.png" alt="bath" className="icon" />
            </span>
            <b>$ {item.price}</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
