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
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import UseCallApi from '../Hooks/UseCallApi';

const OperatorsView = () =>{

    const [data, getData] = useState([])
	const dataRef:any = useRef();
  	dataRef.current = {data: data};
    const param = { action: ''}

    const mode:any='Dialog'
    const editOptions = { allowEditing: true, allowAdding: true, allowDeleting: true,mode};
    const toolbarOptions = [ 'ExcelExport', 'ColumnChooser','Add','Edit','Cancel']
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
            if(arg.action === 'add'){
                console.log("on ajoute",arg.data)
            }

            if(arg.action === 'edit'){
                console.log("on edit",arg.data)
            }
        }
    }

    const handleValideClick =async()=>{
		grid.current.clearFiltering()
		grid.current.clearSorting()
        param.action = "GetAllEmployees"
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
				height={'100%'}
                width={'75%'}
                >
				<ColumnsDirective>
					<ColumnDirective field='firstName' headerText='Prénom' width='10%' textAlign='Center'/>
					<ColumnDirective field='lastName' headerText='Nom' width='10%' textAlign='Center' />
                    <ColumnDirective field='code' headerText='Code' width='10%' format="N2"/>
				</ColumnsDirective>
				<Inject services={[ Resize, Reorder, Toolbar, ExcelExport, ColumnChooser, Edit,Filter ]} />
			</GridComponent>
        </div>
    
    )
}

export default OperatorsView