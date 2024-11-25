import React, { useState, useEffect } from 'react';
import { Shuffle, Trophy } from 'lucide-react';

interface Partido {
  jugador1: string | null;
  jugador2: string | null;
  ganador: string | null;
}

interface Ronda {
  partidos: Partido[];
}

const Torneo = () => {
  const [rondas, setRondas] = useState<Ronda[]>([]);
  const [sorteoRealizado, setSorteoRealizado] = useState(false);

  useEffect(() => {
    const storedRondas = localStorage.getItem('rondas');
    const storedSorteo = localStorage.getItem('sorteoRealizado');
    if (storedRondas) {
      setRondas(JSON.parse(storedRondas));
    }
    if (storedSorteo) {
      setSorteoRealizado(JSON.parse(storedSorteo));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('rondas', JSON.stringify(rondas));
    localStorage.setItem('sorteoRealizado', JSON.stringify(sorteoRealizado));
  }, [rondas, sorteoRealizado]);

  const shuffle = (array: string[]) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const iniciarSorteo = () => {
    const participantes = JSON.parse(localStorage.getItem('participantes') || '[]');
    if (participantes.length < 2) {
      alert('Se necesitan al menos 2 participantes para iniciar el torneo');
      return;
    }

    const participantesOrdenados = shuffle(participantes);
    const primeraRonda: Ronda = {
      partidos: [],
    };

    // Crear partidos iniciales
    for (let i = 0; i < participantesOrdenados.length; i += 2) {
      primeraRonda.partidos.push({
        jugador1: participantesOrdenados[i],
        jugador2: i + 1 < participantesOrdenados.length ? participantesOrdenados[i + 1] : null,
        ganador: null,
      });
    }

    // Crear rondas vacías para el resto del torneo
    const totalRondas = Math.ceil(Math.log2(participantesOrdenados.length));
    const nuevasRondas: Ronda[] = [primeraRonda];

    for (let i = 1; i < totalRondas; i++) {
      const partidosEnRonda = Math.ceil(participantesOrdenados.length / Math.pow(2, i + 1));
      nuevasRondas.push({
        partidos: Array(partidosEnRonda).fill(null).map(() => ({
          jugador1: null,
          jugador2: null,
          ganador: null,
        })),
      });
    }

    setRondas(nuevasRondas);
    setSorteoRealizado(true);
  };

  const seleccionarGanador = (rondaIndex: number, partidoIndex: number, ganador: string) => {
    const nuevasRondas = [...rondas];
    nuevasRondas[rondaIndex].partidos[partidoIndex].ganador = ganador;

    // Actualizar siguiente ronda
    if (rondaIndex + 1 < nuevasRondas.length) {
      const siguientePartidoIndex = Math.floor(partidoIndex / 2);
      const esJugador1 = partidoIndex % 2 === 0;

      if (esJugador1) {
        nuevasRondas[rondaIndex + 1].partidos[siguientePartidoIndex].jugador1 = ganador;
      } else {
        nuevasRondas[rondaIndex + 1].partidos[siguientePartidoIndex].jugador2 = ganador;
      }
    }

    setRondas(nuevasRondas);
  };

  return (
    <div className="max-w-7xl mx-auto">
      {!sorteoRealizado && (
        <div className="text-center mb-8">
          <button
            onClick={iniciarSorteo}
            className="bg-red-600 text-white px-6 py-3 rounded-lg text-lg font-bold hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 flex items-center mx-auto"
          >
            <Shuffle className="w-6 h-6 mr-2" />
            Empezar Sorteo
          </button>
        </div>
      )}

      {sorteoRealizado && (
        <div className="overflow-x-auto">
          <div className="flex gap-8 p-4 min-w-max">
            {rondas.map((ronda, rondaIndex) => (
              <div
                key={rondaIndex}
                className="flex flex-col gap-8"
                style={{
                  marginTop: `${rondaIndex * 2}rem`
                }}
              >
                <div className="text-white text-center font-bold mb-4">
                  {rondaIndex === rondas.length - 1
                    ? 'Final'
                    : rondaIndex === rondas.length - 2
                    ? 'Semifinal'
                    : `Ronda ${rondaIndex + 1}`}
                </div>
                {ronda.partidos.map((partido, partidoIndex) => (
                  <div
                    key={partidoIndex}
                    className="bg-white/10 backdrop-blur-sm rounded-lg p-4 w-64 border border-white/10"
                  >
                    {partido.jugador1 && (
                      <div
                        className={`p-2 rounded cursor-pointer ${
                          partido.ganador === partido.jugador1
                            ? 'bg-green-500 text-white'
                            : 'bg-black/20 text-white hover:bg-black/30'
                        }`}
                        onClick={() =>
                          !partido.ganador && partido.jugador1 &&
                          seleccionarGanador(rondaIndex, partidoIndex, partido.jugador1)
                        }
                      >
                        {partido.jugador1}
                      </div>
                    )}
                    <div className="my-2 text-yellow-500 text-center font-bold">VS</div>
                    {partido.jugador2 ? (
                      <div
                        className={`p-2 rounded cursor-pointer ${
                          partido.ganador === partido.jugador2
                            ? 'bg-green-500 text-white'
                            : 'bg-black/20 text-white hover:bg-black/30'
                        }`}
                        onClick={() =>
                          !partido.ganador && partido.jugador2 &&
                          seleccionarGanador(rondaIndex, partidoIndex, partido.jugador2)
                        }
                      >
                        {partido.jugador2}
                      </div>
                    ) : (
                      <div className="p-2 rounded bg-black/20 text-gray-500">
                        Sin oponente
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      )}

      {sorteoRealizado &&
        rondas[rondas.length - 1].partidos[0].ganador && (
          <div className="fixed bottom-0 left-0 right-0 bg-black/90 text-white p-6 text-center">
            <div className="flex items-center justify-center gap-3 text-2xl font-bold">
              <Trophy className="w-8 h-8 text-yellow-400" />
              ¡{rondas[rondas.length - 1].partidos[0].ganador} es el campeón!
            </div>
          </div>
        )}
    </div>
  );
};

export default Torneo;