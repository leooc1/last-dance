import { useEffect, useState } from 'react';
import { QrReader } from 'react-qr-reader';

const Test = () => {
    const [data, setData] = useState('No result');

    useEffect(() => {
        /* if (data != 'No result') {
            alert('LIDU!')
            window.open(data, "_blank");
        } */
    }, [data])

    return (
        <>
            <QrReader
                onResult={(result, error) => {
                    if (!!result) {
                        // setData(result?.text);
                        if (result?.text != 'e2') {
                            alert('LEU!')
                            localStorage.setItem("pi-tektek", "true")
                        }
                    }

                    if (error) {
                        console.info(error);
                    }
                }}
                style={{ width: '100%' }}
            />
            {/* <p>{data}</p> */}
        </>
    );
};

export default Test