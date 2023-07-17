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
	Filter		
} from '@syncfusion/ej2-react-grids'
import { MultiSelect, DropDownList} from '@syncfusion/ej2-dropdowns';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import UseCallApi from '../Hooks/UseCallApi';

const ObjectifView = () =>{
    const [data, getData] = useState([])
	const dataRef:any = useRef();
  	dataRef.current = {data: data};
    const param = { action: ''}

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
            
        }
    }

    const handleValideClick =async()=>{
		grid.current.clearFiltering()
		grid.current.clearSorting()
        param.action = "GetAllObjective"
		getData(await UseCallApi(param))
		console.log(data)
    }

    const handleGetSelected = async (arg:any) => {
		//setSelData(arg.data)
		//console.log(selectedData)
	}


    return(
        <div>
            <div>
				<ButtonComponent onClick={handleValideClick}>Validez</ButtonComponent>
			</div>
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
                    <ColumnDirective field='timeToProduce' headerText='Temps estimé (ML)' width='10%' textAlign='Center' allowEditing={false}/>
				</ColumnsDirective>
				<Inject services={[ Resize, Reorder, Toolbar, ExcelExport, ColumnChooser, Edit ]} />
			</GridComponent>
        </div>

)}
export default ObjectifView