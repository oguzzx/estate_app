import { useState } from "react";
import "./slider.scss";
function Slider({ images }) {
  const [imageIndex, setImageIndex] = useState(null);

  return (
    <div className="slider">
      {imageIndex !== null && (
        <div className="fullSlider">
          <div className="arrow">
            <img
              src="/arrow.png"
              alt=""
              onClick={
                // imageIndex eğer 0 ise 0 da kalmalı, değilse bir azalt
                () => setImageIndex(imageIndex === 0 ? 0 : imageIndex - 1)
              }
            />
          </div>
          <div className="imgContainer">
            <img src={images[imageIndex]} alt="" className="bigImage" />
          </div>
          <div className="arrow">
            <img
              src="/arrow.png"
              alt=""
              className="right"
              onClick={
                // images in son elemanı ise daha fazla arttırma, değilse bir arttır
                () =>
                  setImageIndex(
                    imageIndex === images.length - 1
                      ? images.length - 1
                      : imageIndex + 1
                  )
              }
            />
          </div>
          <div
            className="close"
            onClick={
              // imageIndex ı null yap
              () => setImageIndex(null)
            }
          >
            X
          </div>
        </div>
      )}
      <div className="bigImage">
        <img
          src={images[0]}
          alt=""
          onClick={
            // imageIndex 0 yap
            () => setImageIndex(0)
          }
        />
      </div>
      <div className="smallImages">
        {images.slice(1).map((image, index) => (
          <img
            key={index}
            src={image}
            alt=""
            onClick={
              // imageIndex ı index+1 yap
              () => setImageIndex(index + 1)
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
