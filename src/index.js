import './scss/index.scss'
import './index.html';
import { Excel } from './components/Excel/Excel';
import { Header } from './components/Header/Header';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Formula } from './components/Formula/Formula';
import { Table } from './components/Table/Table';
import { Footer } from './components/Footer/Footer';

// Будем страртовать приложение так
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table, Footer],
})

excel.render()
