"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { convertFileToUrl } from "@/lib/utils";

type FileUploadProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};

export const FileUploader = ({ files, onChange }: FileUploadProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles);
      // Do something with the files
    },
    [onChange]
  );
  const { getRootProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className="file-upload">
      {files && files.length > 0 ? (
        <Image
          className="max-h-[400px] overflow-hidden object-cover"
          alt="file"
          height={1000}
          width={1000}
          src={convertFileToUrl(files[0])}
        />
      ) : (
        <>
          <Image
            alt="file"
            height={40}
            width={40}
            src="/assets/icons/upload.svg"
          />
          <div className="file-upload_label">
            <p className="text-14-regular">
              <span className="text-green-500">
                Click here to upload a file
              </span>{" "}
              or drag and drop a file here
            </p>
            <p>SVG,PNG or JPG. limite is 800x400</p>
          </div>
        </>
      )}
    </div>
  );
};

export default FileUploader;
