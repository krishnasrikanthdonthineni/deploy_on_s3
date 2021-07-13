import react, { Component} from 'react';


class DynamoDB extends Component {
    state = { 
        isLoading : false,
        details : []
    }

    async componentDidMount(){
        const response = await fetch('https://d49wx3x0hi.execute-api.us-east-1.amazonaws.com/MyFirstLamdaDev');
        const body = await response.json();
        this.setState({details : body});
    }
    render(){

            const isLoading = this.state.isLoading;
            const allDetails = this.state.details;
           
            let details = 
            allDetails.map( detail =>
                    <tr key = {detail.Id}>
                        <td>{detail.Id}</td>
                        <td>{detail.Vendor}</td>
                        <td>{detail.Amount}</td>
                        <td>{detail.Date}</td>
                    </tr>
                )

            if(isLoading)
                return(<div>.... Loading</div>);


        return(
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Vendor</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Date</th>
                    </tr>
                </thead>
                <tbody>
                    {this.state.details.length === 0 ? <td colSpan="4">No details to display</td> : details}
                </tbody>
        </table>
        );
    }
}

export default DynamoDB;