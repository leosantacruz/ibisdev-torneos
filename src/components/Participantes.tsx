import React, { useState, useEffect } from "react";
import { Plus, Edit2, Trash2, Save, X } from "lucide-react";

const Participantes = () => {
  const [participantes, setParticipantes] = useState<string[]>(() => {
    const stored = localStorage.getItem("participantes");
    return stored ? JSON.parse(stored) : [];
  });
  const [nuevoParticipante, setNuevoParticipante] = useState("");
  const [editando, setEditando] = useState<number | null>(null);
  const [participanteEditado, setParticipanteEditado] = useState("");

  useEffect(() => {
    localStorage.setItem("participantes", JSON.stringify(participantes));
  }, [participantes]);

  const agregarParticipante = (e: React.FormEvent) => {
    e.preventDefault();
    if (nuevoParticipante.trim()) {
      setParticipantes((prev) => [...prev, nuevoParticipante.trim()]);
      setNuevoParticipante("");
    }
  };

  const iniciarEdicion = (index: number) => {
    setEditando(index);
    setParticipanteEditado(participantes[index]);
  };

  const guardarEdicion = (index: number) => {
    const nuevosParticipantes = [...participantes];
    nuevosParticipantes[index] = participanteEditado.trim();
    setParticipantes(nuevosParticipantes);
    setEditando(null);
  };

  const eliminarParticipante = (index: number) => {
    setParticipantes(participantes.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 shadow-xl">
        <h2 className="text-3xl text-white mb-6 text-center">
          Participantes del{" "}
          <span className="font-bold">Torneo Street Fighter</span>
        </h2>

        <form onSubmit={agregarParticipante} className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={nuevoParticipante}
              onChange={(e) => setNuevoParticipante(e.target.value)}
              placeholder="Nombre del luchador"
              className="flex-1 px-4 py-2 rounded-lg bg-black/20 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center"
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </form>

        <div className="space-y-2">
          {participantes.map((participante, index) => (
            <div
              key={index}
              className="flex items-center gap-2 bg-black/20 p-3 rounded-lg border border-white/10"
            >
              {editando === index ? (
                <>
                  <input
                    type="text"
                    value={participanteEditado}
                    onChange={(e) => setParticipanteEditado(e.target.value)}
                    className="flex-1 px-3 py-1 rounded bg-black/30 text-white border border-white/20"
                  />
                  <button
                    onClick={() => guardarEdicion(index)}
                    className="p-1 text-green-400 hover:text-green-300"
                  >
                    <Save className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setEditando(null)}
                    className="p-1 text-gray-400 hover:text-gray-300"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </>
              ) : (
                <>
                  <span className="flex-1 text-white">{participante}</span>
                  <button
                    onClick={() => iniciarEdicion(index)}
                    className="p-1 text-blue-400 hover:text-blue-300"
                  >
                    <Edit2 className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => eliminarParticipante(index)}
                    className="p-1 text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Participantes;
