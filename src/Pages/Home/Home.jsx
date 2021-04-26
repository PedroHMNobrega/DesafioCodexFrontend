import React from "react";
import "./style.css";
import Header from "./Components/Header";
import TaskList from "./Components/TaskList";

function Home(props) {
    return (
        <div className={'home'}>
            <Header />
            <TaskList />
        </div>
    );
}

export default Home;
