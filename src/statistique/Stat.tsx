import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const Stat: React.FC<{ data: number[]; labels: string[] }> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);

 


  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      // Détruire le graphique existant s'il y en a un
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      // Utiliser la fonction generateColors


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
           //   backgroundColor: backgroundColors,
              borderWidth: 1,
            },
          ],
        },
        options: {
          scales: {
            x: {
                type: 'category',
                labels: labels,
                grid: {
                  lineWidth: 1, // Largeur de la grille de l'axe x
                },
              },
              y: {
                type: 'linear',
                position: 'left',
                grid: {
                  lineWidth: 1, // Largeur de la grille de l'axe y
                },
              },
          },
        },
      });
    }

    // Nettoyer le graphique lorsque le composant est démonté
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={chartRef} width={400} height={100} />;
};

export default Stat;
