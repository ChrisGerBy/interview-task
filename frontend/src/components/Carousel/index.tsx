import * as React from "react";

import { ReactComponent as ChevronLeft } from "src/assets/chevron-left.svg";
import { ReactComponent as ChevronRight } from "src/assets/chevron-right.svg";
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
      <div className={styles.buttonsWithCarousel}>
        <ChevronLeft
          onClick={showPrevious}
          className={`${styles.navButton} ${
            currentIndex === 0 ? styles.navButtonDisabled : ""
          }`}
        />
        <div className={styles.carousel}>
          {images.map((image, i) => (
            <div key={i} id={`${i}`} className={styles.image}>
              <img src={image.url} alt={image.title} width="300" height="300" />
              <span>{image.title}</span>
            </div>
          ))}
        </div>
        <ChevronRight
          onClick={showNext}
          className={`${styles.navButton} ${
            currentIndex === images.length - 1 ? styles.navButtonDisabled : ""
          }`}
        />
      </div>
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
          ></a>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
