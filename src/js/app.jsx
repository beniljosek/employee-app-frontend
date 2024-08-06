import React from "react";
import { Provider } from "react-redux";

import AppRouter from "./appRouter";
import { store } from "./store/store";
import DeleteEmployeeDialog from "./components/delete-employee-dialog/deleteEmployeeDialog";

const App = () => {
    return (
        <Provider store={store}>
            <AppRouter />
            {/* <DeleteEmployeeDialog /> */}
        </Provider>
    )
}

export default App;
