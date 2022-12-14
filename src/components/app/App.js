import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";

import LoginForm from "../login-form";
import HomePage from "../home-page";
import HardwereSettings from "../hardwere-settings";
import Question from "../question";
import Other from "../other";
import Task from "../task";
import AddClient from "../add-client"
import Organisation from "../add-organisation";
import InfoTask from "../task/info-task";
import Profile from "../profile/profile";
import Role from "../add-role";
import "./App.css";
import ChangeRole from "../change-user-role/change-user-role";
import TaskCompletion from "../task-completion";

export default class App extends Component {
  render() {
    return (
      <>
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<HardwereSettings />} />
          <Route path="/question" element={<Question />} />
          <Route path="/other" element={<Other />} />
          <Route path="/task" element={<Task />} />
          <Route path="/taskcompletion" element={<TaskCompletion />} />
          <Route path="/addclient" element={<AddClient />} /> 
          <Route path="/addorganisation" element={<Organisation />} />
          <Route path="/addrole" element={<Role />} />
          <Route path="/changerole" element={<ChangeRole />} />
          <Route path="/infotask" element={<InfoTask />} />
        </Routes>
      </>
    );
  }
}
