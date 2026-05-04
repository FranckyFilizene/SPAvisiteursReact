import { useEffect, useState } from 'react'
import { BiDollar, BiGroup } from 'react-icons/bi'
import { HiMiniMinusCircle } from "react-icons/hi2";
import { LuMaximize2 } from "react-icons/lu";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, ResponsiveContainer } from 'recharts';
import axios from 'axios';

const Dashbord = () => {
  const [stats, setStats] = useState({
    nb: 0,
    total: 0,
    min: 0,
    max: 0
  });
  const donne = [
    { id: 1, titre: 'Total Visiteur', nombre: stats.nb, para: 'Visiteur Enregistrer', icone: BiGroup, bgcolor: 'bg-blue-100', textColor: 'text-blue-600', borderColor: 'border-blue-600' },
    { id: 2, titre: 'Total General', nombre: `${parseFloat(stats.total).toLocaleString()} Ar`, para: 'Somme Total des Tarifs', icone: BiDollar, bgcolor: 'bg-green-100', textColor: 'text-green-600', borderColor: 'border-green-600' },
    { id: 3, titre: 'Total Minimum', nombre: `${stats.min.toLocaleString()} Ar`, para: 'Tarif journalier minimum', icone: HiMiniMinusCircle, bgcolor: 'bg-purple-100', textColor: 'text-purple-600', borderColor: 'border-purple-600' },
    { id: 4, titre: 'Total Maximum', nombre: `${stats.max.toLocaleString()} Ar`, para: 'Tarif journalier maximum', icone: LuMaximize2, bgcolor: 'bg-orange-100', textColor: 'text-orange-600', borderColor: 'border-orange-600' }
  ]

  // Fonction pour assigner des couleurs spécifiques
  const getPieColor = (name) => {
    const lowerName = name.toLowerCase();
    if (lowerName.includes('alice')) {
      return '#FF6B6B'; // Rouge pour Alice
    } else if (lowerName.includes('ranaivomanana')) {
      return '#4ECDC4'; // Turquoise pour Ranaivomanana
    } else {
      // Couleurs par défaut pour les autres
      const defaultColors = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D'];
      return defaultColors[Math.abs(name.length) % defaultColors.length];
    }
  };

  // pour afficher le total des visiteur et les tarifs
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost/Delegg-Hub/sapvisiteur/src/Backend/Dashboard.php');
        if (res.data.error) {
          throw new Error(res.data.error);
        }
        setStats({
          nb: res.data.total_visiteurs ?? 0,
          total: res.data.total_gain ?? 0,
          min: res.data.total_min ?? 0,
          max: res.data.total_max ?? 0
        });
      } catch (err) {
        console.error("Erreur stats", err);
      }
    };
    fetchStats();
  }, []);


  //pour le courbe
  const [chartData, setChartData] = useState([]);
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await axios.get('http://localhost/Delegg-Hub/sapvisiteur/src/Backend/GET_Chart_graphe.php');
        if (res.data.length === 1) {
          const testData = [
            { name: "Début", trafic: 0, nbrdujour: 0 },
            ...res.data
          ];
          setChartData(testData);
        } else {
          setChartData(res.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    loadData();
  }, []);


  //pour le cercle
  const [pieData, setpieData] = useState([]);
  useEffect(() => {
    const loadData2 = async () => {
      try {
        const response = await axios.get('http://localhost/Delegg-Hub/sapvisiteur/src/Backend/GET_Chart_pie.php');
        setpieData(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    loadData2();
  }, []);

  return (
    <div className='flex justify-center items-center flex-col'>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full'>
        {donne.map((items) => {
          const Icone = items.icone;
          return (
            <div
              key={items.id}
              className={`flex justify-start items-center gap-3 bg-white ${items.borderColor} 
          p-4 rounded-xl duration-300 border-l-[4px] shadow-sm hover:shadow-md 
          hover:-translate-y-0.5 group cursor-pointer`}
            >
              {/* Icône rétrécie : de p-4/size-40 à p-2.5/size-24 */}
              <div className={`${items.bgcolor} rounded-lg p-2.5 shrink-0 transition-colors`}>
                <Icone size={24} className={`${items.textColor}`} />
              </div>

              {/* Section Texte ajustée */}
              <div className="flex flex-col min-w-0">
                <span className='text-[10px] font-bold uppercase tracking-wider text-slate-400'>
                  {items.titre}
                </span>
                {/* Nombre réduit : de text-3xl à text-lg/xl */}
                <h1 className={`text-xl font-extrabold leading-tight ${items.textColor}`}>
                  {items.nombre}
                </h1>
                <p className='text-[10px] text-slate-500 truncate opacity-80'>
                  {items.para}
                </p>
              </div>
            </div>
          );
        })}
      </div>
      {/* 
    1. Changement du parent : 
       - flex-col par défaut (mobile)
       - lg:flex-row (PC écran large)
       - h-auto sur mobile pour laisser le contenu s'empiler, h-[24rem] seulement sur grand écran 
*/}
      <div className='flex flex-col lg:flex-row justify-center items-center gap-6 h-auto lg:h-[28rem] w-full p-4'>

        {/* Graphique Courbe - Largeur 100% mobile, 40% PC */}
        <div className='bg-slate-200 pb-6 rounded-lg w-full lg:w-[38%] flex flex-col justify-center items-center shadow-lg h-[400px] lg:h-full overflow-hidden'>
          <h1 className='bg-slate-900 text-white p-2 text-center font-bold rounded-t-lg w-full text-sm md:text-base'>
            Courbe des jours et tarifs
          </h1>

          <ResponsiveContainer width='100%' height="100%">
            {/* Passage de LineChart à AreaChart */}
            <AreaChart data={chartData} margin={{ top: 20, right: 30, left: 10, bottom: 60 }}>

              {/* Définition des dégradés pour le fond coloré */}
              <defs>
                <linearGradient id="colorTarif" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorJours" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray='3 3' vertical={false} stroke="#ccc" />

              <XAxis
                dataKey="name"
                tick={{ fontSize: 10, fill: '#334155' }}
                angle={-45}
                textAnchor="end"
                interval={0} // Affiche tous les noms
              />

              <YAxis yAxisId="left" orientation="left" stroke="#8884d8" tick={{ fontSize: 10 }} />
              <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" tick={{ fontSize: 10 }} />

              <Tooltip
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />

              <Legend verticalAlign="top" height={36} iconType="circle" />

              {/* Remplacement de Line par Area */}
              {/* type="linear" rend les sommets pointus */}
              <Area
                yAxisId="left"
                type="linear"
                dataKey="trafic"
                name="Tarif"
                stroke="#8884d8"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorTarif)" // Utilise le dégradé défini dans <defs>
                dot={{ r: 4, fill: '#8884d8' }} // Points visibles
              />

              <Area
                yAxisId="right"
                type="linear"
                dataKey="nbrdujour"
                name="Jours"
                stroke="#82ca9d"
                strokeWidth={3}
                fillOpacity={1}
                fill="url(#colorJours)"
                dot={{ r: 4, fill: '#82ca9d' }}
              />

            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Graphique Camembert - Largeur 100% mobile, 35% PC */}
        <div className='bg-slate-200 rounded-lg w-full lg:w-[35%] flex justify-center items-center shadow-lg flex-col pb-4 h-[400px] lg:h-full'>
          <h1 className='bg-slate-900 text-white p-2 text-center font-bold rounded-t-lg w-full'>
            Somme du jour et du tarif
          </h1>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius="60%"
                outerRadius="80%"
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getPieColor(entry.name)} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value} Ar`} />
              <Legend layout="horizontal" verticalAlign="bottom" align="center" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Résumé du Bilan - Largeur 100% mobile, fixe (w-72) sur PC */}
        <div className='flex flex-col justify-between py-8 px-6 bg-white w-full lg:w-80 rounded-lg h-full shadow-lg border border-slate-100'>
          <h1 className='text-xl md:text-2xl font-semibold pb-3 border-b border-gray-200 w-full'>
            Résumé du bilan
          </h1>

          <div className='w-full space-y-4'>
            <div className='flex justify-between items-center'>
              <p className='text-gray-600'>Total Général</p>
              <p className='text-sm md:text-base text-green-600 font-bold'>
                {`${parseFloat(stats.total).toLocaleString()} Ar`}
              </p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-gray-600'>Minimum</p>
              <p className='text-sm text-purple-600 font-semibold'>
                {`${stats.min.toLocaleString()} Ar`}
              </p>
            </div>
            <div className='flex justify-between items-center'>
              <p className='text-gray-600'>Maximum</p>
              <p className='text-sm text-orange-600 font-semibold'>
                {`${stats.max.toLocaleString()} Ar`}
              </p>
            </div>

            <div className='pt-6 mt-6 border-t border-gray-100'>
              <div className='flex justify-between items-center'>
                <p className='text-gray-500 text-sm'>Visiteurs totaux</p>
                <p className='text-3xl text-blue-600 font-black'>{stats.nb}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashbord
