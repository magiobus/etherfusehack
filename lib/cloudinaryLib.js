import getCloudinary from "@/utils/getCloudinary";
const cloudinary = getCloudinary(); //gets configuration from utils/getcloudinary.js
const multer = require("multer");

const cloudinaryLib = {
  uploadQrTicket: async (qrBase64, orderId, ticketText = "") => {
    try {
      //upload qr to cloudinary
      const qrResult = await cloudinary.uploader.upload(qrBase64, {
        folder: `tickets_${process.env.NODE_ENV}`,
        public_id: `qrs/${orderId}`,
        overwrite: true,
        width: 500,
        height: 500,
        crop: "fill",
        format: "jpg",
      });

      return qrResult.secure_url;
    } catch (error) {
      console.error("error in cloudinaryLib.uploadQrTicket", error);
      throw new Error("Error uploading ticket image");
    }
  },
  uploadEventPhoto: async (files, eventId) => {
    try {
      if (!files) {
        throw new Error("No files provided");
      }

      const { photo } = files;
      const upload = multer({ dest: "/tmp" });

      if (photo) {
        upload.single("photo");
        //upload image to cloudinary
        const result = await cloudinary.uploader.upload(photo[0].path, {
          folder: `events_${process.env.NODE_ENV}`,
          public_id: `${eventId}/photo`,
          overwrite: true,
          width: 1280,
          height: 640,
          crop: "fill",
          format: "jpg",
        });

        return result.secure_url;
      }
    } catch (error) {
      console.error("error uploading image", error);
      throw new Error("Error uploading event image");
    }
  },
};

export default cloudinaryLib;
