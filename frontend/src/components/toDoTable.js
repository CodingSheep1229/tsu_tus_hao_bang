import React, { Component } from 'react';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/styles';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: 48,
      padding: '0 30px',
    },
  });
class TodoTable extends Component {
// export default function MaterialTableDemo() {
    constructor(props) {
        super(props);
        this.state = {
          data:[
            {
              _id:'a',
              ischeck: true,
              work: 'sleep',
              principle: 'meme',
              deadtime: '10:00'
            },
            {
              _id:'b',
              ischeck: true,
              work: 'pleep',
              principle: 'peme',
              deadtime: '10:00'
            },
          ],
          columns: [
            { title: '', field: 'ischeck',type: 'boolean',
              render: rowData => <Checkbox checked={rowData.ischeck} onClick = {() => {
                this.getDb()
                
                for(var i=0;i<Number(this.state.data.length);i++){
                  if(rowData._id == this.state.data[i]._id){
                    let temp = this.state.data
                    temp[i].ischeck = !rowData.ischeck
                    this.setState({data: temp});
                    this.UpdateDb(temp[i])
                  }
                }
                
              }} />
            },
            { title: 'Work', field: 'work' },
            { title: 'Principal', field: 'principle'},
            { title: 'DeadLine', field: 'deadtime', type: 'time'},
          ],
          newData:[],
        }  
    }
    checked = (rowData) => {
    };

    getDb = async () => {
        await fetch('http://localhost:5000/api/schedule/getToDo', { 
            method: 'get', 
            headers: new Headers({
                'Authorization': 'Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFzZGYiLCJpZCI6IjVkMGRmMDM0OGQzN2FmZDUwM2UzZjJjMSIsImV4cCI6MTU2NjM3ODU0OCwiaWF0IjoxNTYxMTk0NTQ4fQ.Swtdn68VaV9qlAkCm2EGCrX5LGtJ68ZPil2d5XlTZQ8', 
            })
            
        })
        .then(data => data.json())
        .then(data => data.data)
        .then(data => this.setState({ ...this.state, data}));
    };
    PutDb = async () => {
      let data = this.state.newData;
      await fetch('http://localhost:3001/api/addTodo', {
          method: 'POST',
          body: {"todo": data},
          headers: {
              'Content-Type': 'application/json'
          }
      })
      .then(res => { return res.json() })
      .then(res => {
          if(res.success)
              console.log(res);
          else
              alert('Fail.');
      })
      .catch((err) => console.error(err));
    }
    componentDidMount(){
        this.getDb();
    }
    // const classes = useStyles();
    render(){    
    return (
        <div>
            <MaterialTable
            title="To Do List"
            columns={this.state.columns}
            data={this.state.data}
            onChange={() => this.getDb()}
            options={{
              actionsColumnIndex: -1
            }}
            editable={{
                onRowAdd: newData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data]
                    newData = {
                      id:Date.now(),
                      ischeck: newData.ischeck,
                      work: newData.work,
                      principle: newData.work,
                      deadtime: newData.deadtime
                    };
                    data.push(newData);
                    this.setState(() => ({newData: newData }));
                    this.setState({ ...this.state, data });
                    }, 10);
                }),
                onRowUpdate: (newData, oldData) =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    data[data.indexOf(oldData)] = newData;
                    this.setState({ ...this.state, data });
                    }, 10);
                }),
                onRowDelete: oldData =>
                new Promise(resolve => {
                    setTimeout(() => {
                    resolve();
                    const data = [...this.state.data];
                    data.splice(data.indexOf(oldData), 1);
                    this.setState({ ...this.state, data });
                    }, 10);
                }),
            }}
            />
        </div>
    );
}
};
export default TodoTable;
