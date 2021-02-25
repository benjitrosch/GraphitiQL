import { Handle, useStoreState } from 'react-flow-renderer';
import { useState, useEffect } from 'react';

import Star from '../../components/icons/Star.js';

const Column = (props) => {
    
    // Create a reference to our store and set up state to hold active column and activeEdges
    const store = useStoreState((store) => store);
    const [active, selectColumn] = useState(false);
    const [activeEdges, populateEdges] = useState([]);

    // When selected elements changes, we change what the active edges are (highlighted)
    useEffect(() => {
        
        if (!store.selectedElements)
            return populateEdges([]);

        populateEdges(props.selectedEdges([store.selectedElements[0]], store.edges));
        
    }, [store.selectedElements]);
    
    // Styling of edges
    const targetBackground = () => {
        if (props.edges.some(edge => edge.targetHandle === alphabet[props.index]
            && edge.target == props.nodeid.toString())
            && props.expanded && props.selected)
            return '#ff6b6b';
        if (props.selected && props.expanded && active)
            return '#f1f6f8';
        return 'transparent';
    }

    const sourceBackground = () => {
        if (props.edges.some(edge => edge.sourceHandle === alphabet[props.index]
            && edge.source === props.nodeid.toString())
            && props.expanded && props.selected)
            return '#0373fc';
        if (props.selected && props.expanded && active)
            return '#f1f6f8';
        return 'transparent';
    }

    const targetBorder = () => {
        if (props.edges.some(edge => edge.targetHandle === alphabet[props.index]
            && edge.target == props.nodeid.toString())
            && activeEdges.some(edge => edge.targetHandle === alphabet[props.index]
            && edge.target === props.nodeid.toString())
            && props.expanded && !props.selected){
            return '5px solid #ff6b6b';
        }
        if (props.selected && active && props.expanded)
            return '5px solid #0373fc';
        if (props.selected && !active && props.expanded)
            return '5px solid transparent';
        if (props.expanded && active)
            return '5px solid #0373fc';
        return '5px solid transparent';
    }

    const sourceBorder = () => {
        if (props.edges.some(edge => edge.sourceHandle === alphabet[props.index]
            && edge.source === props.nodeid.toString())
            && activeEdges.some(edge => edge.sourceHandle === alphabet[props.index]
            && edge.source === props.nodeid.toString())
            && props.expanded && !props.selected){
            return '5px solid #0373fc';
        }
        if (props.selected && active && props.expanded)
            return '5px solid #0373fc';
        if (props.selected && !active && props.expanded)
            return '5px solid transparent';
        if (props.expanded && active)
            return '5px solid #0373fc';
        return '5px solid transparent';

    }

    const targetPos = () => {
        if (props.selected && props.expanded)
            return '-47px';
        if (props.expanded)
            return '-47px';
        return '0%';
    }

    const sourcePos = () => {
        if (props.selected && props.expanded)
            return '47px';
        if (props.expanded)
            return '47px';
        return '90%';
    }
    // Styling ends here

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');

    const star = props.isPrimary && props.expanded ? <Star /> : null;

    return (
        <div className='container' onMouseOver={()=>selectColumn(true)} onMouseLeave={()=>selectColumn(false)} >

            {/* Our Table component is split into two columns: the column name and it's associated Data Type.
                Each of these also contains an input (target) and output (source) "Handle" component that allows
                Nodes to connect.*/}

            <div className='column' className='left'>

                <Handle type='target' position='left' id={alphabet[props.index]} key={`id-${props.index}`}
                
                    /* Handle Styling */
                    style={{
                        position: `${props.expanded ? 'relative' : 'absolute'}`,
                        float: 'left',
                        left: `${targetPos()}`,
                        width: `32px`, height: `32px`,
                        border: `${targetBorder()}`,
                        backgroundColor: `${targetBackground()}`
                    }}
                
                />

                {/* Column Name */}
                {star}
                {props.name}

            </div>

            <div className='column' className='right'>
            
                {/* Data Type */}
                {props.dataType}

                <Handle type='source' position='right' id={alphabet[props.index]} key={`id-${props.index}`}
                
                    /* Handle Styling */
                    style={{
                        position: `${props.expanded ? 'relative' : 'absolute'}`,
                        float: 'right',
                        left: `${sourcePos()}`,
                        width: `32px`, height: `32px`,
                        border: `${sourceBorder()}`,
                        backgroundColor: `${sourceBackground()}`
                    }}

                />
            </div>

            <style jsx>{`

                *{
                    font-size: 16px;
                    transition: all 0s;
                    font-family: 'Inter', sans-serif;
                }

                .handle {
                    border: 5px solid red;
                }

                .container{
                    display: flex;
                    justify-content: space-between;
                    padding: 8px;
                    border-top: .5px solid transparent;
                    border-bottom: .5px solid #e4eaf1;
                    flex-flow: row nowrap;

                    &:hover{
                        border-top: .5px solid #0373fc;
                        border-bottom: .5px solid #0373fc;
                    }

                    &:active{
                        border-top: .5px solid #0373fc;
                        border-bottom: .5px solid #0373fc;
                        background-color: #eaf4ff;
                    }

                    &:active > .left{
                        color: #0373fc;
                    }

                    &:active > .right{
                        color: #0373fc;
                    }
                }

                .column{
                    flex: 25%;
                }

                .left{
                    display: flex;
                    align-items: center;
                    font-weight: bold;
                    color: #5e6f7a;
                    margin-right: 32px;
                }

                .right{
                    display: flex;
                    align-items: center;
                    color: #cccccc;
                }

            `}</style>

        </div>
    );
}

export default Column;