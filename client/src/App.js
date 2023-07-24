import styled from "styled-components";
import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Video from "./pages/Video";
import SignIn from "./pages/Singin.jsx";
import Search from "./pages/Search";
import Dashboard from "./pages/Dashboard";
import UsersDash from "./pages/UsersDash";
import VideosDash from "./pages/VideosDash";

const Container = styled.div`
  display: flex;
`;

const Main = styled.div`
  flex: 7;
`;

const Wrapper = styled.div`
  padding: 22px 96px;
`;

function App() {
  return (
    <BrowserRouter>
      <Container>
        <Menu />
        <Main>
          <Navbar />
          <Wrapper>
            <Routes>
              <Route path="/">
                <Route index element={<Home type="random" />} />
                <Route path="trends" element={<Home type="trend" />} />
                <Route path="subscriptions" element={<Home type="sub" />} />
                <Route path="search" element={<Search />} />
                <Route path="signin" element={<SignIn />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="dashboarduser" element={<UsersDash />} />
                <Route path="dashboardvideo" element={<VideosDash />} />
                <Route path="video">
                  <Route path=":id" element={<Video />} />
                </Route>
              </Route>
            </Routes>
          </Wrapper>
        </Main>
      </Container>
    </BrowserRouter>
  );
}

export default App;
