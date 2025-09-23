import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";

const acceptedFileExtensions = [".png"];
const maxFileSize = 200 * 1024 * 1024;

const DropZone = ({
  onFilesUpload,
  removeFile,
  label,
  uploadedFile,
  required,
}) => {
  const [uploadError, setUploadError] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    let objectUrl = null;

    if (!uploadedFile) {
      setPreview(null);
      return;
    }

    setUploadError(false);

    // Si es Base64
    if (typeof uploadedFile === "string") {
      // Si ya viene como "data:image/png;base64,...", úsalo tal cual
      if (uploadedFile.startsWith("data:")) {
        setPreview(uploadedFile);
      } else {
        // Si es solo Base64 puro, convertimos a data URL
        setPreview(`data:image/png;base64,${uploadedFile}`);
      }
    }

    // Si es File o Blob
    else if (uploadedFile instanceof File || uploadedFile instanceof Blob) {
      objectUrl = URL.createObjectURL(uploadedFile);
      setPreview(objectUrl);
    }
    // Caso objeto { name, data } del backend
    else if (uploadedFile.data && uploadedFile.name) {
      setPreview(uploadedFile.data);
    } else {
      console.warn("uploadedFile no es válido:", uploadedFile);
      setPreview(null);
    }

    return () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [uploadedFile]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      onFilesUpload(acceptedFiles);
    },
    [onFilesUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { acceptedFileExtensions },
    maxSize: maxFileSize,
    onDropRejected: () => {
      setUploadError(true);
    },
  });

  // Función para mostrar nombre correctamente
  const getFileName = () => {
    if (!uploadedFile) return "";
    if (typeof uploadedFile === "string") return "Imagen existente";
    if (uploadedFile.name) return uploadedFile.name;
    return "Archivo";
  };

  return (
    <section
      style={{
        background: "#f5f7fa",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div>
        <label
          style={{
            color: uploadError ? "#BA1A1A" : "#001B3D",
            fontFamily: "Assistant",
            fontSize: "16px",
            fontStyle: "normal",
            fontWeight: "700",
            lineHeight: "130%",
            letterSpacing: "0.024px",
          }}
        >
          {label}
        </label>
        {required && (
          <span
            style={{
              color: "#BA1A1A",
              fontFamily: "Assistant",
              fontSize: "12px",
              fontStyle: "normal",
              fontWeight: "600",
              lineHeight: "100%",
              letterSpacing: "0.018px,",
              margin: "0",
              padding: "0",
            }}
          >
            *
          </span>
        )}
      </div>
      <div
        {...getRootProps()}
        style={{
          border: uploadError
            ? "medium dashed #BA1A1A"
            : "medium dashed rgb(151, 144, 128)",
          width: "100%",
          height: "56px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          borderRadius: "8px",
          padding: "16px",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        {uploadedFile ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-around",
              alignItems: "center",
              padding: "0px 15px",
              width: "100%",
            }}
          >
            {preview && (
              <img
                src={preview}
                alt="Vista previa"
                style={{
                  maxWidth: "150px",
                  maxHeight: "150px",
                  borderRadius: "8px",
                  objectFit: "cover",
                }}
              />
            )}
            <span>{getFileName()}</span>
            <button
              onClick={removeFile}
              type="button"
              className="btn btn-warning"
            >
              eliminar
            </button>
          </div>
        ) : isDragActive ? (
          <p style={{ color: uploadError ? "#BA1A1A" : "" }}>
            Suelta el archivo aquí ...
          </p>
        ) : (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            {uploadError ? "UploadIconRead" : ""}
            <div style={{ width: "auto" }}>
              <span
                style={{
                  color: uploadError ? "#BA1A1A" : "#001B3D",
                  fontFamily: "Roboto",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: "400",
                  lineHeight: "20px",
                }}
              >
                Arrastra la imagen o{" "}
              </span>
              <span
                style={{
                  color: uploadError ? "#BA1A1A" : "#725C00",
                }}
              >
                adjúntala desde tu dispositivo
              </span>
            </div>
          </div>
        )}
      </div>
      {uploadError && (
        <p style={{ color: "#BA1A1A" }}>Adjunta una Imagen del producto</p>
      )}
    </section>
  );
};

export default DropZone;
