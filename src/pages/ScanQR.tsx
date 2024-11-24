import useCamera from '../hooks/useCamera';
import seta from '../../public/setona.svg';
import Test from '../components/QrReader';
import { useState } from 'react';

export default function ScanQR() {
    const videoRef = useCamera();
    const [scan, setScan] = useState<boolean | null>(null);

    return (
        <main className={`flex w-screen h-screen justify-center items-center 
            ${scan === null ? 'bg-white' : scan ? 'bg-green-300' : 'bg-red-300'}`}>
            <img
                className='absolute top-3 left-3 cursor-pointer w-8 h-fit'
                onClick={() => window.history.back()}
                src={seta}
                alt="Voltar"
            />
            <div className="h-fit max-w-full sm:w-96 w-80 border-qr z-10">
                <video
                    ref={videoRef}
                    autoPlay
                    className='w-full h-fit object-cover'
                    onClick={() => setScan(scan === null ? true : !scan)}
                />
            </div>
            <Test />
        </main>
    );
}
