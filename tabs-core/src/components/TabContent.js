export default function TabContent(props) {
    return (
        <div className="tabcontent">
            <h3>{props.header}</h3>
            <p>{props.text}</p>
        </div>
    );
}