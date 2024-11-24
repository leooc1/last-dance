import cam from '../../public/cam.svg';
import lixo from '../../public/lixo.svg';
import editar from '../../public/editar.svg';
import evento from '../../public/evento.svg';
import { useEffect, useState } from 'react';
import NavigationBar from '../components/NavigationBar';

export default function HomeEmpresa() {
    const [eventos, setEventos] = useState<any[]>([]);
    const [eventoSelecionado, setEventoSelecionado] = useState<string | null>(null); // ID do evento selecionado
    const [mostrarPopup, setMostrarPopup] = useState(false);

    function formatarDataISO(isoDateString: string) {
        const meses = [
            "JANEIRO", "FEVEREIRO", "MARÇO", "ABRIL", "MAIO", "JUNHO",
            "JULHO", "AGOSTO", "SETEMBRO", "OUTUBRO", "NOVEMBRO", "DEZEMBRO"
        ];
        const data = new Date(isoDateString);
        const horas = data.getHours().toString().padStart(2, '0');
        const minutos = data.getMinutes().toString().padStart(2, '0');
        const dia = data.getDate();
        const mes = meses[data.getMonth()];
        return `${horas}:${minutos} - ${dia} de ${mes}`;
    }

    async function getEvents() {
        try {
            const response = await fetch('http://localhost:3000/evento/', { method: 'GET' });
            const data = await response.json();
            setEventos(data);
        } catch (err) {
            console.error(err);
        }
    }

    async function excluirEvento() {
        if (eventoSelecionado) {
            try {
                await fetch(`http://localhost:3000/evento/${eventoSelecionado}`, {
                    method: 'DELETE',
                });
                setEventos(eventos.filter((e) => e.id !== eventoSelecionado)); // Remove localmente
                setMostrarPopup(false);
                setEventoSelecionado(null);
            } catch (err) {
                console.error("Erro ao excluir evento:", err);
            }
        }
    }

    useEffect(() => {
        getEvents();
    }, []);

    return (
        <main>
            <img src={evento} alt="evento" className="mx-20 mb-10 h-10" />
            <section className="flex justify-around">
                <a href="/scan">
                    <img className="md:w-36 sm:w-36 w-20" src={cam} alt="camera" />
                </a>
                <div className="flex items-center justify-center">
                    <h1 className="md:text-5xl sm:text-3xl text-2xl text-center bg-zinc-400 py-1 px-4">
                        BANER <br />
                        NOTICIAS
                    </h1>
                </div>
            </section>
            <section className="mt-4 px-10">
                <h2 className="text-3xl">NEXT EVENTS</h2>
                <ul className="flex flex-col gap-4 my-3">
                    {eventos.map((e) => (
                        <li key={e.id} className="flex items-center md:gap-10 gap-6">
                            <div className="border-2 border-black w-fit py-2 px-3">
                                <div className="flex gap-2 items-center">
                                    <span>{e.titulo}</span>
                                    <div className="flex items-center gap-3 border-2 border-black w-fit px-2">
                                        <div className="w-2 h-2 bg-black rounded-full"></div>
                                        <span className="text-sm">{e.descricao}</span>
                                    </div>
                                </div>
                                <div>
                                    <span>{formatarDataISO(e.data_inicio)}</span>
                                </div>
                            </div>
                            <img src={editar} className="w-8 h-fit cursor-pointer" alt="editar" onClick={()=>{
                                location.assign('/cadastro-evento?'+JSON.stringify(e))
                            }}/>
                            <img
                                src={lixo}
                                className="w-8 h-fit cursor-pointer"
                                alt="excluir"
                                onClick={() => {
                                    setEventoSelecionado(e.id);
                                    setMostrarPopup(true);
                                }}
                            />
                        </li>
                    ))}
                </ul>
            </section>
            {mostrarPopup && (
                <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6">
                        <h2 className="text-lg font-semibold mb-4">Confirmar Exclusão</h2>
                        <p>Tem certeza que deseja excluir este evento?</p>
                        <div className="flex justify-end mt-4 gap-4">
                            <button
                                className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300"
                                onClick={() => setMostrarPopup(false)}
                            >
                                Cancelar
                            </button>
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                                onClick={excluirEvento}
                            >
                                Excluir
                            </button>
                        </div>
                    </div>
                </div>
                
            )}
        </main>
        
    );
}
