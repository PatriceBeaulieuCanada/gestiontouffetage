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

const StandardView = () =>{

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
        param.action = "GetAllStandard"
		getData(await UseCallApi(param))
		//console.log(data)
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
				allowFiltering={true}
				// height={600}
                >
				<ColumnsDirective>
					<ColumnDirective field='machine.name' headerText='Touffeteur' width='10%' textAlign='Center' allowEditing={false}/>
					<ColumnDirective field='style.code' headerText='Style' width='10%' textAlign='Center' />
                    <ColumnDirective field='speed' headerText='Vitesse' width='10%' format="N0"/>
                    <ColumnDirective field='tieAirPerBeam' headerText='Attache par air' width='10%' textAlign='Center'/>
                    <ColumnDirective field='tieGluePerBeam' headerText='Attache par colle' width='10%' textAlign='Center' />
                    <ColumnDirective field='timeForBringChariot' headerText='Apporter Chariot' width='10%' textAlign='Center' />
                    <ColumnDirective field='timeForRemoveChariot' headerText='Enlever Chariot' width='10%' textAlign='Center' />
					<ColumnDirective field='timePer28po' headerText='28 pouces' width='10%' textAlign='Center'/>
                    <ColumnDirective field='timePerBacking' headerText='Endos' width='10%' textAlign='Center' />
                    <ColumnDirective field='timePerFloor' headerText='Plancher' width='10%' textAlign='Center' />
                    <ColumnDirective field='timePerKnots' headerText='Noeuds' width='10%' textAlign='Center' />                    				
				</ColumnsDirective>
				<Inject services={[ Resize, Reorder, Toolbar, ExcelExport, ColumnChooser, Edit,Filter ]} />
			</GridComponent>
        </div>
    
)}

export default StandardView