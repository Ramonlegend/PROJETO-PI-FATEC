fetch('alertcity.json')
  .then((response) => response.json())
  .then((data) => {
    let labels = data.map((semana) => `Semana ${semana.SE}`);
    let casos_est = data.map((semana) => semana.casos_est);

    labels = labels.reverse();
    casos_est = casos_est.reverse();

    const getBarColor = (valor) => {
      if (valor <= 25) return '#0099ff';
      if (valor <= 100) return '#005500';
      if (valor <= 250) return '#ffcc00';
      if (valor <= 400) return '#ff6600';
      return 'red';
    };
    const backgroundColor = casos_est.map(getBarColor);

    const ctx = document.getElementById('meuGrafico').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Casos estimados de dengue em Indaiatuba 2024',
            data: casos_est,
            backgroundColor: backgroundColor,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
      },
    });
  })
  .catch((error) => console.error('Erro:', error));
