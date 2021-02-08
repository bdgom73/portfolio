export default function Details(props){

    return(
        <>
            <div style={{
                width:"100%",
                height:"1000px",
                background:"black"
            }}>
                <h1>{props.text}</h1>
            </div>
        </>
    );
}