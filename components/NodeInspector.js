import { useState, useEffect } from 'react';
import { useStoreState } from 'react-flow-renderer';

import ColumnInspector from './ColumnInspector.js';
import Pencil from './icons/Pencil.js';

const NodeInspector = (data) =>{

    // We access our "props" by going into the passed in data and extracting it from several nested objects
    // This is only necessaray because of how data gets passed by the element label
    const props = data.data.data.label.props.children.props;
    const store = useStoreState((store) => store);

    const [expand, showTable] = useState(true);
    const [editable, toggleEdit] = useState(false);
    const [tableName, setTableName] = useState(props.tablename);

    // We make an exact copy of our currently activeNode in our state
    const [activeNode, updateNode] = useState(data.data);
    const [columns, addColumns] = useState(props.columns);
    
    // When a new node is created, we automatically start in edit mode.
    useEffect(() => {
        if (data.startEdit){
            toggleEdit(true);
            data.toggleStartEdit(false);
        }
    }, []);

    // When the data (props) as activeNode being sent to the inspector change, we update the activeNode state
    useEffect(()=>{
        updateNode(data.data);
        addColumns(props.columns);
    }, [data]);

    // When a different element is selected, edit mode is automatically toggled off. 
    useEffect(() => {

        if (!store.selectedElements)
            return;

        setTableName(data.data.data.label.props.children.props.tablename);
        toggleEdit(false);

    }, [store.selectedElements]);

    // Updating node information back in main elements state. 
    useEffect(() => {

        const newNode = JSON.parse(JSON.stringify(activeNode))
        newNode.data.label.props.children.props.tablename = tableName;
        
        updateNode(newNode);

    }, [tableName]);

    const submit = (e) => {
        if (e.code === 'Enter' && editable)
            return savechanges();
    }

    const savechanges = () => {
        return (toggleEdit(false), data.nodeValueChange(activeNode));
    }

    // New column  
    const newColumn = () => {
        const column = {
            name: 'newColumn',
            dataType: 'character varying',
            required: true
        };

        // Pushes all new columns into inspector columns.
        const newColumns = [...columns];
        newColumns.push(column);

        addColumns(newColumns);
        
        const target = store.elements.filter(node => !node.id.includes('reactflow')).findIndex(node => node.id === activeNode.id);

        // Pushes columns into state. 
        store.elements.filter(node => !node.id.includes('reactflow'))[target].data.label.props.children.props.columns.push(column)
        savechanges();
    }

    const colors=['#ff6b6b', '#f9844aff', '#fee440', '#02c39a', '#4361ee', '#9b5de5', '#f15bb5'];

    return (
        <div className='inspector' style={{transform: `${expand ? '' : 'translateX(-360px)' }`, position: `${expand ? 'fixed' : 'fixed'}`}} onKeyDown={submit} >

            <button className='inspectorbtn' onClick={()=>showTable(!expand)} style={{transform: `${expand ? '' : 'translateX(278px)' }`}} >{expand ? '<' : '>'}</button>

            <div className='sidebar' >

                {/* Edit Button */}
                <div onClick={()=>{editable ? savechanges() : toggleEdit(!editable)}} ><Pencil editable={editable ? 1 : undefined} /></div>

                {/* Tablename */}
                <div className='tablename' style={{borderLeft: `8px solid ${colors[props.nodeid % colors.length]}`, backgroundColor: `${editable ? '#c0dbfd' : 'white'}`}} onDoubleClick={() => toggleEdit(true)} >
                    <input className='tablenameinput' value={tableName} type='text' disabled={editable ? '' : 'disabled'} onChange={(e) => setTableName(e.target.value)} style={{color: `${editable ? '#4754bd' : 'black'}`, backgroundColor: `${editable ? '#c0dbfd' : 'white'}`}} />
                </div>

                {/* Columns */}
                {columns.map((column, i) => <ColumnInspector name={column.name} index={i} id={`${column.name}#${i}`} key={`${column.name}#${i}`} dataType={column.dataType} editable={editable} activeNode={activeNode} updateNode={updateNode} onDoubleClick={() => toggleEdit(true)} />)}

                <div id='options'><button onClick={newColumn} >Add Column</button></div>

            </div>

            <style jsx>{`

                *{
                    font-family: 'Inter', sans-serif;
                }

                .inspector {
                    position: fixed;
                    height: 100%;
                    width: 23%;
                    float: left;
                    background-color: white;
                    z-index: 999999998;
                    box-shadow: 3px 0px 3px rgba(0,0,0,.05);
                }

                .tablename{
                    font-size: 24px;
                    text-align: left;
                    background-color: white;
                    padding: 16px;
                    // border-bottom: 3px solid #b8c2cc;
                    box-shadow: 0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06);
                }

                .tablenameinput{
                    border: none;
                    outline: none;
                    font-size: 16px;
                    text-align: left;
                    color: black;
                    width: 100%;
                    
                    &:disabled{
                        background-color: white;
                        color: black;
                    }
                }

                .inspectorbtn{
                    font-size: 24px;
                    font-family: 'Inter', sans-serif;
                    position: fixed;
                    padding: 4px 8px;
                    border-bottom-right-radius: 8px;
                    margin-left: 23%;
                    margin-top: 0;
                    color: #6f8195;
                    background-color: #d8e3e8;
                    border: none;
                    outline: none;
                    cursor: pointer;
                    z-index: 9999999999;

                    &:hover{
                        color: #12b3ab;
                        background-color: #cad5e0;
                    }
                }

                #options{
                    display: flex;
                    justify-content: flex-end;
                    padding: 8px;
                    border-top: .5px solid transparent;
                    border-bottom: .5px solid #e4eaf1;
                    flex-flow: row nowrap;
                    
                    button {
                        color: #12b3ab;
                        border: 1px solid #12b3ab;
                        border-radius: 4px;
                        padding: 8px;
                        outline: none;
                        background-color: transparent;

                        &:hover{
                            cursor: pointer;
                            background-color: #e4fffa;
                        }
                    }
                }

            `}</style>
        </div>
    );

}

export default NodeInspector;