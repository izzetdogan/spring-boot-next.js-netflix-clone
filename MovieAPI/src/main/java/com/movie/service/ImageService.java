package com.movie.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;
import com.amazonaws.services.s3.model.S3ObjectInputStream;
import com.amazonaws.util.IOUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

@Service
public class ImageService {

    @Value("${bucketName}")
    private String bucketName;

    @Value("${endPoint}")
    private String endPoint;

    private final AmazonS3 s3Client;

    public ImageService(AmazonS3 s3Client) {
        this.s3Client = s3Client;
    }

    public String uploadFile(MultipartFile file){
        File convFile = convertMultipartFileToFile(file);
        String fileName=System.currentTimeMillis()+"_"+file.getOriginalFilename();
        s3Client.putObject(new PutObjectRequest(bucketName,fileName,convFile).withCannedAcl(CannedAccessControlList.PublicRead));
        convFile.delete();
        return endPoint+fileName;
    }

    public byte[] downloadFile(String fileName ){
        S3Object s3Object = s3Client.getObject(bucketName,fileName);
        S3ObjectInputStream s3ObjectInputStream = s3Object.getObjectContent();

        try{
            byte[] content = IOUtils.toByteArray(s3ObjectInputStream);
            return content;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }

    public String deleteFile(String fileName){
        if(!fileName.equals("")){
            String newFileName= fileName.substring(endPoint.length());
            s3Client.deleteObject(bucketName,newFileName);
        }

        return  "deleted";
    }


    private File convertMultipartFileToFile(MultipartFile file){
        File convertedFile = new File(file.getOriginalFilename());
        try {
            FileOutputStream fos = new FileOutputStream(convertedFile);
            fos.write(file.getBytes());
            fos.close();
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
        return convertedFile;
    }
}
