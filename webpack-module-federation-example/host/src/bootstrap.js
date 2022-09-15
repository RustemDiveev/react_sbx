import { createRoot } from "react-dom/client";

const RemoteApp = React.lazy(
    () => import("Remote/App")
);

const RemoteButton = React.lazy(
    () => import("Remote/Button")
);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
    <div>
        <div>I'm a host application</div>
        <RemoteApp/>
        <RemoteButton/>
    </div>
);