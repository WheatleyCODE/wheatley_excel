import './scss/index.scss'
import './index.html';
import { Excel } from './components/Excel/Excel';
import { Header } from './components/Header/Header';
import { Toolbar } from './components/Toolbar/Toolbar';
import { Formula } from './components/Formula/Formula';
import { Table } from './components/Table/Table';
import { createStore } from './core/createStore';
import { rootReducer } from './redux/rootReducer';
import { storage, debounce } from './core/utils';
import { initialState } from './redux/initialState';
// import { Footer } from './components/Footer/Footer';

const store = createStore(rootReducer, initialState)

// Делает изменения стейта не на каждый клик
// а на группу изменений после 300мс ожидания
const stateListener = debounce((state) => {
  console.log('app state')
  storage('excel-state', state)
}, 300)

store.subscribe(stateListener)

// Будем страртовать приложение так
const excel = new Excel('#app', {
  components: [Header, Toolbar, Formula, Table],
  store,
})

excel.render()
