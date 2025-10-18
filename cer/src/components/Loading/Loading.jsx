import React from "react";
import "./Loading.css";

const style = (show) => ({ display: show ? "block" : "none" });
function Loading(props) {
  return (
    <div
      className="modalProgress"
      id="divLoading"
      style={typeof props.show === "boolean" ? style(props.show) : props.estilo}
    >
      <div className="loading">
        <span style={{ color: "white" }}>
          <i className="fa fa-spinner fa-spin"></i>
          <span className="cargando">
            &nbsp;&nbsp;{props?.message ? props.message : "Cargando...."}
          </span>
        </span>
      </div>
    </div>
  );
}

export default Loading;
