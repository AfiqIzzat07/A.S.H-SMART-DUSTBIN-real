setInterval(() => {
  fetch(`${db}/dustbin.json`)
    .then(r => r.json())
    .then(d => {
      document.getElementById("status").innerText = d.status;
      document.getElementById("percent").innerText = d.fullness + "%";

      // 🔔 TELEGRAM TRIGGER
      if (d.notify === true) {
        fetch("/.netlify/functions/notify-full")
          .then(() => {
            // reset flag AFTER sending
            fetch(`${db}/dustbin/notify.json`, {
              method: "PUT",
              body: "false"
            });
          });
      }
    });
}, 3000);
