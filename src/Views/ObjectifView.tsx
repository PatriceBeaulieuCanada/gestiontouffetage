import { useState, useRef} from 'react'
import {
	ColumnDirective,
	ColumnsDirective,
	GridComponent,
	Inject,
	Resize,
	Reorder,
	ExcelExport,
	ColumnChooser,
	Toolbar,
	Edit,
	QueryCellInfoEventArgs,
	Column		
} from '@syncfusion/ej2-react-grids'
import { getValue} from '@syncfusion/ej2-base';
import { ButtonComponent,RadioButtonComponent } from '@syncfusion/ej2-react-buttons';
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import UseCallApi from '../Hooks/UseCallApi';

const ObjectifView = () =>{
    const [data, getData] = useState([{shift:"",productionDate:''}])
	const dataRef:any = useRef();
  	dataRef.current = {data: data};
	const [shift, getShift] = useState([])
	const [dateProd, setDataProd] = useState()
    const param = { action: '',objectiveEntity:[],dateTime:'',shift:''}

    const mode:any='Dialog'
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true,mode};
    const toolbarOptions = [ 'ExcelExport', 'ColumnChooser','Edit','Cancel']
    const grid:any = useRef()

	let toastInstanceDate:ToastComponent;
	let toastInstanceShift:ToastComponent;
	let position1 = { X: 'Center'};
	let position2 = { X: 'Left'};
  
    const toolbarClick = (args:any) => {
        const rep = args.item.id
        const sub = 'excelexport'
          
         if (rep.includes(sub)) {
         grid.current.excelExport()
        } 
    }

    const actionComplete = async (arg:any) => {
		
        if (arg.requestType === 'save') {
            //console.log("on Edit",arg.data)
			param.dateTime = dateProd as any;
			param.shift = shift as any;
            param.action = "SetObjective"
			param.objectiveEntity = arg.data;
			getData(await UseCallApi(param))
        }
    }

    const handleValideClick =async()=>{

		if(dateProd === undefined){
			errorMessageDate();
			return;
		}

		if(shift.length === 0){
			errorMessageShift();
			return
		}

		

		grid.current.clearFiltering()
		grid.current.clearSorting()
		param.dateTime = dateProd as any;
		param.shift = shift as any;
        param.action = "GetAllObjective"
		getData(await UseCallApi(param))
		//console.log(data)
    }

    const handleGetSelected = async (arg:any) => {
		//setSelData(arg.data)
		//console.log(selectedData)
	}


	const customizeCell = (args: QueryCellInfoEventArgs) => {
		if ((args.column as Column).field === "nbr28po"
		  && args.data && args.cell) {
			if (getValue('nbr28po', args.data) === 0) {
			 args.cell.textContent="";				
			}		  
		}
		if ((args.column as Column).field === "nbrGluePerBeam"
		  && args.data && args.cell) {
			if (getValue('nbrGluePerBeam', args.data) === 0) {
			 args.cell.textContent="";				
			}		  
		}
		if ((args.column as Column).field === "nbrAirPerBeam"
		  && args.data && args.cell) {
			if (getValue('nbrAirPerBeam', args.data) === 0) {
			 args.cell.textContent="";				
			}		  
		}
		if ((args.column as Column).field === "nbrKnots"
		  && args.data && args.cell) {
			if (getValue('nbrKnots', args.data) === 0) {
			  args.cell.textContent="";				
			}		  
		}
		if ((args.column as Column).field === "nbrFloor"
		  && args.data && args.cell) {
			if (getValue('nbrFloor', args.data) === 0) {
			  args.cell.textContent="";				
			}		  
		}
		if ((args.column as Column).field === "nbrBringChariot"
		  && args.data && args.cell) {
			if (getValue('nbrBringChariot', args.data) === 0) {
			  args.cell.textContent="";				
			}		  
		}
		if ((args.column as Column).field === "nbrRemoveChariot"
		  && args.data && args.cell) {
			if (getValue('nbrRemoveChariot', args.data) === 0) {
			  args.cell.textContent="";				
			}		  
		}
		if ((args.column as Column).field === "nbrBacking"
		  && args.data && args.cell) {
			if (getValue('nbrBacking', args.data) === 0) {
			  args.cell.textContent="";				
			}		  
		}		
	  }


	const errorMessageDate = () =>{
		toastInstanceDate.show({ timeOut: 2000 });
	}

	const errorMessageShift = () =>{
		toastInstanceShift.show({ timeOut: 2000 });
	}

	const handleToastClick1 = (args:any) =>{
		args.clickToClose = true;
	}

	const handleToastClick2 = (args:any) =>{
		args.clickToClose = true;
	}

	const handleChangeDate = (args:any) =>{
		setDataProd(new Intl.DateTimeFormat('en-US').format(args.value) as any )
	}

	const handleRadioShift = (args:any) =>{
		getShift(args.target.labels[0].textContent)		
	}

	const getDayShift = () =>{
		// let result = ""
		// if(data.length > 0){
		// 	result = data[0].shift 
		// }else{
		// 	result = ""
		// }		
		 return shift
	}

	const getDayOfProd = () =>{
		// let dayResult = ""
		// if(data.length > 0){
		// 	dayResult = data[0].productionDate.substring(0,10) 
		// }else{
		// 	dayResult = ""
		// }			
		return dateProd
	}

    return(
        <div>
            <div className='containerHeader'>
				<h1>Objectifs</h1>
				<div className='containerDate'>
					<DatePickerComponent width={200} format={'yyyy/MM/dd'} onChange={handleChangeDate}/>
					<div className='containerLabel'>
						<label className='item1'>Date : </label>
						<input className='item2' type="text" value={getDayOfProd()}/>
						<label className='item3'>Quart de travail : </label>
						<input className='item4' type="text" value={getDayShift()}/>	
					</div>		
				</div>				
				<div className='item5'>
						<RadioButtonComponent name="radioButtonShift1" label="Jour" onClick={handleRadioShift}/>
						<RadioButtonComponent name="radioButtonShift1" label="Soir" onClick={handleRadioShift}/>
						<RadioButtonComponent name="radioButtonShift1" label="Nuit" onClick={handleRadioShift}/>
				</div>				
				<ButtonComponent className='btn2' onClick={handleValideClick}>Validez</ButtonComponent>				
			</div>
			<ToastComponent ref={toast => toastInstanceDate = toast!} title="Avertissement" content="Vous n'avez pas entrée de date" 
			position={position1} showProgressBar={true} click={handleToastClick1}/>
			<ToastComponent ref={toast => toastInstanceShift = toast!} title="Avertissement" content="Vous n'avez pas sélectionnez de quart de travail" 
			position={position2} showProgressBar={true} click={handleToastClick2}/>
            <GridComponent
				dataSource={dataRef.current.data}
				allowResizing={true}
				allowReordering={true}
				allowTextWrap={true}
				ref={grid}
				toolbar={toolbarOptions}
				allowExcelExport={true}
				toolbarClick={toolbarClick}
				showColumnChooser={true}
				editSettings={editOptions}
				actionComplete={actionComplete}
				rowSelected={handleGetSelected}
				queryCellInfo={customizeCell}
				// height={600}
                >
				<ColumnsDirective>
                    <ColumnDirective field='employee.fullName' headerText='Opérateur' width='10%' textAlign='Center' 
					allowEditing={false} isPrimaryKey={true}/>
					<ColumnDirective field='job.machine.name' headerText='Touffeteur' width='10%' textAlign='Center' allowEditing={false}/>
					<ColumnDirective field='job.style.code' headerText='Style' width='10%' textAlign='Center' allowEditing={false}/>
                    <ColumnDirective field='tuffterStandardProduction.id' headerText='Standard prod id' width='10%' 
					textAlign='Center' allowEditing={false} visible={false}/>
					<ColumnDirective field='tuffterStandardSetup.id' headerText='Standard setup id' width='10%' 
					textAlign='Center' allowEditing={false} visible={false}/>
                    <ColumnDirective field='hrsAvailable' headerText='Heures disponibles' width='10%' textAlign='Center'/>
                    <ColumnDirective field='nbr28po' headerText='Nbr 28 pouces' width='10%' textAlign='Center'/>
                    <ColumnDirective field='nbrGluePerBeam' headerText='Nbr attache par colle' width='10%' textAlign='Center' />
                    <ColumnDirective field='nbrAirPerBeam' headerText='Nbr attache par air' width='10%' textAlign='Center'/>
                    <ColumnDirective field='nbrKnots' headerText='Noeuds' width='10%' textAlign='Center' />
                    <ColumnDirective field='nbrFloor' headerText='Plancher' width='10%' textAlign='Center' />                     
                    <ColumnDirective field='nbrBringChariot' headerText='Nbr apporter Chariot' width='10%' textAlign='Center'  />
                    <ColumnDirective field='nbrRemoveChariot' headerText='Nbr enlever Chariot' width='10%' textAlign='Center' />					
                    <ColumnDirective field='nbrBacking' headerText='Nbr endos' width='10%' textAlign='Center' />
					<ColumnDirective field='mtrToProduce' headerText='Quantité estimé (ML)' width='10%' textAlign='Center' allowEditing={false}/>					
                    <ColumnDirective field='timeToProduce' headerText='Temps estimé' width='10%' textAlign='Center' allowEditing={false}/>
				</ColumnsDirective>
				<Inject services={[ Resize, Reorder, Toolbar, ExcelExport, ColumnChooser, Edit ]} />
			</GridComponent>
        </div>

)}
export default ObjectifView