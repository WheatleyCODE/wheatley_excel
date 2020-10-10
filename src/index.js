import './scss/index.scss'
import './index.html';
import { Excel } from './components/Excel/Excel';

// Будем страртовать приложение так
const exel = new Excel('#app', {
  components: [],
})

console.log(exel)
