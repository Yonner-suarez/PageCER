import "./InfoLuk.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const InfoLuk = () => {
  useEffect(() => {
    AOS.init({ duration: 2000 });
  }, []);
  return (
    <div className="infoLuk" data-aos="zoom-in">
      <h2>LUK</h2>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium sit
        iste ex nesciunt vero id excepturi rem, totam deleniti rerum maxime
        similique modi quis velit illum laborum illo reprehenderit eaque.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium sit
        iste ex nesciunt vero id excepturi rem, totam deleniti rerum maxime
        similique modi quis velit illum laborum illo reprehenderit eaque.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium sit
        iste ex nesciunt vero id excepturi rem, totam deleniti rerum maxime
        similique modi quis velit illum laborum illo reprehenderit eaque.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium sit
        iste ex nesciunt vero id excepturi rem, totam deleniti rerum maxime
        similique modi quis velit illum laborum illo reprehenderit eaque.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium sit
        iste ex nesciunt vero id excepturi rem, totam deleniti rerum maxime
        similique modi quis velit illum laborum illo reprehenderit eaque.
      </p>{" "}
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laudantium sit
        iste ex nesciunt vero id excepturi rem, totam deleniti rerum maxime
        similique modi quis velit illum laborum illo reprehenderit eaque.
      </p>
    </div>
  );
};
export default InfoLuk;
