import * as React from "react";

import { ImageType } from "@types";

import styles from "./fullGallery.module.css";

interface IProps {
  images: Array<ImageType>;
}

const FullGallery = ({ images }: IProps) => {
  return (
    <ul className={styles.fullGallery}>
      {images.map((image, i) => (
        <li key={i} className={styles.image}>
          <img src={image.url} alt={image.title} width="300" height="300" />
          <span>{image.title}</span>
        </li>
      ))}
    </ul>
  );
};

export default FullGallery;
