import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import homeIcon from '../../public/home.svg';
import settingsIcon from '../../public/settings.svg';
import notificationsIcon from '../../public/notifications.svg';
import listIcon from '../../public/list.svg';

export default function NavigationBar() {
    const [eventos, setEventos] = useState<any[]>([]);
    const [filtros, setFiltros] = useState({
        titulo: '',
        empresa: '',
        dataInicio: '',
        ordenacao: 'asc', // ou 'desc'
    });

    // Função para buscar eventos filtrados
    async function getFilteredEvents() {
        const query = new URLSearchParams({
            titulo: filtros.titulo,
            empresa: filtros.empresa,
            dataInicio: filtros.dataInicio,
            ordenacao: filtros.ordenacao,
        }).toString();

        try {
            const response = await fetch(`http://localhost:3000/evento/?${query}`, {
                method: 'GET',
            });
            const data = await response.json();
            setEventos(data);
        } catch (err) {
            console.error('Erro ao buscar eventos filtrados:', err);
        }
    }

    useEffect(() => {
        getFilteredEvents();
    }, [filtros]);

    return (
        <div className="flex flex-col h-screen">
            {/* Conteúdo principal */}
            <main className="flex-grow overflow-y-auto px-4 py-6">
                {/* <h1 className="text-2xl font-bold mb-4">Listagem de Eventos</h1> */}
                {/* Filtros */}
                {/* <div className="flex flex-col gap-4 mb-6">
                    <input
                        type="text"
                        placeholder="Buscar por título"
                        value={filtros.titulo}
                        onChange={(e) =>
                            setFiltros((prev) => ({ ...prev, titulo: e.target.value }))
                        }
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                        type="text"
                        placeholder="Buscar por empresa"
                        value={filtros.empresa}
                        onChange={(e) =>
                            setFiltros((prev) => ({ ...prev, empresa: e.target.value }))
                        }
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                    <input
                        type="date"
                        value={filtros.dataInicio}
                        onChange={(e) =>
                            setFiltros((prev) => ({ ...prev, dataInicio: e.target.value }))
                        }
                        className="border border-gray-300 rounded px-4 py-2"
                    />
                    <select
                        value={filtros.ordenacao}
                        onChange={(e) =>
                            setFiltros((prev) => ({ ...prev, ordenacao: e.target.value }))
                        }
                        className="border border-gray-300 rounded px-4 py-2"
                    >
                        <option value="asc">Ordenar por Data: Crescente</option>
                        <option value="desc">Ordenar por Data: Decrescente</option>
                    </select>
                </div> */}
                {/* Lista de eventos */}
                {/* <ul className="flex flex-col gap-4">
                     {eventos.length > 0 ? (
                        eventos.map((evento) => (
                            <li
                                key={evento.id}
                                className="border border-gray-300 p-4 rounded shadow"
                            >
                                <h2 className="font-semibold text-lg">{evento.titulo}</h2>
                                <p>Empresa: {evento.empresa}</p>
                                <p>Data: {new Date(evento.data_inicio).toLocaleString()}</p>
                                <p>{evento.descricao}</p>
                            </li>
                        ))
                    ) : (
                        <p>Nenhum evento encontrado.</p>
                    )}
                </ul> */}
            </main>

            {/* Barra de navegação inferior */}
            <nav className="fixed bottom-0 left-0 right-0 bg-gray-100 border-t border-gray-300">
                <ul className="flex justify-around items-center py-2">
                    <li>
                        <Link to="/">
                            <img
                                src={homeIcon}
                                alt="Home"
                                className="w-6 h-6 mx-auto"
                            />
                            <span className="text-sm">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/configuracoes">
                            <img
                                src={settingsIcon}
                                alt="Configurações"
                                className="w-6 h-6 mx-auto"
                            />
                            <span className="text-sm">Configurações</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/notificacoes">
                            <img
                                src={notificationsIcon}
                                alt="Notificações"
                                className="w-6 h-6 mx-auto"
                            />
                            <span className="text-sm">Notificações</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/eventos">
                            <img
                                src={listIcon}
                                alt="Eventos"
                                className="w-6 h-6 mx-auto"
                            />
                            <span className="text-sm">Eventos</span>
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}
