export default function PaidMessage(){
    const pStyle = {
        color: "#efefef",
        margin: "0px",
    };

    const aStyle = {
        backgroundColor: "#F8F682"
    }
    return (
        <div className={`get-paid-message`}>
            <p style={pStyle}>0 DAYS LEFT</p>
            <div className={`form-group`}>
                <a className={`btn`} style={aStyle}>GET PAID VERSION</a>
            </div>
        </div>
    );
}