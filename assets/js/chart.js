
    $.ajax({
        url: "https://tnbcrow.pythonanywhere.com/market-chart", success: function (result) {
  
          const ctx = document.getElementById('marketChart').getContext('2d');
          const xlabel=[];
          const ylabel=[];
  
          result.forEach(element => {
            xlabel.push(element.created_at)
            ylabel.push(element.rate)
  
          });
  
          var myChart = new Chart(ctx, {
            type: 'line',
            options: {
              scales: {
                x: {
                  type: 'time',
                  time: {
                    minUnit: 'hour'
                  }
                }
              },
              plugins: {
                zoom: {
                  zoom: {
                    wheel: {
                      enabled: true,
                    },
                    pinch: {
                      enabled: true
                    },
                    mode: 'xy',
                  }
                },
                
                
              },
            },
            data: {
              labels: xlabel,
              datasets: [{
                label: "Market",
                data: ylabel,
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1
              }]
            }
          });
  
  
        }
      }
  
      );
  