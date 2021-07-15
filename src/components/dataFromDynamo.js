import  { Component} from 'react';
import MUIDataTable from "mui-datatables";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
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
            const columns = ["Id", "Vendor", "Amount", "Date"];
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
            
                const options = {
                    filterType: "dropdown",
                    responsive: "scroll",
                    selectableRows : true,
                    expandableRows: true, // Try Adding This
                    expandableRowsOnClick: true,
                    renderExpandableRow: (rowData, rowMeta) => {
                      console.log(rowData, rowMeta);
                      return (
                        <TableRow>
                          <TableCell colSpan={rowData.length}>
                            Custom expandable row option. Data: {JSON.stringify(rowData)}
                          </TableCell>
                        </TableRow>
                      );
                    }
                };

        return(
            <diV>

            <MUIDataTable
            title={"Row Expandable Table Using MUI"}
            data={allDetails}
            columns={columns}
            options={options}
            />
            
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
        </diV>
        );

    }
}

export default DynamoDB;