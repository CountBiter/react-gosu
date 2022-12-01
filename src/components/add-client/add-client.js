import React, { Component } from "react";

import { ForAdminAddClient } from "../if-not-user";
import AddClientForm from "./add-client-elem";

export default class AddClient extends Component {
  render() {
    return (
      <>
        <ForAdminAddClient />
      </>
    );
  }
}
