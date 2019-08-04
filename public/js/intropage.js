
      document.getElementById('multip').onclick = function() {
        introJs().setOption('doneLabel', 'Next page').start().oncomplete(function() {
          window.location.href = 'single-product.html?multipage=true';
        });
      };