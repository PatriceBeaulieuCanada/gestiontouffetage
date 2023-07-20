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
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';

import { DatePickerComponent } from '@syncfusion/ej2-react-calendars';
import { MultiSelect, DropDownList} from '@syncfusion/ej2-dropdowns';
import { ButtonComponent, RadioButtonComponent} from '@syncfusion/ej2-react-buttons';
import { ToastComponent } from '@syncfusion/ej2-react-notifications';
import UseCallApi from '../Hooks/UseCallApi';
import { DataManager, Query } from '@syncfusion/ej2-data';

const CommentView = () =>{
    const [data, getData] = useState([])
    const dataRef:any = useRef()
  	dataRef.current = {data: data}

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
    
    const handleChangeDate = (args:any) =>{
		// setDataProd(new Intl.DateTimeFormat('en-US').format(args.value) as any )
	}

    const handleValideClick= async()=>{
		// if(dateProd == undefined){
		// 	errorMessageDate();
		// 	return;
		// }

		// if(shift.length == 0){
		// 	errorMessageShift();
		// 	return
		// }
		
		// param.dateTime = dateProd as any;
		// param.shift = shift as any;
		// param.action = "GetChosenJob"
		// //console.log(data)
		// getData(await UseCallApi(param))
			
	}

    return (
        <div>
            <div>
                <TextBoxComponent multiline={true} placeholder='Entrer votre commentaire ' value=''/>
            </div>
        <div className='containerHeader'>
            <div className='containerDate'>
                <DatePickerComponent width={200} format={'yyyy/MM/dd'} onChange={handleChangeDate}/>                
            </div> 
            <ButtonComponent className='btn2' onClick={handleValideClick}>Validez</ButtonComponent>            
        </div>
        {/* <ToastComponent ref={toast => toastInstanceDate = toast!} title="Avertissement" content="Vous n'avez pas entrée de date" 
        position={position1} showProgressBar={true} click={handleToastClick1}/>
        <ToastComponent ref={toast => toastInstanceShift = toast!} title="Avertissement" content="Vous n'avez pas sélectionnez de quart de travail" 
        position={position2} showProgressBar={true} click={handleToastClick2}/> */}
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
            // actionComplete={actionComplete}
            // rowSelected={handleGetSelected}
            // height={600}
            >
            <ColumnsDirective>
                <ColumnDirective field='' headerText='Date' width='10%' textAlign='Center' editType='dropdownedit' />
                <ColumnDirective field='' headerText='Touffeteur' width='10%' textAlign='Center' allowEditing={false}/> 
                <ColumnDirective field='' headerText='Opérateur' width='10%' textAlign='Center' editType='dropdownedit' />
                <ColumnDirective field='' headerText='Commantaire' width='10%' textAlign='Center' type='string' editType='dropdownedit'/>                            				
            </ColumnsDirective>
            <Inject services={[ Resize, Reorder, Toolbar, ExcelExport, ColumnChooser, Edit ]} />
        </GridComponent>        
    </div>    
    )
}

export default CommentView