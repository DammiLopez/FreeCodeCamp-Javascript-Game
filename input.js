// export default class InputHandler {
//   constructor(player, game) {
//     this.player = player;
//     this.game = game;
//     this.keys = [];

//     window.addEventListener("keydown", (e) => {
//       if (
//         (e.key === "ArrowLeft" ||
//           e.key === "ArrowRight" ||
//           e.key === "ArrowDown" ||
//           e.key === "ArrowUp" ||
//           e.key === "Enter") &&
//         this.keys.indexOf(e.key) === -1
//       ) {
//         this.keys.push(e.key);
//       }
//       if (e.key === "q") console.log(this.player);
//       if (e.key === "e") this.game.debug = !this.game.debug;
//     });

//     window.addEventListener("keyup", (e) => {
//       if (
//         e.key === "ArrowLeft" ||
//         e.key === "ArrowRight" ||
//         e.key === "ArrowDown" ||
//         e.key === "ArrowUp" ||
//         e.key === "Enter"
//       ) {
//         this.keys.splice(this.keys.indexOf(e.key), 1);
//       }
//     });
//   }
// }
// export default class InputHandler {
//   constructor(player, game) {
//     this.player = player;
//     this.game = game;
//     this.keys = [];

//     // En el constructor de InputHandler
//     const btnUp = document.getElementById("btn-up");
//     if (btnUp) {
//       btnUp.addEventListener("touchstart", () => this.keys.push("ArrowUp"));
//       btnUp.addEventListener("touchend", () =>
//         this.keys.splice(this.keys.indexOf("ArrowUp"), 1),
//       );
//     }
//     // Mapeo de teclas para facilitar la lectura
//     const keyMap = {
//       w: "ArrowUp",
//       s: "ArrowDown",
//       a: "ArrowLeft",
//       d: "ArrowRight",
//       " ": "Enter",
//       W: "ArrowUp",
//       S: "ArrowDown",
//       A: "ArrowLeft",
//       D: "ArrowRight",
//     };

//     window.addEventListener("keydown", (e) => {
//       const key = keyMap[e.key] || e.key; // Traduce WASD a Arrows
//       if (
//         (key === "ArrowLeft" ||
//           key === "ArrowRight" ||
//           key === "ArrowDown" ||
//           key === "ArrowUp" ||
//           key === "Enter") &&
//         this.keys.indexOf(key) === -1
//       ) {
//         this.keys.push(key);
//       }
//       if (e.key === "e") this.game.debug = !this.game.debug;
//     });

//     window.addEventListener("keyup", (e) => {
//       const key = keyMap[e.key] || e.key;
//       const index = this.keys.indexOf(key);
//       if (index > -1) this.keys.splice(index, 1);
//     });

//     // Soporte para Móviles (Touch)
//     window.addEventListener("touchstart", (e) => {
//       const touchX = e.changedTouches[0].pageX;
//       const touchY = e.changedTouches[0].pageY;
//       const width = window.innerWidth;
//       const height = window.innerHeight;

//       // Dividimos la pantalla en zonas lógicas
//       if (touchY < height / 2)
//         this.handleMobileKey("ArrowUp"); // Salto
//       else if (touchX < width / 3)
//         this.handleMobileKey("ArrowLeft"); // Izquierda
//       else if (touchX > (width / 3) * 2)
//         this.handleMobileKey("ArrowRight"); // Derecha
//       else this.handleMobileKey("Enter"); // Acción/Rodar
//     });

//     window.addEventListener("touchend", () => {
//       this.keys = []; // Limpia las teclas al soltar el dedo
//     });
//   }

//   handleMobileKey(key) {
//     if (this.keys.indexOf(key) === -1) this.keys.push(key);
//   }
// }
// export default class InputHandler {
//   constructor(player, game) {
//     this.player = player;
//     this.game = game;
//     this.keys = [];

//     // Mapeo de teclas teclado
//     const keyMap = {
//       w: "ArrowUp", s: "ArrowDown", a: "ArrowLeft", d: "ArrowRight",
//       W: "ArrowUp", S: "ArrowDown", A: "ArrowLeft", D: "ArrowRight",
//       " ": "Enter",
//     };

