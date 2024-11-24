import { useState, useEffect } from "react";
import { QRCodeSVG } from "qrcode.react";


export default function HomeMembro() {
    const [eventos, setEventos] = useState<any[]>([])
    function formatarDataISO(isoDateString: string) {
        const meses = [
            "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
            "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
        ];

        // Converter a string ISO em um objeto Date
        const data = new Date(isoDateString);

        // Obter horas e minutos no formato 24h
        const horas = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');

        // Obter o dia, mês e ano
        const dia = data.getDate();
        const mes = meses[data.getMonth()];

        // Montar o resultado no formato desejado
        return `${horas}:${minutos} - ${dia} de ${mes}`;
    }
    const presente = localStorage.getItem('pi-tektek')
    console.log(presente)
    async function getEvents() {
        await fetch('http://localhost:3000/evento/', {
            method: 'GET'
        })
            .then(data => data.json())
            .then(data => {
                setEventos(data)
            })
            .catch(err => console.error(err))
    }
    useEffect(() => {
        getEvents()
    }, [])
    return (
        <main>
            <section className='flex justify-around'>
                {/* <img className='md:w-96 sm:w-64 w-36' src="https://t1.gstatic.com/licensed-image?q=tbn:ANd9GcTFRaX872E1iX4jlcXwLY01J-fRIap_Bnveev0X5UgEGtUHrSALgmbenlDAx3cryQFr" alt="" /> */}
                <QRCodeSVG
                    value={'{user: 1, event:2}'} // Dados a serem codificados
                    size={200} // Tamanho do QR Code
                    fgColor="#000000" // Cor do QR Code
                    bgColor="#ffffff" // Cor de fundo
                    level="H" // Nível de correção de erros (L, M, Q, H)
                />
                <div className='flex items-center justify-center'>
                    <h1 className='welcome-text'>BEM VINDO(A) </h1>
                </div>

            </section>
            <section className="mt-4 px-10">
                <h2 className="text-3xl">LAST EVENTS</h2>
                <ul className="flex flex-col gap-4 my-3">
                    {eventos.map(e => <li className="border-2 border-black w-fit py-2 px-3">
                        <div className="flex gap-2 items-center">
                            <span>{e.titulo}</span>
                            <div className={`flex items-center gap-3 border-2 border-black w-fit px-2 ${presente && e.id == 2 ? 'bg-green-300' : ''}`}>
                                <div className="w-2 h-2 bg-black rounded-full"></div>
                                <span className={`text-sm `}>{'PRESENTE'}</span>
                            </div>
                        </div>
                        <div>
                            <span>{formatarDataISO(e.data_inicio)}</span>
                        </div>
                    </li>)}
                </ul>
            </section>
        </main>
    )
}
