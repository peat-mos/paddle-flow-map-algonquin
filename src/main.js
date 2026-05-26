import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const map = new maplibregl.Map({
  container: 'map',
  style: {
    version: 8,
    sources: {
      'xyz-tiles': {
        type: 'raster',
        tiles: ['https://storage.googleapis.com/paddleflow-maps/algonquin/v1/{z}/{x}/{y}.png'],
        tileSize: 256,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Tim Halford',
        minzoom: 12,
        maxzoom: 15,
      },
    },
    layers: [
      {
        id: 'xyz-layer',
        type: 'raster',
        source: 'xyz-tiles',
        minzoom: 11,
        maxzoom: 16,
        paint: {
          'raster-resampling': 'nearest'
        }
      }
    ]
  },
  center: [-78.7313889, 45.6311111],
  zoom: 12,
  zoomSnap: 1,
  minZoom: 11,
  maxZoom: 15,
  dragRotate: false,
  pitchWithRotate: false,
  touchPitch: false,
});
map.addControl(new maplibregl.NavigationControl({ showCompass: false }));
map.scrollZoom.disable();

let zooming = false;
map.getContainer().addEventListener('wheel', (e) => {
  e.preventDefault();
  if (zooming) return;
  zooming = true;

  const delta = e.deltaY > 0 ? -1 : 1;
  map.zoomTo(Math.round(map.getZoom()) + delta, { duration: 0 });

  setTimeout(() => { zooming = false; }, 300);
}, { passive: false });