//     // --- EVENTOS DE TECLADO ---
//     window.addEventListener("keydown", (e) => {
//       const key = keyMap[e.key] || e.key;
//       if (["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Enter"].includes(key) &&
//           this.keys.indexOf(key) === -1) {
//         this.keys.push(key);
//       }
//       if (e.key === "e") this.game.debug = !this.game.debug;
//     });

//     window.addEventListener("keyup", (e) => {
//       const key = keyMap[e.key] || e.key;
//       const index = this.keys.indexOf(key);
//       if (index > -1) this.keys.splice(index, 1);
//     });

//     // --- INTEGRACIÓN DEL JOYSTICK ---
//     this.initJoystick();
//   }

//   initJoystick() {
//     const base = document.getElementById('joystick-base');
//     const stick = document.getElementById('joystick-stick');
//     if (!base || !stick) return; // Si no existen los elementos, no hace nada

//     let isDragging = false;

//     // Helper para gestionar el array keys
//     const updateKeys = (key, active) => {
//       const index = this.keys.indexOf(key);
//       if (active && index === -1) {
//         this.keys.push(key);
//       } else if (!active && index > -1) {
//         this.keys.splice(index, 1);
//       }
//     };

//     const moveStick = (e) => {
//       const baseRect = base.getBoundingClientRect();
//       const baseX = baseRect.left + baseRect.width / 2;
//       const baseY = baseRect.top + baseRect.height / 2;

//       const clientX = e.touches ? e.touches[0].clientX : e.clientX;
//       const clientY = e.touches ? e.touches[0].clientY : e.clientY;

//       const deltaX = clientX - baseX;
//       const deltaY = clientY - baseY;
//       const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
//       const maxDistance = baseRect.width / 2 - stick.offsetWidth / 2;

//       // Limitar posición visual
//       if (distance <= maxDistance) {
//         stick.style.left = `${deltaX + baseRect.width / 2}px`;
//         stick.style.top = `${deltaY + baseRect.height / 2}px`;
//       } else {
//         const angle = Math.atan2(deltaY, deltaX);
//         stick.style.left = `${Math.cos(angle) * maxDistance + baseRect.width / 2}px`;
//         stick.style.top = `${Math.sin(angle) * maxDistance + baseRect.height / 2}px`;
//       }

//       // Lógica de direcciones (Umbral 0.4 para mayor precisión)
//       const normX = deltaX / maxDistance;
//       const normY = deltaY / maxDistance;
//       const threshold = 0.4;

//       updateKeys("ArrowUp", normY < -threshold);
//       updateKeys("ArrowDown", normY > threshold);
//       updateKeys("ArrowLeft", normX < -threshold);
//       updateKeys("ArrowRight", normX > threshold);
//     };

//     const resetJoystick = () => {
//       isDragging = false;
//       stick.style.transition = '0.2s ease-out';
//       stick.style.left = '50%';
//       stick.style.top = '50%';
//       // Limpiar direcciones del joystick al soltar
//       ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].forEach(k => updateKeys(k, false));
//     };

//     // Eventos Mouse y Touch
//     stick.addEventListener('mousedown', () => { isDragging = true; stick.style.transition = 'none'; });
//     stick.addEventListener('touchstart', (e) => { isDragging = true; stick.style.transition = 'none'; e.preventDefault(); }, {passive: false});

//     window.addEventListener('mousemove', (e) => { if (isDragging) moveStick(e); });
//     window.addEventListener('touchmove', (e) => { if (isDragging) moveStick(e); }, {passive: false});

//     window.addEventListener('mouseup', resetJoystick);
//     window.addEventListener('touchend', resetJoystick);
//   }
// }
export default class InputHandler {
  constructor(player, game) {
    this.player = player;
    this.game = game;
    this.keys = [];

    // 1. Inicializar Joystick
    this.initJoystick();

    // 2. Inicializar Botón de Acción (Enter)
    this.initActionButton();

    // --- EVENTOS DE TECLADO ---
    const keyMap = {
      w: "ArrowUp",
      s: "ArrowDown",
      a: "ArrowLeft",
      d: "ArrowRight",
      W: "ArrowUp",
      S: "ArrowDown",
      A: "ArrowLeft",
      D: "ArrowRight",
      " ": "Enter",
    };

    window.addEventListener("keydown", (e) => {
      const key = keyMap[e.key] || e.key;
      if (
        ["ArrowLeft", "ArrowRight", "ArrowDown", "ArrowUp", "Enter"].includes(
          key,
        ) &&
        this.keys.indexOf(key) === -1
      ) {
        this.keys.push(key);
      }
    });

    window.addEventListener("keyup", (e) => {
      const key = keyMap[e.key] || e.key;
      const index = this.keys.indexOf(key);
      if (index > -1) this.keys.splice(index, 1);
    });
  }

