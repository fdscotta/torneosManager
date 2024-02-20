'use server'
import {v2 as cloudinary} from 'cloudinary';
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true
});

export const updateImageCloud = async (file : File) => {

  const fileBuffer = await file.arrayBuffer();

  var mime = file.type;
  var encoding = 'base64';
  var base64Data = Buffer.from(fileBuffer).toString('base64');
  var fileUri = 'data:' + mime + ';' + encoding + ',' + base64Data;

  try {

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {

          var result = cloudinary.uploader.upload(fileUri, {
            invalidate: true
          })
            .then((result) => {
              resolve(result);
            })
            .catch((error) => {
              reject(error);
            });
      });
    };

    const result : any = await uploadToCloudinary();

    const imageUrl = result.secure_url;

    return imageUrl

  } catch (error) {
    console.log("server err", error);
    return NextResponse.json({ err: "Internal Server Error" }, { status: 500 });
  }
};