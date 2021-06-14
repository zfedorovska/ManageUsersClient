import React, { useEffect } from 'react';
import BootstrapTable from 'react-bootstrap-table-next'; 
import {Button, ButtonGroup} from 'react-bootstrap';

const UsersTable = ({ id, onRouteChange }) => {

	let [users, setUsers] = React.useState([]);
	
	useEffect(() => { getUsersFromServer() }, []);

    const columns = [{
        dataField: 'id',
        text: 'ID',
		sort: true
      }, {
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'email',
        text: 'email'
      }, {
        dataField: 'registration',
        text: 'Registration'
      }, {
        dataField: 'login',
        text: 'Last login'
      }, {
        dataField: 'status',
        text: 'Status'
      }];

	const defaultSorted = [{
		dataField: 'id', 
		order: 'asc' 
	  }];
      
    const selectRow = {
        mode: 'checkbox',
        clickToSelect: true,
		selected: [],
		style: { background: 'red' },
		onSelect: (row, isSelect, rowIndex, e) => {
				if (isSelect)	
				{
					selectRow.selected.push(row.id);
				}
				else
					selectRow.selected.filter((id)=>(id!=row.id))
			},
		onSelectAll: (isSelect, rows) => {
			const ids = rows.map(r => r.id);
			if (isSelect) 		  
				selectRow.selected = ids
			else 
				selectRow.selected = ids 
		} 
      };


	  const deleteUsers = ()=>{
		  getCurrentUserFromServer();
		  var ids = selectRow.selected;
		  var emails = [];
		  users.forEach((user)=>{
			  ids.forEach((id)=>{
				  if (user.id==id)
				  	emails.push(user.email);
				})
			})
		  fetch('http://localhost:3000/del', {
			method: 'delete',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
			id: ids,
			email: emails
			})
			});
		  setTimeout(getUsersFromServer, 100);
		  if (ids.filter(x=>x==id).length==1)
				onRouteChange('signout');		 
		  getCurrentUserFromServer(); 
		}

	  function updateUsers(event){
		var ids = selectRow.selected;  
		var status = 1;
		if (event.target.classList.contains('block'))
		{
			status = 0;
			if (ids.filter(x=>x==id).length==1)
				onRouteChange('signout')
		}			
		fetch('http://localhost:3000/update', {
			method: 'post',
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify({
			id: ids,
			status: status })
			});
		getCurrentUserFromServer();
	  }

	  function getUsersFromServer(){
		fetch('http://localhost:3000/')
		.then(response => response.json())
		.then(data => {setUsers(data)});
	  }

	  function getCurrentUserFromServer(){
		getUsersFromServer();
		var currentUserArray = users.filter((user)=>(user.id==id));
		if (currentUserArray.length!=0)
			var currentUser = currentUserArray[0];
		if (currentUserArray.length==0 || currentUser.status==0)
			onRouteChange('signout')
	  }

    return(
		<div>
			<div className='center'>
				<ButtonGroup className="ma3">
				<Button variant="secondary" className="block" onClick={updateUsers}>Block
				<svg xmlns="http://www.w3.org/2000/svg"  width="1" height="16"></svg></Button>
				<Button variant="secondary" onClick={updateUsers}>
				<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-unlock" viewBox="0 0 16 16">
				<path d="M11 1a2 2 0 0 0-2 2v4a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h5V3a3 3 0 0 1 6 0v4a.5.5 0 0 1-1 0V3a2 2 0 0 0-2-2zM3 8a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1H3z"/>
				</svg></Button>
				<Button variant="secondary" onClick={deleteUsers}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
				<path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
				<path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
				</svg></Button>			

				</ButtonGroup>
			</div>
			<div className='center pa3'>       
				<BootstrapTable className='table-bordered'
					keyField='id'
					data={ users }
					columns={ columns }
					selectRow={ selectRow }
					defaultSorted={ defaultSorted }
				/>
			</div> 
		</div>			  
    )
}

export default UsersTable;