import React, { createContext, useState, useContext } from 'react';
import { projects as initialProjects, tasks as initialTasks } from "./exampledata";

const AppStateContext = createContext();
/* 
    ATENÇÃO: Isso aqui é uma maneira de criar estados globais em um projeto com React,
    com isso, nós podemos criar estados gerais que são utilizados por todo o App, sem precisar
    passar como parâmetro, tela por tela.
*/
export const AppStateProvider = ({ children }) => {
    const [projects, setProjects] = useState(initialProjects);
    const [tasks, setTasks] = useState(initialTasks);

    const dataState = {
        projects,
        setProjects,
        tasks,
        setTasks,
    };

    return (
        <AppStateContext.Provider value={dataState}>
            {children}
        </AppStateContext.Provider>
    );
};

export const useAppState = () => useContext(AppStateContext);
