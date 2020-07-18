import React from 'react';
import axios from 'axios';

class AnalyzeData extends React.Component{

    state = {
        clinicalData:[],
        firstName: "",
        lastName: "",
        age: ""
    }

    componentDidMount(){
        console.log(this.props.match.params.patientId);
        axios.get("http://localhost:8080/clinicalservices/api/patients/analyze/"+this.props.match.params.patientId)
                .then(res => {
                    console.log(res.data)
                        this.setState({
                            firstName: res.data.firstName,
                            lastName: res.data.lastName,
                            age: res.data.age,
                        })
                })
    }

    render(){
        return (
            <div>
                <h2>Patient Details:</h2>
                First Name: {this.state.firstName} &nbsp;
                Last Name: {this.state.lastName} &nbsp;
                Age: {this.state.age}
                <h2>Clinical Report:</h2>
                {this.state.clinicalData.map(eachEntry => <TableCreator item={eachEntry} key={eachEntry.patient_id}/>)}
            </div>
        )
    }
}


class TableCreator extends React.Component{
    render(){
        const eachEntry = this.props.item;
        return(
            <div>
                <table>
                    <tr><td><b>{eachEntry.componentName}</b></td></tr> 
                    <tr>
                         <td>{eachEntry.componentName}</td>
                         <td>{eachEntry.componentValue}</td>
                         <td>{eachEntry.measuredDateTime}</td>
                    </tr>
                </table>
            </div>
        )
    }
}

export default AnalyzeData;