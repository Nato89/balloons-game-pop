# Balloon Pop

> Juego de reflejos para navegador: revienta los globos antes de que escapen y consigue la mayor puntuación.

## Demo en vivo

🎈 **[Juega Balloon Pop](https://balloons-game-pop.web.app)**

## Vista previa

![Gameplay de Balloon Pop](docs/balloon-pop-gameplay.gif)

## Sobre el proyecto

**Balloon Pop** es un juego de reflejos para navegador. Revienta los globos antes de que escapen por la parte superior de la pantalla: cada globo que dejas pasar te cuesta una vida. La partida termina al perder las cinco vidas.

El proyecto se desarrolló con apoyo de herramientas de inteligencia artificial durante un bootcamp sobre IA y su uso para programar de forma más eficiente. También es una oportunidad para practicar el desarrollo de interfaces y la lógica de un juego con React.

## Cómo jugar

1. Inicia el juego con el botón **Start Game**.
2. Haz clic o toca los globos para reventarlos y sumar 10 puntos por cada uno.
3. Evita que los globos lleguen a la parte superior: comienzas con cinco vidas.
4. Intenta conseguir la mayor puntuación posible. Los globos aparecen y suben más rápido a medida que avanzas.

Al terminar la partida, podrás ver tu puntuación y el tiempo sobrevivido, y empezar otra partida.

## Tecnologías

- React
- JavaScript
- Vite
- CSS

## Requisitos

- Node.js y npm

## Instalación y ejecución

Clona o descarga este repositorio y, desde la carpeta del proyecto, ejecuta:

```bash
npm install
npm run dev
```

Abre en el navegador la dirección local que muestra Vite en la terminal.

## Comandos disponibles

```bash
npm run dev      # Inicia el servidor de desarrollo
npm run build    # Genera la versión de producción en dist/
npm run preview  # Previsualiza la versión de producción
npm run lint     # Ejecuta ESLint
```

## Despliegue en Firebase Hosting

1. Crea un proyecto en la [consola de Firebase](https://console.firebase.google.com/) o selecciona uno existente.
2. Instala Firebase CLI e inicia sesión:

   ```bash
   npm install -g firebase-tools
   firebase login
   ```

3. Desde la carpeta del proyecto, inicializa Firebase Hosting:

   ```bash
   firebase init hosting
   ```

   Durante la configuración, selecciona el proyecto de Firebase que creaste y responde:

   - **Public directory:** `dist`
   - **Configure as a single-page app:** `Yes`
   - **Set up automatic builds and deploys with GitHub:** elige `No` si quieres desplegar manualmente.
   - Si pregunta si debe sobrescribir `dist/index.html`, responde `No`.

   La inicialización crea los archivos de configuración de Firebase en el proyecto. No reemplaces el `index.html` de Vite: es el punto de entrada de la aplicación.

4. Genera y publica la versión de producción:

   ```bash
   npm run build
   firebase deploy --only hosting
   ```

Firebase CLI mostrará la URL pública del sitio cuando termine el despliegue. Para publicar cambios futuros, vuelve a ejecutar `npm run build` y `firebase deploy --only hosting`.

## Estructura principal

```text
src/
├── components/
│   └── Balloon.jsx       # Componente visual e interacción de cada globo
├── utils/
│   └── constants.js      # Vidas iniciales, colores y frecuencia de aparición
├── App.jsx               # Estado y lógica principal del juego
├── App.css               # Estilos del juego
└── index.css             # Estilos globales
```
