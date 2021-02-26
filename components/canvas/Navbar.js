import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useStoreState, useStoreActions } from 'react-flow-renderer';

import Profile from '../../components/Profile.js';
import Giraffe from '../../components/icons/Giraffe.js';

const Navbar = (props) => {

    const router = useRouter();

    const store = useStoreState((store) => store);

    const [searchquery, typeSearch] = useState('');
    const setSelectedElements = useStoreActions((actions) => actions.setSelectedElements);

    const submit = (e) => {
        if (e.code === 'Enter' && searchquery.length > 0) {
            e.target.blur();

            const target = store.elements.filter(node => !node.id.includes('reactflow')).findIndex(node => node.data.label.props.children.props.tablename === searchquery.toLowerCase());

            if (target !== -1)
                return (props.search(store.elements[target]), setSelectedElements(store.elements[target]), typeSearch(''));
            else return typeSearch('');
        }
    }

    return (
        <div className='navbar'>

            <div className='homebtn' onClick={() => router.push('diagrams', 'diagrams', {shallow: true})} >
                <Giraffe /> 
                <h1>giraffe<span style={{fontWeight: 'bold'}} >QL</span></h1>
            </div>

            <input id='search' value={searchquery} placeholder='Search for a table name...' onChange={(e)=>typeSearch(e.target.value)} onKeyDown={submit} />

            <h2 id='diagramname' >Diagrams {`>`} <span style={{fontWeight: '500', color: 'white'}} >{props.name}</span></h2>

            <Profile id='profile' />

            <style jsx>{`

                *{
                    font-family: 'Inter', sans-serif;
                    font-weight: 300;
                    font-size: 16px;
                    transition: all .3s;
                }

                h1 {
                    color: #edf2f7;
                    border-radius: 8px;
                    padding: 8px;
                }

                h2 {
                    color: #b2b7ff;
                    margin: 0px 16px;
                }

                .homebtn{
                    display: flex;
                    width: 12.5%;

                    &:hover{
                        // background-color: #5f81e7;
                        cursor: pointer;
                    }
                }

                .navbar {
                    display: flex;
                    align-items: center;
                    // justify-content: space-between;
                    overflow: hidden;
                    background-color: #5661b3;
                    position: fixed;
                    top: 0;
                    width: 100%;
                    height: 39px;
                    padding: 8px;
                    z-index: 9999999999999999999999999;
                }

                input {
                    font-size: 12px;
                    color: black;
                    background-color: #727ed4;
                    border-radius: 32px;
                    height: 16px;
                    width: 12.5%;
                    padding: 8px;
                    margin: 16px;
                    border: none;
                    outline: none;
                    box-shadow: inset 2px 2px 0px #262f6e;
                    &:focus{
                        background-color: #b2b7ff;
                    }

                    ::placeholder{
                        color: #b2b7ff;
                    }
                }

                #diagramname{
                  width: 50%;
                  margin-left: 20%;
                }

                #profile{
                  margin-left: 75%;
                  width: 25%;
                }

            `}</style>

        </div>
    );

}

export default Navbar;