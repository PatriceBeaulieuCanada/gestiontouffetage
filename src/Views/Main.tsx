import { useState, useRef, useMemo} from 'react'
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
	IEditCell	
} from '@syncfusion/ej2-react-grids'
import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelect} from '@syncfusion/ej2-dropdowns';
import { ButtonComponent, RadioButtonComponent} from '@syncfusion/ej2-react-buttons';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import UseCallApi from '../Hooks/UseCallApi';
import { DataManager, Query } from '@syncfusion/ej2-data';

const Main = () =>{

    const [data, getData] = useState([{shift:"",productionDate:''}])
	const [shift, getShift] = useState([])
	const [dateProd, setDataProd] = useState()
	const [totalPlanifer, setTotalPlanifer] = useState("")
	const [totalAbsence, setTotalAbsence] = useState("")
	const [totalAbsencePartiel, setTotalAbsencePartiel] = useState("")
	const [heurePlanifer, setHeurePlanifer] = useState("")
	const [heureAbsence, setHeureAbsence] = useState("")
	const [heureAbsencePartiel, setHeureAbsencePartiel] = useState("")
	const [heureOver, setHeureOver] = useState("")
	const [heure127, setHeure127] = useState("")
	const [heureAutrePlus, setHeureAutrePlus] = useState("")
	const [heureAutreMoins, setHeureAutreMoins] = useState("")
	const [heureFormation, setHeureFormation] = useState("")

	const dataRef:any = useRef()
  	dataRef.current = {data: data}
	
	const [employees, getEmployees] = useState([{firstName:""}])
	const empRef:any = useRef();
  	empRef.current = {employees: employees};

	const [styles, getStyles] = useState([{id:0,code:0}])
	const styleRef:any = useRef();
	styleRef.current = {styles: styles};

	const param = { action: '',scheduledJobsEntity:[{}],dateTime:'',shift:''}

	let toastInstanceDate:ToastComponent;
	let toastInstanceShift:ToastComponent;
	let position1 = { X: 'Center'};
	let position2 = { X: 'Left'};

	useMemo(() =>{
        UseCallApi({action:'GetAllEmployees'}).then((employees)=>getEmployees(employees))
		UseCallApi({action:'GetAllStyles'}).then((styles)=>getStyles(styles))			
    },[])

    const mode:any='Dialog'
	const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true,mode};
    const toolbarOptions = [ 'ExcelExport', 'ColumnChooser','Edit','Cancel']
	const grid:any = useRef()

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
			param.action = 'SetScheduledJobs'
			param.scheduledJobsEntity = arg.data
			getData(await UseCallApi(param))
		}
    }

    const handleGetSelected = async (arg:any) => {
		//setSelData(arg.data)
		//console.log(selectedData)
	}

	const handleNewClick= async()=>{

		param.action = "GetNewScheduledJobs"
		getData(await UseCallApi(param))
	}
	
	const handleValideClick= async()=>{
		if(dateProd === undefined){
			errorMessageDate();
			return;
		}

		if(shift.length === 0){
			errorMessageShift();
			return
		}
		
		param.dateTime = dateProd as any;
		param.shift = shift as any;
		param.action = "GetChosenJob"
		//console.log(data)
		getData(await UseCallApi(param))			
	}

	const handleEnrClick = async()=>{

		if(dateProd === undefined){
			errorMessageDate();
			return;
		}

		if(shift.length === 0){
			errorMessageShift();
			return
		}

		param.dateTime = dateProd as any;
		param.shift = shift as any;
		param.action = "SetHistScheduledJob"
		getData(await UseCallApi(param))
		//console.log(data)	
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

	const state: object[] = [
		{ stateName: ''},
		{ stateName: 'Prod'},
		{ stateName: 'Attache'},
		{ stateName: 'Noeuds'},
		{ stateName: 'Stop'},
		{ stateName: 'Enfilage'},
		{ stateName: 'Maintenance'},
		{ stateName: 'Autre'}
	  ];

	const stateParams : IEditCell = {
		params:   {
		  actionComplete: () => false,
		  allowFiltering: true,
		  dataSource: new DataManager(state),
		  fields: { text: "stateName", value: "stateName"},
		  query: new Query()
		}
	  };
	  
	  const priority: object[] = [
		{ priorityName: ''},
		{ priorityName: '1 Q'},
		{ priorityName: 'J/S'},
		{ priorityName: 'J+4H'},
		{ priorityName: 'SP1'},
		{ priorityName: 'SP2'},
		{ priorityName: 'SP3'},
		{ priorityName: 'SP4'}
	  ];

	const priorityParams : IEditCell = {
		params:   {
		  actionComplete: () => false,
		  allowFiltering: true,
		  dataSource: new DataManager(priority),
		  fields: { text: "priorityName", value: "priorityName"},
		  query: new Query()		  
		}
	  };

	  
	// element pour les opérateurs

	let tpElem: HTMLElement;
	let multiSelectObj:MultiSelect;

	const createEmployer = () =>{
		tpElem = document.createElement('input');
    	return tpElem;
	}

	const destroyEmployer = () =>{
		multiSelectObj.destroy();
	}

	const readEmployer = () =>{
		return multiSelectObj.value.join(',');
	}
	
	const writeEmployer = async (args:any) =>{

		let multiSelectVal = args.rowData[args.column.field]
      ? args.rowData[args.column.field].split(',')
      : [];
    	multiSelectObj = new MultiSelect({
		value: multiSelectVal,
		dataSource: empRef.current.employees,
		fields: { value: 'fullName', text: 'fullName' },
		floatLabelType: 'Never',
		mode: 'Box',
    });
    multiSelectObj.appendTo(tpElem);		
	}

	const employeesParams : IEditCell = {
		create: createEmployer,
		destroy: destroyEmployer,
		read: readEmployer,
		write: writeEmployer, 
};


	// element pour les styles

	let styleElem: HTMLElement;
	let styleSelectObj:MultiSelect;

	const createStyle = () =>{
		styleElem = document.createElement('input');
    	return styleElem;
	}

	const destroyStyle = () =>{
		styleSelectObj.destroy();
	}

	const readStyle = () =>{
		return styleSelectObj.value;
	}
	
	const writeStyle = async (args:any) =>{

		let styleSelectVal = args.rowData[args.column.field]
      ? args.rowData[args.column.field]
      : [];
	  	styleSelectObj = new MultiSelect({
		value: styleSelectVal,
		dataSource: styleRef.current.styles,
		fields: { value: 'code', text: 'code' },
		floatLabelType: 'Never',
		
		
    });
    styleSelectObj.appendTo(styleElem);		
	}

	
	const styleParams : IEditCell = {
			create: createStyle,
			destroy: destroyStyle,
    		read: readStyle,
    		write: writeStyle, 
	};
	
	const handleChangeDate = (args:any) =>{
		setDataProd(new Intl.DateTimeFormat('en-US').format(args.value) as any )
	}

	const handleRadioShift = (args:any) =>{
		getShift(args.target.labels[0].textContent)		
	}

	const getDayShift = () =>{
		let result = ""
		if(data.length > 0){
			result = data[0].shift 
		}else{
			result = ""
		}		
		return result
	}

	const getDayOfProd = () =>{
		let dayResult = ""
		if(data.length > 0){
			dayResult = data[0].productionDate.substring(0,10) 
		}else{
			dayResult = ""
		}		
		return dayResult
	}

	const handleBtnValidez = () =>{
		alert(totalPlanifer)
	}

    return(
        <div>
			<div className='containerHeader'>
				<h1>Planification des quarts de travail</h1>
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
						<RadioButtonComponent name="radioButtonShift" label="Jour" onClick={handleRadioShift}/>
						<RadioButtonComponent name="radioButtonShift" label="Soir" onClick={handleRadioShift}/>
						<RadioButtonComponent name="radioButtonShift" label="Nuit" onClick={handleRadioShift}/>
				</div>
				<ButtonComponent className='btn1' onClick={handleNewClick}>Nouveau</ButtonComponent>
				<ButtonComponent className='btn2' onClick={handleValideClick}>Validez</ButtonComponent>
				<ButtonComponent className='btn3' onClick={handleEnrClick}>Enregistrer</ButtonComponent>
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
				// height={600}
                >
				<ColumnsDirective>
					<ColumnDirective field='priority' headerText='Priorités' width='10%' textAlign='Center' editType='dropdownedit' edit={priorityParams}/>
                    <ColumnDirective field='machine.name' headerText='Touffeteur' width='10%' textAlign='Center' allowEditing={false}/> 
                    <ColumnDirective field='state' headerText='État' width='10%' textAlign='Center' editType='dropdownedit' edit={stateParams}/>
                    <ColumnDirective field='code' headerText='Style' width='10%' textAlign='Center' type='string' editType='dropdownedit' edit={styleParams}/>
                    <ColumnDirective field='notesSup' headerText='Notes superviseurs' width='40%' textAlign='Center' />
					<ColumnDirective field='notesOper' headerText='Notes opérateurs' width='40%' textAlign='Center' />
                    <ColumnDirective field='fullName' headerText='Opérateurs' width='10%' textAlign='Center' type='string' editType='dropdownedit' edit={employeesParams} />
                    <ColumnDirective field='nbrSets' headerText='Nbs de sets' width='10%' textAlign='Center'/>                   				
				</ColumnsDirective>
				<Inject services={[ Resize, Reorder, Toolbar, ExcelExport, ColumnChooser, Edit ]} />
			</GridComponent>
			<div className='footer'>
				<div className='lblFooter'>
					<div className='lblFooter1'>
						<div className='lblMultiline'>
							<label className='lbl1'>Total de personnes planifiés: </label>
							<label className='lbl1'>(Mouvement de main-d'oeuvre)</label>
						</div>
						<input className='inp1' value={totalPlanifer} onChange={(e)=> setTotalPlanifer(e.target.value)}/>
						<label className='lbl1'>Heures planifiées: </label>
						<input className='inp1' value={heurePlanifer} onChange={(e)=> setHeurePlanifer(e.target.value)}/>
						<label className='lbl1'>Total de personnes en absences: </label>
						<input className='inp1' value={totalAbsence} onChange={(e)=> setTotalAbsence(e.target.value)}/>
						<label className='lbl1'>Heures d'absences: </label>
						<input className='inp1' value={heureAbsence} onChange={(e)=> setHeureAbsence(e.target.value)}/>
						<label className='lbl1'>Total de personnes en absences partielles: </label>
						<input className='inp1' value={totalAbsencePartiel} onChange={(e)=> setTotalAbsencePartiel(e.target.value)}/>
						
					</div>
					<div className='lblFooter2'>
						<label className='lbl1'>Heures d'absences partielles: </label>
						<input className='inp1' value={heureAbsencePartiel} onChange={(e)=> setHeureAbsencePartiel(e.target.value)}/>
						<label className='lbl1'>Heures en over: </label>
						<input className='inp1' value={heureOver} onChange={(e)=> setHeureOver(e.target.value)}/>
						<label className='lbl1'>Heures pour du 127: </label>
						<input className='inp1' value={heure127} onChange={(e)=> setHeure127(e.target.value)}/>
						<label className='lbl1'>Heures: autres +: </label>
						<input className='inp1' value={heureAutrePlus} onChange={(e)=> setHeureAutrePlus(e.target.value)}/>
						<label className='lbl1'>Heures: autres -: </label>
						<input className='inp1' value={heureAutreMoins} onChange={(e)=> setHeureAutreMoins(e.target.value)}/>
						<div className='lblMultiline'>
							<label className='lbl1'>Heures de formation: </label>
							<label className='lbl1'>(hors production)</label>
						</div>
						<input className='inp1' value={heureFormation} onChange={(e)=> setHeureFormation(e.target.value)}/>
					</div>
				</div>
					<div className='btnFooter'>
						<ButtonComponent onClick={handleBtnValidez} >Validez</ButtonComponent>
					</div>
			</div>
        </div>
    )}

    export default Main