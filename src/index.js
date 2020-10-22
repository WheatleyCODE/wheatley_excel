import './scss/index.scss'
import './index.html';
import { Excel } from './components/Excel/Excel';
import { Header } from './components/Header/Header';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Formula } from './components/Formula/Formula';
import { Table } from './components/Table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';
import { storage } from './core/utils';
import { initialState } from './redux/initialState';
// import { Footer } from './components/Footer/Footer';

const store = createStore(rootReducer, initialState)

store.subscribe((state) => {
  storage('excel-state', state)
})

// Будем страртовать приложение так
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
