import React from "react";
import "./App.css";

import { ImageType } from "@types";

import { Carousel, FullGallery } from "./components";

function App() {
  const [isCarousel, setIsCarousel] = React.useState<boolean>(false);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [images, setImages] = React.useState<Array<ImageType>>([]);
  const [error, setError] = React.useState<string | null>(null);

  const handleToggleCarousel = () => setIsCarousel((prevState) => !prevState);

  const fetchImages = () => {
    setLoading(true);

    fetch(`${process.env.REACT_APP_API}/images`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }

        throw new Error(res.statusText);
      })
      .then((data) => {
        if (error) setError(null);

        if (!data?.length) return;

        setImages(data);
      })
      .catch((e) => {
        console.error(e);

        setError(e.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  React.useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div
      className={`App ${isCarousel ? "App_carousel" : ""}`}
      data-testid="app"
    >
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div>
          <div>Images not received: {error}</div>
          <button onClick={fetchImages}>Retry</button>
        </div>
      ) : (
        <>
          <button onClick={handleToggleCarousel}>
            {isCarousel ? "Show full gallery" : "Show carousel"}
          </button>
          {isCarousel ? (
            <Carousel images={images} />
          ) : (
            <FullGallery images={images} />
          )}
        </>
      )}
    </div>
  );
}

export default App;
