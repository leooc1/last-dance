import { useEffect, useRef } from 'react';

export default function useCamera() {
    const videoRef = useRef(null);

    useEffect(() => {
        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Erro ao acessar a câmera: ", error);
            }
        };

        startCamera();

        return () => {
            if (videoRef.current && videoRef.current.srcObject) {
                const stream = videoRef.current.srcObject;
                const tracks = stream.getTracks();
                tracks.forEach((track: { stop: () => any; }) => track.stop());
            }
        };
    }, []);

    return videoRef;
}