  initActionButton() {
    // Buscamos el botón en el HTML o podrías crearlo dinámicamente
    const btnAction = document.getElementById("action-button");
    if (!btnAction) return;

    // Función para añadir/quitar la tecla Enter
    const handleAction = (active) => {
      const index = this.keys.indexOf("Enter");
      if (active && index === -1) {
        this.keys.push("Enter");
        btnAction.style.transform = "scale(0.9)"; // Efecto visual de pulsado
        btnAction.style.opacity = "0.7";
      } else if (!active && index > -1) {
        this.keys.splice(index, 1);
        btnAction.style.transform = "scale(1)";
        btnAction.style.opacity = "1";
      }
    };

    // Eventos para móvil y mouse
    btnAction.addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        handleAction(true);
      },
      { passive: false },
    );

    btnAction.addEventListener("touchend", () => handleAction(false));

    // Soporte para mouse (opcional, para pruebas en PC)
    btnAction.addEventListener("mousedown", () => handleAction(true));
    btnAction.addEventListener("mouseup", () => handleAction(false));
  }

  initJoystick() {
    // ... (Mantén aquí el código de initJoystick que te envié anteriormente)
    const base = document.getElementById("joystick-base");
    const stick = document.getElementById("joystick-stick");
    if (!base || !stick) return; // Si no existen los elementos, no hace nada

    let isDragging = false;

    // Helper para gestionar el array keys
    const updateKeys = (key, active) => {
      const index = this.keys.indexOf(key);
      if (active && index === -1) {
        this.keys.push(key);
      } else if (!active && index > -1) {
        this.keys.splice(index, 1);
      }
    };

    const moveStick = (e) => {
      const baseRect = base.getBoundingClientRect();
      const baseX = baseRect.left + baseRect.width / 2;
      const baseY = baseRect.top + baseRect.height / 2;

      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const deltaX = clientX - baseX;
      const deltaY = clientY - baseY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
      const maxDistance = baseRect.width / 2 - stick.offsetWidth / 2;

      // Limitar posición visual
      if (distance <= maxDistance) {
        stick.style.left = `${deltaX + baseRect.width / 2}px`;
        stick.style.top = `${deltaY + baseRect.height / 2}px`;
      } else {
        const angle = Math.atan2(deltaY, deltaX);
        stick.style.left = `${Math.cos(angle) * maxDistance + baseRect.width / 2}px`;
        stick.style.top = `${Math.sin(angle) * maxDistance + baseRect.height / 2}px`;
      }

      // Lógica de direcciones (Umbral 0.4 para mayor precisión)
      const normX = deltaX / maxDistance;
      const normY = deltaY / maxDistance;
      const threshold = 0.4;

      updateKeys("ArrowUp", normY < -threshold);
      updateKeys("ArrowDown", normY > threshold);
      updateKeys("ArrowLeft", normX < -threshold);
      updateKeys("ArrowRight", normX > threshold);
    };

    const resetJoystick = () => {
      isDragging = false;
      stick.style.transition = "0.2s ease-out";
      stick.style.left = "50%";
      stick.style.top = "50%";
      // Limpiar direcciones del joystick al soltar
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].forEach((k) =>
        updateKeys(k, false),
      );
    };

    // Eventos Mouse y Touch
    stick.addEventListener("mousedown", () => {
      isDragging = true;
      stick.style.transition = "none";
    });
    stick.addEventListener(
      "touchstart",
      (e) => {
        isDragging = true;
        stick.style.transition = "none";
        e.preventDefault();
      },
      { passive: false },
    );

    window.addEventListener("mousemove", (e) => {
      if (isDragging) moveStick(e);
    });
    window.addEventListener(
      "touchmove",
      (e) => {
        if (isDragging) moveStick(e);
      },
      { passive: false },
    );

    window.addEventListener("mouseup", resetJoystick);
    window.addEventListener("touchend", resetJoystick);
  }
}
