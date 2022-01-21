
    $.ajax({
        url: "https://tnbcrow.pythonanywhere.com/market-chart", success: function (result) {
  
          const ctx = document.getElementById('marketChart').getContext('2d');
          const xlabel=[];
          const ylabel=[];
  
          result.forEach(element => {
            xlabel.push(element.created_at)
            ylabel.push(parseFloat(element.rate)/10000 )
  
          });
  
          var myChart = new Chart(ctx, {
            type: 'line',
            options: {
              responsive: true,
              interaction: {
                  intersect: false,
                  axis: 'x'
                  },
              scales: {
                x: {
                  type: 'time',
                  time: {
                    minUnit: 'hour'
                  }
                },
                y: {suggestedMin: 0},
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
                label: "TNBC Price",
                data: ylabel,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(0, 0, 0)',
              }]
            }
          });
  
  
        }
      }
  
      );
  