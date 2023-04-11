import { useState, useEffect } from "react";
import { storage } from "../config/firebase.config";

export const useStorage = (file : any) => {
    const [progress, setProgress] = useState(0);
   
    const [error, setError] = useState(null);
    const [url, setUrl] = useState(null);

    // runs every time the file value changes
    useEffect(() => {
        if (file) {
            // storage ref
            const storageRef = storage.ref(`storage/${file.name}`);        
                storageRef.put(file).on(
                "state_changed",
                (snap : any) => {
                    // track the upload progress
                    let percentage =
                        Math.round(
                        (snap.bytesTransferred / snap.totalBytes) * 100
                    );
                    setProgress(percentage);
                },
                (err : any) => {
                    setError(err);
                },
                async () => {
                    // get the public download img url
                    const downloadUrl = await storageRef.getDownloadURL();

                    // save the url to local state
                    setUrl(downloadUrl);
                }
            );
        }else{
            setProgress(0);
            setUrl(null);
        }
    }, [file]);

    return { progress, url, error };
};
