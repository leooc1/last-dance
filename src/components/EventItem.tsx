export default function EventItem({ nome, assunto, data, isEditable }) {
    return (
        <li className="flex items-center md:gap-10 gap-6">
            <div className="border-2 border-black w-fit py-2 px-3">
                <div className="flex gap-2 items-center">
                    <span>{nome}</span>
                    <div className="flex items-center gap-3 border-2 border-black w-fit px-2">
                        <div className="w-2 h-2 bg-black rounded-full"></div>
                        <span className="text-sm">{assunto}</span>
                    </div>
                </div>
                <div>
                    <span>{data}</span>
                </div>
            </div>
            {isEditable && (
                <>
                    <img src={editar} className="w-8 h-fit" alt="editar" />
                    <img src={lixo} className="w-8 h-fit" alt="lixo" />
                </>
            )}
        </li>
    );
}
