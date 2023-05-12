import * as React from "react";

import { ImageType } from "@types";

import styles from "./carousel.module.css";

interface IProps {
  images: Array<ImageType>;
}

const Carousel = ({ images }: IProps) => {
  const [currentIndex, setCurrentIndex] = React.useState<number>(0);

  const showPrevious = () => {
    const nextIndex = currentIndex - 1;

    setCurrentIndex(nextIndex);
    document.getElementById(`a_${nextIndex}`)?.click();
  };

  const showNext = () => {
    const nextIndex = currentIndex + 1;

    setCurrentIndex(nextIndex);
    document.getElementById(`a_${nextIndex}`)?.click();
  };

  return (
    <div className={styles.container}>
      <div className={styles.navigation}>
        {images.map((_image, i) => (
          <a
            id={`a_${i}`}
            onClick={() => setCurrentIndex(i)}
            className={`${styles.dot} ${
              currentIndex === i ? styles.dotActive : ""
            }`}
            key={i}
            href={`#${i}`}
          >
            {i + 1}
          </a>
        ))}
      </div>
      <button onClick={showPrevious} disabled={currentIndex === 0}>
        <span>{"<"}</span>
      </button>
      <button onClick={showNext} disabled={currentIndex === images.length - 1}>
        <span>{">"}</span>
      </button>
      <div className={styles.carousel}>
        {images.map((image, i) => (
          <div key={i} id={`${i}`} className={styles.image}>
            <img src={image.url} alt={image.title} width="300" height="300" />
            <span>{image.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
