import { HashRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { Intro } from './pages/Intro';
import { Butterfly } from './pages/Butterfly';
import { AiRadar } from './pages/AiRadar';
import { Synapse } from './pages/Synapse';

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Intro />} />
          <Route path="butterfly" element={<Butterfly />} />
          <Route path="airadar" element={<AiRadar />} />
          <Route path="synapse" element={<Synapse />} />
        </Route>
      </Routes>
    </HashRouter>
  );
}
