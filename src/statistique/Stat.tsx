import React, { useState, useEffect, useRef } from 'react';
import { Chart, ChartOptions, registerables } from 'chart.js';
import axios from 'axios';

Chart.register(...registerables);
type StatData = {
  jourVente: string;
  nombreVentes: number;
  // ... autres propriétés
};

const Stat: React.FC<{ title: string }> = ({ title }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [data, setData] = useState<number[]>([]);
  const [labels, setLabels] = useState<string[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
          console.error('Jetons JWT non trouvés');
          // Vous pouvez gérer la redirection vers la page de connexion ici
          return;
        }
  
        const config = {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        };
        const response = await axios.get('https://vaika-production.up.railway.app/statByDate',config); // Remplacez l'URL par votre API
        const { data } = response;

        // Assurez-vous que la réponse de l'API a la structure attendue
        if (data && data.length > 0) {
          const monthlyData: { [month: string]: number } = {};
        
          data.forEach((item: StatData) => {
            if (item.jourVente && item.nombreVentes) {
              // Supposons que la date est au format 'YYYY-MM-DD'
              const month = item.jourVente.slice(0, 7); // Extrayez l'année et le mois
              const sales = monthlyData[month] || 0;
              monthlyData[month] = sales + item.nombreVentes;
            }
          });
        
          // Convertir l'objet en tableaux pour les étiquettes et les données
          const labels = Object.keys(monthlyData);
          const monthlySales = Object.values(monthlyData);
        
          setLabels(labels);
          setData(monthlySales);
          console.log("kd");
        }
        

      } catch (error) {
        console.error('Erreur lors de la récupération des données:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Détruire le graphique existant s'il y en a un
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      
      // Créer le nouveau graphique avec les couleurs générées
      chartInstance.current = new Chart(ctx as CanvasRenderingContext2D, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Ma Statistique',
              data: data,
              borderColor: 'rgba(75,192,192,1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          maintainAspectRatio: false, // Désactiver la mise à l'échelle automatique
          responsive: false, // Désactiver la réponse aux changements de taille
          width: 500, // Largeur du graphique en barres
          height: 400, // Hauteur du graphique en barres
          scales: {
            x: {
              type: 'category',
              labels: labels,
              grid: {
                lineWidth: 1,
              },
            },
            y: {
              type: 'linear',
              position: 'left',
              grid: {
                lineWidth: 1,
              },
            },
          },
        } as ChartOptions<'bar'>
      });
    }

    // Nettoyer le graphique lorsque le composant est démonté
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data,labels]);

  return (
    <div className='container' >
      <h1>{title}</h1>
      <canvas ref={chartRef} width={800} height={400}/>
    </div>
  );
};

export default Stat;
